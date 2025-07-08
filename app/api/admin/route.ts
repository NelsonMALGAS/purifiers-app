export const GET = async () => {
  return Response.json({
    message: "This is dummy data",
    data: {
      id: 1,
      name: "John Doe",
      role: "Doctor",
    },
  });
};
