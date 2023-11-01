const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/prisma-boilerplate_development",
      test: "postgres://postgres:postgres@localhost:5432/prisma-boilerplate_test",
      e2e: "postgres://postgres:postgres@localhost:5432/prisma-boilerplate_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

export default getDatabaseUrl;
