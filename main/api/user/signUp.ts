import api from "../../config/api.config";

export interface TypeReqUserData {
  email: string;
  name: string;
  password: string;
  profile: string;
}

export interface TypeResUserData {
  id: string;
}

export interface TypeResError {
  fieldErrors?: Array<{
    field: string;
    rejectedValue: string;
    message: string;
  }>;
  violationErrors?: Array<{
    propertyPath: string;
    invalidValue: string;
    message: string;
  }>;
  httpStatus: string;
  message: string;
}

export default async function postUser(data: TypeReqUserData, config = {}) {
  try {
    const result = await api.post(`/users`, data, config);
    return result.data as TypeResUserData;
  } catch (error: any) {
    console.log("users", error.response?.data || error.message);
    return error.response?.data as TypeResError;
  }
}
