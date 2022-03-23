const useDateTime = () => {

    //formats date object into a string
    const formatDate = (date: Date | undefined | null) => {
        if (date !== undefined && date !== null) {
            let month = date?.getMonth() + 1;
            let day = date?.getDate();
            let year = date?.getUTCFullYear().toString();
            let formattedMonth = month < 10 ? `0${month}` : month;
            let formattedDay = day < 10 ? `0${day}` : day;
            let formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
            return formattedDate;
        }
        return undefined
    };

    const today = new Date();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const year = new Date().getUTCFullYear();
    return {
        formatDate,
        today,
        month,
        day,
        year
    }
}

export default useDateTime;