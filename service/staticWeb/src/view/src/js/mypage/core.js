/* mypage/core.js */

export const showUploadedImg = async ({ fetchUploadedFileList, loadUploadedImg }) => {
  const fileListResult = await fetchUploadedFileList()
  console.log({ debug: true, fileListResult })
  if (!fileListResult || !fileListResult.result || !fileListResult.result.fileList || !fileListResult.result.fileList[0]) {
    loadUploadedImg({ fileId: null })
    return
  }

  const { fileLabel } = fileListResult.result.fileList[0]
  loadUploadedImg({ fileLabel })
}

export const _ = {}

