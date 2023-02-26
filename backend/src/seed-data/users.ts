import bcrypt from "bcrypt";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";

interface IUserSeed {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const users: IUserSeed[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password1",
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: "password2",
    isAdmin: false,
  },
  {
    name: "Bob Smith",
    email: "bobsmith@example.com",
    password: "password3",
    isAdmin: false,
  },
  {
    name: "Emma Watson",
    email: "emmawatson@example.com",
    password: "password4",
    isAdmin: false,
  },
  {
    name: "Tom Cruise",
    email: "tomcruise@example.com",
    password: "password5",
    isAdmin: false,
  },
  {
    name: "Michael Jordan",
    email: "michaeljordan@example.com",
    password: "password6",
    isAdmin: false,
  },
  {
    name: "Tiger Woods",
    email: "tigerwoods@example.com",
    password: "password7",
    isAdmin: false,
  },
  {
    name: "LeBron James",
    email: "lebronjames@example.com",
    password: "password8",
    isAdmin: false,
  },
  {
    name: "Kobe Bryant",
    email: "kobebryant@example.com",
    password: "password9",
    isAdmin: false,
  },
  {
    name: "Dwayne Johnson",
    email: "dwaynejohnson@example.com",
    password: "password10",
    isAdmin: false,
  },
];

const seedUserData = async () => {
  const dbUtils = new DatabaseUtils();

  try {
    await dbUtils.exec("usp_DeleteAllUsers", {});

    for (const user of users) {
      CreateLog.debug(bcrypt.hashSync(user.password, 10));
      
      await dbUtils.exec("usp_RegisterUser", {
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        isAdmin: user.isAdmin,
      });
    }

    CreateLog.info(`${users.length} users seeded`);

    process.exit();
  } catch (error) {
    CreateLog.error(error);
    process.exit(1);
  }
};

seedUserData();
