/// <reference types="node" />
declare function addImage(image: string | Buffer, name: string): Promise<{
    id: string;
}>;
export default addImage;
