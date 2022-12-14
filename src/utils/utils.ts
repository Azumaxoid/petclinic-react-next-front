import {InputField} from '../types/';

export const getFieldByPropName = (fields : InputField[], propName: string): InputField | undefined => {
    return fields.find(field => field.propName === propName)
}