import axios from "axios";
import { configVariables } from "../env";
import { toast } from "react-toastify";

/**
 * Custom service for axios methods
 */
export const httpServices:any = {};
httpServices.get = get;

axios.defaults.baseURL = configVariables.baseURL;
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.interceptors.response.use(
  function (response) {
    let data = response.data;
    if (data || data?.Result) {
      return Promise.resolve(data);
    } else {
      let error = data.error || data.msg || "Api failed";
      return Promise.reject(error);
    }
  },
  function (error) {
    if (error?.request?.status === 401) {
      toast.warn(error.response?.data.message);
    } else if (error?.request?.status === 500) {
      toast.error(error.response?.data.message);
    } else {
      toast.error("Network connection failed ");
    }
    toast.clearWaitingQueue();
    return Promise.reject(error);
  }
);

//axios get method to get the data from Rest API
function get(url: any) {
  return axios.get(url).then((response) => {
    return response;
  });
}
