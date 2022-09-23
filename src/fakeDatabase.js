import { faker } from "@faker-js/faker";
import myAvatar from "./images/remi.jpg";

export const database = { users: [] };

// my profile to login
database.users.push({
    id: "1",
    email: "achji.remi@gmail.com",
    first_name: "Remi",
    last_name: "Achji",
    avatar: myAvatar,
});

for (let i = 2; i <= 12; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    database.users.push({
        id: `${i}`,
        email: faker.internet.email(firstName, lastName),
        first_name: firstName,
        last_name: lastName,
        avatar: faker.internet.avatar(),
    });
}

export const addNewUser = (data) => {
    database.users.push(data);
};

export const deleteUserFromDb = (userId) => {
    const updated = database.users.filter((user) => user.id !== userId);
    database.users = updated;
};

export const editUserFromDb = (data) => {
    const userIndex = database.users.findIndex((user) => user.id === data.id);
    if (userIndex > -1) {
        database.users[userIndex] = data;
    }
};
