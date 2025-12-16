import { useState } from "react";
import { User } from "lucide-react";
import { useInfiniteEmployeesQuery } from "@/actions/useInfiniteEmployeesQuery";
import { useSkillsQuery } from "@/actions/useSkillsQuery";
import { employees } from "@/data/employees";
import { skills, type Skill } from "@/data/skills";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import BadgeComponent from "./version-badge";
import { GenericMultiSelect } from "react-generic-select";
import { GenericSingleSelect } from "react-generic-select";

function ReactGenericDemo() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [searchTermSingle, setSearchTermSingle] = useState("");
  const [searchTermSkills, setSearchTermSkills] = useState("");
  const [perPage, setPerPage] = useState(10);

  const {
    employees: paginatedEmployeesSingle,
    fetchNextEmployees: fetchNextEmployeesSingle,
    hasNextEmployeesPage: hasNextEmployeesPageSingle,
    isFetchingNextEmployeesPage: isFetchingNextEmployeesPageSingle,
    isFetchingEmployees: isFetchingEmployeesSingle,
  } = useInfiniteEmployeesQuery(searchTermSingle, perPage);

  const {
    skills: paginatedSkills,
    fetchNextSkills,
    hasNextSkillsPage,
    isFetchingNextSkillsPage,
    isFetchingSkills,
  } = useSkillsQuery(searchTermSkills, perPage);

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);
  const selectedSkills: Skill[] = skills.filter((skill) =>
    selectedSkillIds.includes(skill.id)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-10">
        <header className="space-y-1">
          <BadgeComponent />
          <h1 className="text-4xl font-bold tracking-tight ">
            react-generic-select
          </h1>
          <p className="text-sm text-muted-foreground">
            Type-safe, composable single and multi-select components for React
            applications.
          </p>
        </header>

        <section className="space-y-4">
          <p className="text-lg font-medium ">why react-generic-select?</p>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              Single-select employee picker
            </h2>
            <p className="text-sm text-muted-foreground">
              Demonstrates the <code>GenericSingleSelect</code> component with{" "}
              <code>valueKey</code> and <code>labelKey</code> mapped to an
              employee data model.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Per page:</span>
            <select
              className="rounded border bg-background px-2 py-1 text-xs"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <GenericSingleSelect
            options={paginatedEmployeesSingle}
            labelKey="name"
            valueKey="id"
            value={selectedEmployeeId}
            onValueChange={setSelectedEmployeeId}
            onLoadMore={fetchNextEmployeesSingle}
            hasNextPage={hasNextEmployeesPageSingle}
            isFetchingNextPage={isFetchingNextEmployeesPageSingle}
            onSearchChange={setSearchTermSingle}
            isLoading={isFetchingEmployeesSingle}
          />

          {selectedEmployee && (
            <div className="mt-4">
              <Card>
                <CardHeader className="border-b pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User size={18} />
                    </span>
                    <span>Selected employee details</span>
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Currently bound to <code>valueKey="id"</code> and displaying
                    <code>labelKey="name"</code> from the provided options
                    collection.
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Id
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedEmployee.id}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Name
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedEmployee.name}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Department
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {selectedEmployee.department}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Position
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedEmployee.title}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              Multi-select skills picker
            </h2>
            <p className="text-sm text-muted-foreground">
              Demonstrates the <code>GenericMultiSelect</code> component with
              searchable chips, badges, and support for selecting multiple
              skills via <code>valueKey</code> and a custom{" "}
              <code>getOptionLabel</code> that maps to skill names.
            </p>
          </div>

          <GenericMultiSelect
            options={paginatedSkills}
            valueKey="id"
            getOptionLabel={(skill) => skill.name}
            onValueChange={setSelectedSkillIds}
            onLoadMore={fetchNextSkills}
            hasNextPage={hasNextSkillsPage}
            isFetchingNextPage={isFetchingNextSkillsPage}
            onSearchChange={setSearchTermSkills}
            isLoading={isFetchingSkills}
          />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Selected skills ({selectedSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {selectedSkills.length === 0 ? (
                <p className="text-muted-foreground">
                  No skills selected. Use the multi-select above to choose one
                  or more skills.
                </p>
              ) : (
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  {selectedSkills.map((skill) => (
                    <li key={skill.id}>
                      <span className="font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs">
                        {" "}
                        ({skill.category}, {skill.level})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default ReactGenericDemo;
