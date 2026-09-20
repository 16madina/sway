import { useEffect, useState } from "react";
import { Compass, Home, Inbox, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { isSheet, Layer, NavProvider, useNav, type Overlay, type Tab } from "@/components/nav";
import { HomeFeed } from "@/components/feed";
import { Discover } from "@/components/discover";
import { Inbox as InboxView, Chat } from "@/components/inbox";
import { ProfileHome, UserScreen } from "@/components/profile";
import { CreateStudio } from "@/components/create";
import { CommentsSheet, EditSheet, SettingsSheet, ShareSheet } from "@/components/sheets";
import { LiveRoom } from "@/components/live";
import { Hub } from "@/components/hub";
import { HostRoom, type LiveKind } from "@/components/live-host";
import { TableRoom } from "@/components/table";
import { SoundScreen, TagScreen, ViewerScreen } from "@/components/overlays";
import { getClip, useSway } from "@/lib/store";
import { useLink } from "@/lib/link";
import { LinkChip } from "@/components/link-bar";

export function SwayApp() {
  return (
    <NavProvider>
      <Phone />
    </NavProvider>
  );
}

function Phone() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    void useSway.persist.rehydrate();
    const t = window.setTimeout(() => setSplash(false), 800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-void text-fg">
      <div className="relative isolate h-dvh w-full max-w-[430px] overflow-hidden bg-bg sm:h-[min(100dvh,844px)] sm:rounded-2xl sm:shadow-phone">
        <Shell />
        {splash ? <Splash /> : null}
      </div>
    </div>
  );
}

function Splash() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg">
      <p className="font-display text-5xl italic tracking-tight text-fg">Sway</p>
      <span className="mt-3 h-px w-12 bg-accent" />
    </div>
  );
}

function Shell() {
  const { tab, setTab, stack, push, pop, notice } = useNav();
  const markInbox = useSway((s) => s.markInboxSeen);
  const inboxSeen = useSway((s) => s.inboxSeen);
  const top = stack[stack.length - 1];
  const hideBar = stack.length > 0;
  const link = useLink();

  useEffect(() => {
    if (tab === "inbox") markInbox();
  }, [tab, markInbox]);

  return (
    <div className="relative h-full w-full bg-bg">
      <div className={cn("absolute inset-0", tab !== "home" && "invisible pointer-events-none")}>
        <HomeFeed />
      </div>
      <div className={cn("absolute inset-0", tab !== "discover" && "invisible pointer-events-none")}>
        <Discover />
      </div>
      <div className={cn("absolute inset-0", tab !== "inbox" && "invisible pointer-events-none")}>
        <InboxView />
      </div>
      <div className={cn("absolute inset-0", tab !== "profile" && "invisible pointer-events-none")}>
        <ProfileHome />
      </div>

      <TabBar
        tab={tab}
        hidden={hideBar}
        unread={!inboxSeen}
        onTab={setTab}
        onCreate={() => push({ t: "hub" })}
      />

      {top ? (
        <Layer
          open
          variant={top.t === "hub" ? "glass" : isSheet(top) ? "sheet" : "push"}
          onClose={pop}
        >
          <OverlayView item={top} />
        </Layer>
      ) : null}

      {notice ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-50 flex justify-center">
          <span className="rounded-full bg-surface-2 px-4 py-2 text-sm text-fg shadow-[0_0_0_1px_rgb(242_238_230_/_0.12)]">
            {notice}
          </span>
        </div>
      ) : null}

      {link !== "good" ? (
        <div className={cn("pointer-events-none absolute inset-x-0 z-[60] flex justify-center px-4", hideBar ? "top-[3.25rem]" : "bottom-[5.25rem]")}>
          <LinkChip level={link} />
        </div>
      ) : null}

      {top ? <span className="sr-only">{top.t}</span> : null}
    </div>
  );
}

function OverlayView({ item }: { item: Overlay }) {
  switch (item.t) {
    case "comments":
      return <CommentsSheet clipId={item.clipId} />;
    case "share":
      return <ShareSheet clipId={item.clipId} />;
    case "settings":
      return <SettingsSheet />;
    case "edit":
      return <EditSheet />;
    case "user":
      return <UserScreen userId={item.userId} />;
    case "sound":
      return <SoundScreen soundId={item.soundId} />;
    case "tag":
      return <TagScreen tag={item.tag} />;
    case "live":
      return <JoinLive clipId={item.clipId} />;
    case "create":
      return <CreateStudio duoOf={item.duoOf} />;
    case "hub":
      return <Hub />;
    case "chat":
      return <Chat threadId={item.threadId} />;
    case "viewer":
      return <ViewerScreen clipId={item.clipId} ids={item.ids} />;
  }
}

function JoinLive({ clipId }: { clipId: string }) {
  const { pop } = useNav();
  const me = useSway((s) => s.me);
  const clip = getClip(clipId);
  if (!clip?.liveKind) return <LiveRoom clipId={clipId} />;
  if (clip.liveKind === "table") {
    return (
      <TableRoom
        cfg={{
          title: clip.caption,
          desc: "",
          cover: clip.poster,
          wood: "noyer",
          places: clip.tablePlaces === 4 || clip.tablePlaces === 6 ? clip.tablePlaces : 8,
          priv: false,
          premium: false,
          tickets: "3",
          comments: "all",
          questions: true,
          rules: "Respect. Pas de jugement. Une question à la fois.",
        }}
        onBack={pop}
      />
    );
  }
  return (
    <HostRoom
      kind={clip.liveKind as LiveKind}
      title={clip.caption}
      desc=""
      cover={clip.poster}
      priv={false}
      premium={false}
      comments
      questions={clip.liveKind === "stand"}
      maxGuests={clip.liveKind === "openmic" ? 4 : 0}
      slamMode="open"
      rules="Respect · Pas de jugement · Bonne écoute"
      commentWho="all"
      tickets="3"
      onLeave={pop}
      startWatch={clip.userId !== me.id}
    />
  );
}

function TabBar({
  tab,
  hidden,
  unread,
  onTab,
  onCreate,
}: {
  tab: Tab;
  hidden: boolean;
  unread: boolean;
  onTab: (t: Tab) => void;
  onCreate: () => void;
}) {
  return (
    <nav
      className={cn(
        "absolute inset-x-0 bottom-0 z-30 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)] transition-transform duration-200 ease-out",
        hidden && "pointer-events-none invisible translate-y-full",
      )}
    >
      <div className="grid h-14 grid-cols-5 items-center">
        <TabBtn active={tab === "home"} label="Accueil" onClick={() => onTab("home")}>
          <Home className="size-6" strokeWidth={tab === "home" ? 2.2 : 1.7} />
        </TabBtn>
        <TabBtn active={tab === "discover"} label="Découvrir" onClick={() => onTab("discover")}>
          <Compass className="size-6" strokeWidth={tab === "discover" ? 2.2 : 1.7} />
        </TabBtn>
        <button
          type="button"
          aria-label="Créer"
          onClick={onCreate}
          className="relative z-30 flex h-14 items-center justify-center"
        >
          <span className="flex h-8 w-12 items-center justify-center rounded-sm bg-accent text-accent-fg">
            <Plus className="size-5" strokeWidth={2.4} />
          </span>
        </button>
        <TabBtn active={tab === "inbox"} label="Boîte" onClick={() => onTab("inbox")} badge={unread}>
          <Inbox className="size-6" strokeWidth={tab === "inbox" ? 2.2 : 1.7} />
        </TabBtn>
        <TabBtn active={tab === "profile"} label="Profil" onClick={() => onTab("profile")}>
          <User className="size-6" strokeWidth={tab === "profile" ? 2.2 : 1.7} />
        </TabBtn>
      </div>
    </nav>
  );
}

function TabBtn({
  active,
  label,
  onClick,
  children,
  badge,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  badge?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex h-14 items-center justify-center",
        active ? "text-fg" : "text-muted",
      )}
    >
      {children}
      {badge ? <span className="absolute right-[calc(50%-14px)] top-2 size-1.5 rounded-full bg-accent" /> : null}
    </button>
  );
}
