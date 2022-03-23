import jsPDF from 'jspdf';
import 'jspdf-autotable';
import XLSX from "xlsx";
import { saveAs } from "file-saver";

const useExports = () => {

    const exportToExcel = async (data: any[], columnFields: { field: string, label?: string, title?: string }[]) => {
        //process data so it can be converted into an excel workbook
        const processedData = () => {
            const flattenedArrayData = data.map((item) => {
                const arrayItem = columnFields.map(({ field }) => {
                    return item[field] ? (item[field].toString().indexOf("/Date(") === -1 ?  item[field] : new Date(parseFloat(item[field].match(/\d+/g)[0])).toLocaleDateString()) : item[field];
                });
                return arrayItem;
            });

            const flattendColumnFields = columnFields.map(({ field, label, title }) => {
                if (label) {
                    return label
                }
                if (title) {
                    return title
                }
                return field;
            });
            const excelReadyData = [flattendColumnFields, ...flattenedArrayData];
            return excelReadyData;
        };

        //convert data to excel workbook
        const worksheet = XLSX.utils.aoa_to_sheet(processedData());
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "SheetJS");
        const output = XLSX.write(workbook, {
            bookType: "xlsx",
            bookSST: false,
            type: "binary",
        });

        const s2ab = (s: any) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        };

        const startExport = new Promise((resolve, reject) => {
            saveAs(new Blob([s2ab(output)], { type: "application/octet-stream" }), `export.xlsx`)
            resolve('done');
            reject('error');
        });

        return startExport;

    };

    const exportToPDF = async (data: any[], columnFields: { field: string, label?: string, title?: string }[]) => {

        //process data so it can be converted into a pdf
        const flattenedRowData = data?.map((item) => {
            const arrayItem = columnFields?.map(({ field }) => {
                return item[field] ? (item[field].toString().indexOf("/Date(") === -1 ?  item[field] : new Date(parseFloat(item[field].match(/\d+/g)[0])).toLocaleDateString()) : item[field];
            });
            return arrayItem;
        });

        const flattendColumnFields = columnFields?.map(({ field, label, title }) => {
            if (label) {
                return label
            }
            if (title) {
                return title
            }
            return field;
        });

        const doc = new jsPDF('landscape');
        (doc as any).autoTable({
            styles : { lineColor : 3, lineWidth : .2 }, 
            headStyles: { fontSize: 7, wordBreak : "break-word" },
            bodyStyles: { fontSize: 7 },
            margin: { top: 10, left: 10, right: 10, bottom: 10 },
            tableLineColor : 15,
            tableLineWidth: .5,
            head: [flattendColumnFields],
            body: flattenedRowData,
        });

        const startExport = new Promise((resolve, reject) => {
            doc.save(`grid-data.pdf`);
            resolve('done');
            reject('error');
        });

        return startExport;

    };
    return {
        exportToExcel,
        exportToPDF
    }
}


export default useExports;