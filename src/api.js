import { database, addNewUser, deleteUserFromDb, editUserFromDb } from "./fakeDatabase";

const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getUsers = (page, perPage = 6) => {
    return new Promise((resolve, reject) => {
        if (database.users.length === 0) {
            return setTimeout(() => reject(new Error("Users not found")), randomIntFromInterval(1000, 3000));
        }

        setTimeout(
            () =>
                resolve({
                    perPage: paginate(database.users, perPage, page).length,
                    page,
                    total: database.users.length,
                    data: paginate(database.users, perPage, page),
                    total_pages: Math.ceil(database.users.length / perPage),
                }),
            randomIntFromInterval(1000, 3000)
        );
    });
};

export const getUser = (userId) =>
    new Promise((resolve, reject) => {
        const user = database.users.find((user) => user.id === userId);

        if (!user) {
            return setTimeout(() => reject(new Error("User not found")), randomIntFromInterval(1000, 3000));
        }

        setTimeout(
            () =>
                resolve({
                    data: user,
                }),
            randomIntFromInterval(1000, 3000)
        );
    });

export const logUser = (email) =>
    new Promise((resolve, reject) => {
        const user = database.users.find((user) => user.email === email);

        if (!user) {
            return setTimeout(() => reject(new Error("User not found")), randomIntFromInterval(1000, 3000));
        }

        setTimeout(
            () =>
                resolve({
                    status: "success",
                    data: user,
                }),
            randomIntFromInterval(1000, 3000)
        );
    });

export const postUser = (data) =>
    new Promise((resolve, reject) => {
        const newUserIsValid = Object.keys(data).length > 0;

        if (!newUserIsValid) {
            return setTimeout(() => reject(new Error("Can't add new user")), randomIntFromInterval(1000, 3000));
        }

        setTimeout(() => {
            addNewUser(data);
            return resolve({
                status: "success",
            });
        }, randomIntFromInterval(1000, 3000));
    });

export const deleteUser = (userId) =>
    new Promise((resolve, reject) => {
        const user = database.users.find((user) => user.id === userId);

        if (!user) {
            return setTimeout(() => reject(new Error("User doesn't exist !")), randomIntFromInterval(1000, 3000));
        }

        setTimeout(() => {
            deleteUserFromDb(userId);
            return resolve({
                status: "success",
            });
        }, randomIntFromInterval(1000, 3000));
    });

export const editUser = (data) =>
    new Promise((resolve, reject) => {
        const user = database.users.find((user) => user.id === data.id);

        if (!user) {
            return setTimeout(() => reject(new Error("User not found")), randomIntFromInterval(1000, 3000));
        }

        setTimeout(() => {
            editUserFromDb(data);
            return resolve({
                status: "success",
            });
        }, randomIntFromInterval(1000, 3000));
    });
