import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Divider,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Badge,
  User
} from "@nextui-org/react";

interface ClubData {
  icon: string;
  name: string;
  visibility: string;
  description: string;
  average_daily_rating: number;
  members_count: number;
  join_request: string;
}

interface Member {
  username: string;
  name?: string;
  avatar?: string;
  url?: string;
}

interface MembersData {
  weekly: Member[];
}

interface Match {
  name: string;
  result: string;
}

interface MatchesData {
  finished: Match[];
}

const Club = () => {
  const urlID = "sierra-pacific-chess-club";
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [membersData, setMembersData] = useState<MembersData | null>(null);
  const [matchesData, setMatchesData] = useState<MatchesData | null>(null);

  useEffect(() => {
    fetch(`https://api.chess.com/pub/club/sierra-pacific-chess-club`)
      .then((response) => response.json())
      .then((data) => setClubData(data));

    fetch(`https://api.chess.com/pub/club/sierra-pacific-chess-club/members`)
      .then((response) => response.json())
      .then(async (data) => {
        const membersWithProfile = await Promise.all(
          data.weekly.map(async (member: Member) => {
            const response = await fetch(
              `https://api.chess.com/pub/player/${member.username}`
            );
            const profile = await response.json();
            return {
              ...member,
              name: profile.username,
              avatar: profile.avatar,
              url: profile.url,
            };
          })
        );
        setMembersData({ weekly: membersWithProfile });
      });

    fetch(`https://api.chess.com/pub/club/sierra-pacific-chess-club/matches`)
      .then((response) => response.json())
      .then((data) => setMatchesData(data));
  }, []);

  return (
    <>
      <div className="p-12">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Club Information
        </h1>

        {clubData ? (
          <Card className="mb-8">
            <CardHeader>
              <Avatar src={clubData.icon} />
              <div className="ml-4">
                <h2 className="text-2xl">{clubData.name}</h2>
              </div>
              <Link isBlock isExternal href={clubData.join_request}>
                Join Club
              </Link>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{clubData.description}</p>
              <p>Average Rating: {clubData.average_daily_rating}</p>
              <p>Members: {clubData.members_count}</p>
            </CardBody>
          </Card>
        ) : (
          <Spinner />
        )}

        <h2 className="text-2xl font-bold mb-4">Members Directory</h2>
        <Table aria-label="Members Directory">
          <TableHeader>
            <TableColumn>Profile</TableColumn>
            <TableColumn>Username</TableColumn>
            <TableColumn>Profile Link</TableColumn>
          </TableHeader>
          <TableBody items={membersData?.weekly || []} isLoading={!membersData}>
            {(member: Member) => (
              <TableRow key={member.username}>
                <TableCell>
                  <Avatar
                    src={member.avatar}
                  />
                  
                </TableCell>
                <TableCell>{member.username}</TableCell>
                <TableCell>
                  {member.url ? (
                    <Link
                    isBlock
                        isExternal
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Profile
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {matchesData ? (
            matchesData.finished.map((match, index) => (
              <Card key={index}>
                <CardHeader>
                  <h3>{match.name}</h3>
                  <Badge color={match.result === "win" ? "success" : "danger"}>
                    {match.result}
                  </Badge>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};

export default Club;
