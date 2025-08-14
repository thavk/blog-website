export interface Login {
    message: string;
    userId: number;
    username: string;
};

export interface Register {
    userId: number;
    username: string;
    token: string;
    message: string;
};
