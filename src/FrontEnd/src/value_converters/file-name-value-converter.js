export class FileNameValueConverter {
    toView(file) {
        if (file) {
            return file.name;
        }
        return "...";
    }
}