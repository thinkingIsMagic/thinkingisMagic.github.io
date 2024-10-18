declare module '*.md' {
    const content: string;
    export default content;
  }
  
  declare module NodeJS {
    interface Global {
      require: any;
    }
  }
  