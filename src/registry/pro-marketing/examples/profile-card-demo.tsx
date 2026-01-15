import {
  ProfileCard,
  ProfileCardAvatar,
  ProfileCardDetails,
} from "@/registry/pro-marketing/ui/profile-card";

export function ProfileCardDemo() {
  return (
    <div className="flex flex-col gap-12 p-5 lg:p-8">
      <ProfileCard>
        <ProfileCardAvatar src="https://github.com/shadcn.png" name="shadcn" />
        <ProfileCardDetails name="Sophie Tan" body="sophie.tan@gmail.com" />
      </ProfileCard>

      <ProfileCard variant="horizontal">
        <ProfileCardAvatar src="https://github.com/shadcn.png" name="shadcn" />
        <ProfileCardDetails name="Sophie Tan" body="4 Sept, 2025" />
      </ProfileCard>

      <ProfileCard className="justify-between">
        <ProfileCardDetails name="Sophie Tan" body="sophie.tan@gmail.com" />
        <ProfileCardAvatar src="https://github.com/shadcn.png" name="shadcn" />
      </ProfileCard>

      <ProfileCard variant="vertical">
        <ProfileCardAvatar src="https://github.com/shadcn.png" name="shadcn" />
        <ProfileCardDetails name="Sophie Tan" body="CEO" />
      </ProfileCard>
    </div>
  );
}
