import XLSX from 'xlsx'

function readExcel(e) { //表格导入
    return new Promise((resolve, reject) => {
        const files = e.target.files;
        if (files.length <= 0) {
            reject('没有文件名')
            return;
        } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
            reject('上传格式不正确，请上传xls或者xlsx格式');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
            console.log(ev,ev.target)
            try {
                const data = ev.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                const wsname = workbook.SheetNames[0]; //取第一张表
                const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容  
                resolve(ws);
            } catch (e) {
                reject('false')
            }
        };
        fileReader.readAsBinaryString(files[0]);
    })
}

export default readExcel