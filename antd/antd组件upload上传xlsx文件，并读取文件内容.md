### xlsx包

这个包是个npm包，这里使用的版本为：

> “xlsx”: “^0.14.5”

### 使用方式

首先，在文件中引入：

```js
import XLSX from 'xlsx';
```

然后在upload组件的beforeUpload中使用：

```js
beforeUpload(files) {
const readFile = file => {
        const [fileReader, data1] = [new FileReader(), {}];
        let [binaryData, workbook] = [null, null];
        fileReader.onload = e => {
          binaryData = e.target.result;
          workbook = XLSX.read(binaryData, { type: 'binary' });
          Object.keys(workbook.Sheets).forEach(sheet => {
            data1[sheet] = XLSX.utils
              .sheet_to_json(workbook.Sheets[sheet], { header: 1 })
              .slice(1);
          });
          workbook.SheetNames.forEach(sheetName => {
            const dataSheet = data1[sheetName];
            for (let index = 0; index < dataSheet.length; index += 1) {
              const row = dataSheet[index];
              const item = {
                name: row[0] ? row[0] : null,
                snCode: row[1] ? row[1] : null,
                macAddress: row[2] ? row[2] : null,
                ipAddress: row[3] ? row[3] : null,
                number: Number(row[4] ? row[4] : null),
                podium: (row[5] ? row[5] : null) === '是' ? true : false,
                devices: [
                  {
                    ipAddress: row[6] ? row[6] : null,
                    location: 'top1'
                  },
                  {
                    ipAddress: row[7] ? row[7] : null,
                    location: 'side1'
                  },
                  {
                    ipAddress: row[8] ? row[8] : null,
                    location: 'front1'
                  },
                  {
                    ipAddress: row[9] ? row[9] : null,
                    location: 'front2'
                  },
                ]
              };
              fileData.push(item);
            }
          });
          // fileData即为表格数据
          if (fileData.length > 0) {
            that.setState({
              tables: fileData,
            });
            message.success('导入成功！');
          }else {
            message.error('导入失败！')
          }
        };
        fileReader.readAsBinaryString(file);
      };
      readFile(uploadFile);
```