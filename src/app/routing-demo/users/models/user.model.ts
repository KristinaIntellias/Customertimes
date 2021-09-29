export class UserModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public age?: number | string,
    public lastEdited?: Date | string,
  ) {
  }
}
