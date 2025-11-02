const { UserService } = require("../src/userService");

const defaultUser = {
  name: "João Silva",
  email: "joao@teste.com",
  age: 29,
};

describe("UserService - Refactored Scenarios", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  test("GIVEN valid user info WHEN creating a new user THEN returns id, correct name, and status 'active'", () => {
    const { name, email, age } = defaultUser;

    const newUser = userService.createUser(name, email, age);

    expect(newUser.id).toBeDefined();
    expect(newUser.nome).toBe(name);
    expect(newUser.status).toBe("ativo");
  });

  test("GIVEN a registered user WHEN searching by ID THEN returns the expected user data", () => {
    const user = userService.createUser("Carla", "carla@email.com", 26);

    const result = userService.getUserById(user.id);

    expect(result).toMatchObject({
      nome: "Carla",
      email: "carla@email.com",
      status: "ativo",
    });
  });

  test("GIVEN a normal user WHEN deactivating THEN returns true and status 'inactive'", () => {
    const defaultUser = userService.createUser("Pedro", "pedro@teste.com", 31);

    const desativation = userService.deactivateUser(defaultUser.id);
    const resultedUser = userService.getUserById(defaultUser.id);

    expect(desativation).toBe(true);
    expect(resultedUser.status).toBe("inativo");
  });

  test("GIVEN an admin user WHEN trying to deactivate THEN returns false", () => {
    const admin = userService.createUser("Helena", "helena@teste.com", 45, true);

    const result = userService.deactivateUser(admin.id);

    expect(result).toBe(false);
  });

  test("GIVEN multiple users WHEN generating a report THEN the report contains the users' names and the correct title", () => {
    userService.createUser("Lucas", "lucas@email.com", 33);
    userService.createUser("Mariana", "mariana@email.com", 27);

    const report = userService.generateUserReport();

    expect(report).toContain("Lucas");
    expect(report).toContain("Mariana");
    expect(report).toContain("Relatório de Usuários");
  });

  test("GIVEN user data for a minor WHEN trying to create THEN throws minimum age error", () => {
    const createMinorUser = () =>
      userService.createUser("Tiago", "tiago@email.com", 16);

    expect(createMinorUser).toThrow("O usuário deve ser maior de idade.");
  });
});
