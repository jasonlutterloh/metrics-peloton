import moment from "moment";

//TODO: convert to using dayjs
export const getReadableDate = (dateString) => {
    return moment(dateString, "YYYY-MM-DD").format();
  };