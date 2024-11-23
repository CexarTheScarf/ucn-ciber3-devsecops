console.log("Mock de prima en __mock__ cargado");
const mockPrismaClient = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  post: {
    findMany: jest.fn(),
  },
  // Añade más métodos según sea necesario
};

const PrismaClientMock = jest.fn(() => mockPrismaClient);

export default PrismaClientMock;
