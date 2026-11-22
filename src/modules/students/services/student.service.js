import api from "@/services/api";

const studentService = {
  async getStudents(params = {}) {
    const response = await api.get("/api/v1/academy/students", {
      params,
    });

    return response.data;
  },
};

export default studentService;
