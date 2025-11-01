export class ColumnNumericTransformer { to(value?: number){ return value; } from(v: string | null){ return v===null?null:parseFloat(v); } }
