const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/prisma-test_development",
      test: "postgres://postgres:postgres@localhost:5432/prisma-test_test",
      e2e: "postgres://postgres:postgres@localhost:5432/prisma-test_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

export default getDatabaseUrl;