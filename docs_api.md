1. api update profile
endpoint: /api/v3/proposals
method: post
payload: {
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "created_by": "550e8400-e29b-41d4-a716-446655440001",
  "change_fields": "{\"phone\":\"0901234567\",\"address\":\"123 Nguyễn Huệ, Q1, HCM\"}",
  "created_at": "2026-03-25T08:00:00.000Z",
  "status": "pending",
  "requested_by_app": "HRIS"
}

2. change avatar
endpoint: /api/v3/users/update-avatar
method: post
payload: formdata 