export type HrRecord = {
  // 氏名情報
  lastName: string            // 姓
  firstName: string           // 名
  lastNameKana: string        // 姓（カナ）
  firstNameKana: string       // 名（カナ）
  fullNameNote: string        // 氏名備考（例：旧姓など）

  // 基本情報
  gender: '男性' | '女性' | ''
  birthDate: string           // 生年月日

  // 所属・勤務
  department: string          // 所属（部署）
  employeeId: string          // 従業員ID
  employeeCode: string        // 従業員コード
  employmentType: string      // 勤務形態
  workStatus: string          // 在籍状態
  hireDate: string            // 入社年月日
  retireDate: string          // 退職年月日（任意）

  // 連絡先
  phoneType: string           // 電話種別（例：自宅、勤務先）
  phoneNumber: string         // 電話番号
  faxNumber: string           // FAX番号
  email: string               // メールアドレス

  // 住所情報
  addressType: string         // 世帯主種別（例：本人、配偶者など）
  zip: string                 // 郵便番号
  prefecture: string          // 都道府県
  city: string                // 市区町村
  cityKana: string            // 市区町村（カナ）
  address1: string            // 住所1（番地）
  address2: string            // 住所2（建物等）
  address1Kana: string        // 住所1カナ
  address2Kana: string        // 住所2カナ

  //　承認ステータス
  approvalStatus: string
}
