type User = {
    login : string,
    roles : string[]
};

type UserJwt = {
    
        Login: string;
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" : string[];
}

type Macaron = {
    id : string,
    taste : string,
    description : string,
    price : number, 
    advertismentPrice : number,
    isXl : boolean,
    createdAt : string
    ingredientsIds : string[]
    pictureLink : string
    updatedAt : string
}

type Ingredient = {
    id : string,
    name : string
}