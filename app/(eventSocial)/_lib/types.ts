export type Role = "USER" | "ADMIN";
export type JoinPolicy = "OPEN" | "INVITE_ONLY";
export type InviteStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: Role;
}

/** Shape better-auth returns from GET /api/auth/get-session (null when logged out). */
export interface Session {
  user: SessionUser;
  session: { id: string; expiresAt: string };
}

/** The `user` sub-select the event endpoints embed in joined/invited/rejected lists. */
export interface UserSummary {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

/** GET /user/search result rows. */
export interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

/**
 * Event entity as returned by the API (both GET /event and GET /event/:id use
 * this same shape). Note: requests send `startsAt`/`endsAt` but responses
 * carry the DB column names `startDate`/`endDate`.
 */
export interface EventItem {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  joinPolicy: JoinPolicy;
  isBanned: boolean;
  isDeleted: boolean;
  isJoinable: boolean;
  deletedAt: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  /** People with an EventParticipant row — have actually joined. */
  joinedUsers: UserSummary[];
  /** People with a PENDING EventInvite — invited, not yet responded. */
  invitedUsers: UserSummary[];
  /** People with a DECLINED EventInvite. Owner/admin only — omitted entirely for everyone else. */
  rejectedUsers?: UserSummary[];
}

export interface EventInvite {
  id: string;
  eventId: string;
  userId: string;
  status: InviteStatus;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}

/** GET /event/:id returns the same shape as list items. */
export type EventDetail = EventItem;

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}

export type NotificationType = "INVITE" | "RESPONSE";

/** GET /event/:id's actor/event sub-selects, as embedded on each notification. */
export interface NotificationActor {
  id: string;
  name: string;
  image: string | null;
}

export interface NotificationEventSummary {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isBanned: boolean;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  /** Null until responded; RESPONSE rows get it at creation, INVITE rows get it back-filled when the invitee responds. */
  status: InviteStatus | null;
  respondedAt: string | null;
  isRead: boolean;
  /** True if this row was unread before this page load (server marks it read on fetch). */
  isNew: boolean;
  createdAt: string;
  actor: NotificationActor;
  event: NotificationEventSummary;
}

export interface NotificationPageMeta extends PageMeta {
  unreadCount: number;
}

export interface NotificationPaginated {
  items: NotificationItem[];
  meta: NotificationPageMeta;
}

export type EventSortBy = "startDate" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface ListEventsQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: EventSortBy;
  sortOrder?: SortOrder;
}

/** Request body for POST /event; PATCH takes the same shape with all fields optional. */
export interface EventPayload {
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isActive?: boolean;
  joinPolicy?: JoinPolicy;
  inviteUserIds?: string[];
}
