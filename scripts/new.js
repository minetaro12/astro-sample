import moment from "moment"
import fs from "fs"

const date = moment().format()
const path = process.argv[2]

function createFile(filePath, data) {
  // ファイルの存在確認
  if (fs.existsSync(filePath)) {
    throw new Error("File already exists")
  }

  try {
    fs.writeFileSync(filePath, data)
  } catch (err) {
    if (err.code === "ENOENT") {
      // ディレクトリ部分を取得
      const dir = filePath.substring(0, filePath.lastIndexOf("/"))

      // 親ディレクトリ作成
      try {
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(filePath, data)
      } catch (err) {
        throw new Error(err)
      }
    } else {
      throw new Error(err)
    }
    console.log("Created " + filePath)
  }
}

if (path == "" || path == undefined) {
  throw new Error("Creation location not specified")
}

const strs = `---
title: ""
date: "${date}"
tags: []
---`

createFile(path, strs)