
//fix and align code properly

export interface BlogProps {
    title: string,
    smallDescription: string,
    currentSlug: string,
    titleImage: string;
    category: [];
    }

export interface Block {
    _key: string;
    _type: string;
    children: { text: string }[]; 
    }
    
export interface BlogPropsSecond {
    currentSlug: string,
    title: string,
    content: Block[];  
    titleImage: string;
    category: [];
    }