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
    createdAt : string,
    ingredientsIds : string[],
    pictureLink : string,
    updatedAt : string,
    isCurrentlyUnavailable : boolean
}

type Ingredient = {
    id : string,
    name : string,
    allergen : Allergen,
    containsGluten : boolean,
    allergenId : string,
    createdAt : string,
}

type Allergen = {
    id : string,
    name : string,
    link : string,
    createdAt : string,
}