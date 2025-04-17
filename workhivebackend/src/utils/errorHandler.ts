export const errorHandler = (res: any, message: string, status = 400) => {
  return res.status(status).json({ success: false, message });
};
