import { Request, Response } from 'express';

import db from '../database/connection';

import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    //para fazer a listagem das aulas
    async index (request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        //crontrolando a disponibilidade do professor em relação ao dia de
        // trabalho e o horário de expediente
        const classes = await db('classes')
            .whereExists(function() {
              this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])

            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        return response.json(classes)
    }


    async create (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,        
            subject,
            cost,
            schedule
        } = request.body;
    
        //para fazer todas as operações do banco ao mesmo tempo, e se uma delas falhar
        //desfazer todas que foram já feitas daquele mesmo contexto
        const trx = await db.transaction();
    
        try{
            const insertedtUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,  
            })
        
            const user_id = insertedtUsersIds[0]
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            })
        
            const class_id = insertedClassesIds[0]
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })
        
            await trx('class_schedule').insert(classSchedule);
        
            //nesse momento que ele insere tudo ao mesmo tempo no banco de dados
            await trx.commit();
        
            //(201) significa criado com sucesso
            return response.status(201).send();
        } catch (err) {
            console.log(err)
            
            //desfazer qualquer alteração nesse meio tempo
            await trx.rollback();
            //(400) significa que aconteceu algum erro
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}