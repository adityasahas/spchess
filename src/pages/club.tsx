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
  Chip,
  User,
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
interface CircularCountProps {
  count: number;
}
interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <Chip color="success" variant="shadow">
            Average Rating
          </Chip>
        </div>
        <div className="text-right">
          <Chip size="sm" color="success">
            {value}/2000
          </Chip>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-success-50">
        <div
          style={{ width: `${(value / 2000) * 100}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success"
        ></div>
      </div>
    </div>
  );
};

const CircularCount: React.FC<CircularCountProps> = ({ count }) => (
  <div className="flex items-center">
    <div
      className="flex items-center justify-center rounded-full bg-success text-white text-2xl"
      style={{
        width: "50px",
        height: "50px",
      }}
    >
      {count}
    </div>
    <span className="ml-4 text-lg">Members</span>
  </div>
);

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
      <h1 className="text-4xl font-bold mb-4 text-center">
        Club Dashboard
      </h1>
      {clubData && (
        <div className="text-center mb-12">
          <Link
            isBlock
            isExternal
            showAnchorIcon
            href={clubData.join_request}
            className="text-3xl font-bold mb-12"
          >
            Chess.com Club Link
          </Link>
        </div>
      )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {clubData ? (
            <Card>
              <CardHeader>
                <Avatar src={clubData.icon} />
                <div className="ml-4">
                  <h2 className="text-2xl">{clubData.name}</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p>{clubData.description.slice(3, -4)}</p>

                <ProgressBar value={clubData.average_daily_rating} />
                <CircularCount count={clubData.members_count} />
              </CardBody>
              
            </Card>
          ) : (
            <Spinner />
          )}

          <Card>
            <CardHeader>
              <h2 className="text-2xl">Members Directory</h2>
            </CardHeader>
            <CardBody>
              <Table aria-label="Members Directory">
                <TableHeader>
                  <TableColumn>Profile</TableColumn>
                  <TableColumn>Username</TableColumn>
                  <TableColumn>Profile Link</TableColumn>
                </TableHeader>
                <TableBody
                  items={membersData?.weekly || []}
                  isLoading={!membersData}
                >
                  {(member: Member) => (
                    <TableRow key={member.username}>
                      <TableCell>
                        <Avatar src={member.avatar} />
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
              </Table>{" "}
            </CardBody>
          </Card>

          {/* Matches Card */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl">Recent Matches</h2>
            </CardHeader>
            <CardBody>
              {matchesData ? (
                matchesData.finished.map((match, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <h3>{match.name}</h3>
                      <Badge
                        color={match.result === "win" ? "success" : "danger"}
                      >
                        {match.result}
                      </Badge>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <Spinner />
              )}{" "}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Club;
