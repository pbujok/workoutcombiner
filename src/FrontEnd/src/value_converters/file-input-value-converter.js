export class FileInputValueConverter{
    fromView(fileList) {
        if (fileList[0]) {
            return fileList[0];
        }
    }
}