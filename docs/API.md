# Admin Panel API

**Base URL:** `http://admin3.ndc-agency.uz`
**Swagger UI:** `http://admin3.ndc-agency.uz/api/documentation`
**OpenAPI Spec:** `http://admin3.ndc-agency.uz/docs`
**CORS:** `*` (all origins)

---

## Response Format

All list endpoints return paginated responses:

```json
{
  "data": [...],
  "total": 1,
  "per_page": 15,
  "current_page": 1,
  "last_page": 1,
  "next_page_url": null,
  "prev_page_url": null
}
```

Empty results: `{ "message": "No records found" }`

---

## Config & Settings

### GET `/api/config`
Returns active modules, groups, and settings.

```json
{
  "modules": [
    { "id": 1, "title": "Заявки (Applications)", "route": "applications", "group_id": null },
    { "id": 5, "title": "Блог/Новости (Blog)", "route": "posts", "group_id": 2 },
    { "id": 6, "title": "Категории постов", "route": "posts_categories", "group_id": 2 },
    { "id": 12, "title": "Команда (Team)", "route": "members", "group_id": 4 },
    { "id": 16, "title": "FAQ (Вопросы)", "route": "questions", "group_id": 4 },
    { "id": 17, "title": "Услуги (Services)", "route": "services", "group_id": 4 },
    { "id": 19, "title": "Баннеры", "route": "banners", "group_id": null },
    { "id": 20, "title": "Видео", "route": "videos", "group_id": 4 },
    { "id": 21, "title": "Тарифы и абонементы", "route": "tariffs", "group_id": 4 },
    { "id": 22, "title": "Филиалы", "route": "filials", "group_id": 4 }
  ],
  "groups": [
    { "id": 2, "title": "Посты" },
    { "id": 4, "title": "Компания" }
  ],
  "settings": { "cors_allowed_origins": "*" }
}
```

### GET `/api/langs`
Returns available languages.

```json
{
  "data": [
    { "id": 1, "title": "English", "code": "en", "is_main": 1, "icon": null }
  ]
}
```

### GET `/api/siteinfo`
Site information (name, contacts, socials, etc.)

### GET `/api/settings`
Site settings.

### GET `/api/translations`
Translation strings for i18n.

---

## Banners (Hero Slider)

### GET `/api/banners`

```json
{
  "data": [
    {
      "id": 1,
      "title": "...",
      "desc": "<p>HTML description</p>",
      "url": null,
      "video": null,
      "images": { "lg": null, "md": null, "sm": null }
    }
  ]
}
```

---

## Services (Schedule / Groups)

### GET `/api/services`
Paginated list of active services (dance groups/classes).

**Query params:**
| Param | Type | Description |
|-------|------|-------------|
| `member_id` | integer | Filter by teacher (Преподаватель) |
| `filial_id` | integer | Filter by branch (Филиал) |
| `group_type` | string | Filter by group type (Тип группы) |
| `class_days` | string | Filter by days of classes (Дни занятий) |
| `status` | string | `active` (default) or `inactive` |
| `per_page` | integer | Items per page (max 100, default 15) |

Response includes: member (teacher), filial (branch), schedule fields.

### GET `/api/services/{id}`
Full service details.

---

## Members (Teachers / Team)

### GET `/api/members`
List of team members with experience, education, certificates, description.

**Query params:** `per_page` (default 15)

### GET `/api/members/{id}`
Member details.

---

## Tariffs & Subscriptions

### GET `/api/tariffs`
Tariffs and special offers with benefits, program_includes.

**Query params:**
| Param | Type | Description |
|-------|------|-------------|
| `type` | string | `tariff` or `special_offer` |
| `per_page` | integer | Default 20 |

### GET `/api/tariffs/{id}`
Tariff details.

---

## Filials (Branches)

### GET `/api/filials`
Branches with address, phone, location (map link), photo.

**Query params:** `per_page` (default 50)

### GET `/api/filials/{id}`
Branch details.

---

## Videos

### GET `/api/videos`
List of videos. **Query params:** `per_page` (default 15)

### GET `/api/videos/{id}`
Video details.

---

## Blog / Posts

### GET `/api/posts`
List of blog posts.

### GET `/api/posts/{slug}`
Post by slug.

### GET `/api/categories`
Post categories.

### GET `/api/categories/{slug}`
Category by slug.

### GET `/api/categories/filter/{slug}`
Filter posts by category slug.

---

## Partners

### GET `/api/partners`
List of partners.

### GET `/api/partners/{id}`
Partner details.

---

## Certificates

### GET `/api/file`
List of certificates.

### GET `/api/file/{id}`
Certificate details.

---

## FAQ

### GET `/api/url`
List of questions and answers.

---

## Feedbacks / Reviews

### GET `/api/feedbacks`
List of feedbacks.

### GET `/api/feedbacks/{id}`
Feedback details.

---

## Vacancies

### GET `/api/vacancies`
List of vacancies.

### GET `/api/vacancies/{slug}`
Vacancy by slug.

---

## Documents

### GET `/api/documents`
List of documents.

### GET `/api/documents/{slug}`
Document by slug.

### GET `/api/document/{slug}`
Single document by slug.

### GET `/api/documents/filter/{slug}`
Filter documents by slug.

---

## Works (Portfolio)

### GET `/api/works`
List of works.

### GET `/api/works/{slug}`
Work by slug.

---

## Brands

### GET `/api/brands`
List of product brands.

---

## Applications (POST endpoints)

### POST `/api/contacts`
Submit contact form.

**Body** (`application/x-www-form-urlencoded`):
| Field | Type | Required |
|-------|------|----------|
| `name` | string | - |
| `phone` | string | - |
| `email` | string | - |
| `message` | string | - |

**Responses:** `200` Success, `422` Validation error

### POST `/api/zapis`
Submit booking / enrollment.

**Body** (`application/x-www-form-urlencoded`):
| Field | Type | Required |
|-------|------|----------|
| `name` | string | - |
| `phone` | string | - |
| `email` | string | - |
| `message` | string | - |
| `type` | string | - |
| `page` | string | - |
| `company` | string | - |

**Responses:** `200` Success, `422` Validation error

---

## Legacy Endpoints

### GET `/api/file2`
Legacy services list.

### GET `/api/file2/{id}`
Legacy service details.

### GET `/api/file3`
Legacy services type 2.
