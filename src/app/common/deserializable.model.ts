export interface Deserializable {
  deserialize(input: any): this;
}


export class DeserializableBase implements Deserializable {
  public deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
