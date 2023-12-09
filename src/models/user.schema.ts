import { Schema } from 'mongoose'
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

})
export interface HookNextFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error?: Error): any
}

UserSchema.pre('save', async function (next: HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});