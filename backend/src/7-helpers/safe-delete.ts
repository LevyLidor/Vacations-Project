import fs from 'fs';

function safeDelete(fullPath: fs.PathLike) {
    try {

        if (!fullPath || !fs.existsSync(fullPath)) return; // if "fullPath" undifined or not exists "return";
        
        fs.unlinkSync(fullPath); // delete the file from "fullPath";

    } catch (error) { };
};

export default safeDelete;

