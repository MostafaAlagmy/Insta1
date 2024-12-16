export type INewUser={
    name:string,
    username:string,
    email:string,
    password:string

}
export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageurl: string;
    bio: string;
}
export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
}
export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
}