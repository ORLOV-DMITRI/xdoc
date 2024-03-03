import {RecordType, SignUpResponse, SignUpType} from "@/types/types";
import {LogInUser} from "../../../server/auth-server";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {queryKeys} from "@/react-query/constants";
import {AddRecord} from "../../../server/add-record";
import {useMutation} from "@tanstack/react-query";

export const useAddRecord = () => {

    const {mutate} = useMutation({
        mutationFn: (data: RecordType) => AddRecord(data),

    })
    return {mutate}
};

