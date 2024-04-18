'use client'
import EditRecord from "@/components/EditRecord";
import {Record} from "@/types/types";
import {useGetRecordsById} from "@/react-query/record/useGetRecordById";

export default function EditRecordPage({params}: { params: { id: string } }) {
    const {record}: { record: Record } = useGetRecordsById(params.id);

    return <EditRecord record={record}/>;
};
