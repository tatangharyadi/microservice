import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export abstract class MongooseService {
    protected constructor(protected readonly model: Model<any>) {}

    async save(createEntity) {
        const entity = new this.model(createEntity);
        return entity.save();
    }

    find(filterQuery = {}) {
        return this.model.find(filterQuery);
    }

    async findOne(id: string) {
        const entity = await this.model.findOne({ _id: id }).exec();

        if (!entity) {
            throw new NotFoundException(`Id ${id} not found`);
        }
        return entity;
    }

    async update(id: string, updateEntity) {
        const existingEntity = await this.model
            .findOneAndUpdate(
                { _id: id },
                { $set: updateEntity },
                { new: true },
            )
            .exec();

        if (!existingEntity) {
            throw new NotFoundException(`Id ${id} not found`);
        }

        return existingEntity;
    }

    async delete(id: string) {
        const entity = await this.findOne(id);
        return entity.remove();
    }
}
