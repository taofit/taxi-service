import {Db} from 'mongodb';

export const addIdToDoc = async (body: any, db: Db, collectionName: string, idName: string ) => {
    let id: string = '' + (await db.collection(collectionName).countDocuments() + 1);
    id = idName + id.toString();
    body = { id, ...body };

    return body;
}