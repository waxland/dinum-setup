Yes. I found a fairly solid official DINUM / La Suite corpus. The main caveat is that there is **no single official “React style guide”** equivalent to the Python page. For React, the right approach is to combine DINUM/beta.gouv software-quality standards, DesignGouv/RGAA accessibility rules, and the conventions actually enforced in current La Suite React repositories. For Python, La Suite does have a dedicated guide. 

The sources I would treat as authoritative or near-authoritative are:

- [La Suite numérique — Developer Handbook](https://suitenumerique.gitbook.io/handbook?utm_source=chatgpt.com)
- [La Suite — Python best practices](https://github.com/suitenumerique/dev-handbook/blob/main/python.md?utm_source=chatgpt.com)
- [La Suite — Code reviews](https://github.com/suitenumerique/dev-handbook/blob/main/code-reviews.md?utm_source=chatgpt.com)
- [La Suite — Accessibility development rules](https://github.com/suitenumerique/dev-handbook/blob/main/accessibility.md?utm_source=chatgpt.com)
- [La Suite — Security rules](https://github.com/suitenumerique/dev-handbook/blob/main/security.md?utm_source=chatgpt.com)
- [beta.gouv — Official quality standards](https://standards.beta.gouv.fr/standards?utm_source=chatgpt.com)
- [beta.gouv — Uniform source code / linting standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-source-est-uniforme.md?utm_source=chatgpt.com)
- [beta.gouv — Unit and E2E testing standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/le-code-est-instrumente-par-des-tests-unitaires-et-des-tests-e2e.md?utm_source=chatgpt.com)
- [beta.gouv — Technical documentation standard](https://github.com/betagouv/standards/blob/main/qualit%C3%A9-logicielle/les-aspects-techniques-du-produit-sont-documentes.md?utm_source=chatgpt.com)
- [DesignGouv — Developer accessibility memo](https://design.numerique.gouv.fr/outils/memo-dev/?utm_source=chatgpt.com)
- [DesignGouv — Developer accessibility checklist](https://design.numerique.gouv.fr/fr/outils/checklist-dev/?utm_source=chatgpt.com)
- [DesignGouv — Developer role and responsibilities](https://design.numerique.gouv.fr/accessibilite-numerique/roles-cles/developer/?utm_source=chatgpt.com)
- [Current La Suite Docs Python configuration](https://github.com/suitenumerique/docs/blob/main/src/backend/pyproject.toml?utm_source=chatgpt.com)
- [Current La Suite Docs React/TypeScript tooling](https://github.com/suitenumerique/docs/blob/main/src/frontend/apps/impress/package.json?utm_source=chatgpt.com)
- [La Suite UI Kit](https://github.com/suitenumerique/ui-kit/blob/main/README.md?utm_source=chatgpt.com)

The important principles that come out of these sources are: linting must exist and be enforced in CI; unit and E2E tests should exist and gate integration/deployment; technical documentation should remain sufficient to understand and run the project; React interfaces must be accessible/RGAA-conscious; and current La Suite frontend projects enforce TypeScript, ESLint, Prettier, Stylelint and Vitest-style checks. 

For Python, note the small historical mismatch I mentioned: the handbook says PEP 8 with 99-character lines, whereas current La Suite repositories often configure Ruff with 88. Therefore **the project configuration must always win**. 

### Prompt 1 — create the two DINUM skills

I would give your coding agent this exact prompt:

```md
# Task — Add DINUM / La Suite code-quality skills

I want this repository's coding agent to systematically apply the software engineering practices used by DINUM, beta.gouv.fr and La Suite numérique.

Create two Agent Skills:

- `.agents/skills/dinum-react/SKILL.md`
- `.agents/skills/dinum-python/SKILL.md`

If this repository already uses another canonical Agent Skills directory, respect the existing structure instead of creating a parallel one.

The skills must be concise enough to be read on every relevant task, but precise enough to guide implementation and code review.

Do NOT blindly impose a new toolchain on an existing repository.

The precedence order must always be:

1. explicit user instruction
2. repository AGENT.md / AGENTS.md instructions
3. existing repository configuration and CI
4. existing architectural/project conventions
5. DINUM / beta.gouv / La Suite recommendations
6. generic language/framework best practices

This distinction is important because, for example, the historic La Suite Python handbook recommends PEP 8 with a 99-character line length, whereas some current La Suite repositories use Ruff with an 88-character line length.

Local project configuration must therefore win.

---

# Skill 1 — `dinum-react`

Create:

`.agents/skills/dinum-react/SKILL.md`

Use frontmatter similar to:

---
name: dinum-react
description: Apply DINUM, beta.gouv.fr, La Suite numérique and DesignGouv engineering standards when creating, modifying or reviewing React, TypeScript, JavaScript, HTML or CSS code.
---

The skill must activate whenever work touches:

- `.tsx`
- `.ts`
- `.jsx`
- `.js`
- frontend CSS
- React components
- Next.js applications
- client-side navigation
- forms
- design-system components
- frontend tests

## Required behaviour

### 1. Inspect before modifying

Before writing code:

- inspect `package.json`
- inspect TypeScript configuration
- inspect ESLint/Biome configuration
- inspect Prettier configuration
- inspect Stylelint configuration if present
- inspect test configuration
- inspect nearby components
- inspect the project's design system and existing UI primitives

Never introduce a new library when an existing project dependency already solves the problem adequately.

Never replace repository conventions simply because another DINUM project uses a different convention.

### 2. Uniform source code

DINUM/beta.gouv expects source code to be uniform and automatically checked.

Therefore:

- follow the repository formatter
- follow the repository linter
- follow TypeScript compiler rules
- never disable lint rules without a justified reason
- never add broad `eslint-disable`
- prefer a local and documented exception if an exception is unavoidable
- do not leave commented-out code
- do not leave debug `console.log`
- remove dead imports and dead code
- preserve import conventions already used by the project

Before completion, run the repository's relevant formatting, lint and type-check commands.

Examples used in current La Suite projects include:

- TypeScript compiler checks
- ESLint
- Prettier
- Stylelint

Do not assume these commands exist: discover them from `package.json`.

### 3. TypeScript

When TypeScript is available:

- prefer TypeScript over untyped JavaScript
- avoid `any`
- prefer precise domain types
- model nullable and optional states explicitly
- type component props
- type API boundaries
- validate external/untrusted data when the project has a validation layer
- do not use unsafe type assertions merely to silence the compiler
- avoid duplicated types when a canonical type already exists

A type assertion must express knowledge that TypeScript cannot derive, not hide a design problem.

### 4. React component design

Prefer:

- small cohesive components
- explicit props
- composition
- clear ownership of state
- derived state instead of synchronized duplicate state
- pure rendering logic where possible
- reusable domain logic outside JSX when appropriate

Avoid:

- giant components handling unrelated responsibilities
- unnecessary effects
- effects used to calculate values that can be calculated during rendering
- duplicated state
- premature abstractions
- premature memoization
- unnecessary global state
- deeply nested conditional JSX when extracting a meaningful component improves readability

Respect the architecture already used by the repository.

### 5. Side effects and asynchronous work

For asynchronous data:

- respect the project's existing query/fetching abstraction
- handle loading states
- handle empty states
- handle errors
- handle authorization failures where relevant
- prevent stale or race-prone state when appropriate

Do not introduce direct ad-hoc `fetch` calls if the project already exposes an API client or query abstraction.

### 6. Accessibility — mandatory

Accessibility is part of implementation, not an optional post-processing task.

Apply DesignGouv, RGAA and La Suite accessibility principles.

Check at minimum:

- meaningful and unique page title where relevant
- correct document language
- semantic HTML
- correct heading hierarchy
- logical DOM order
- full keyboard operation
- visible focus
- no keyboard traps
- correct `button` versus `a` semantics
- form inputs connected to labels
- errors connected to their corresponding fields
- meaningful accessible names for interactive controls
- meaningful link text
- informative images have useful alternatives
- decorative images use empty alternatives
- decorative SVGs are hidden from assistive technologies where appropriate
- information is not communicated by color alone
- dialogs correctly manage focus
- client-side navigation does not leave keyboard/screen-reader focus in an incoherent location

Prefer native HTML semantics before ARIA.

Do not add ARIA when native HTML provides the required semantics.

When modifying an existing interaction, verify keyboard behaviour as part of the task.

### 7. State and user interface

Every user-facing asynchronous feature should deliberately consider:

- initial state
- loading state
- success state
- empty state
- recoverable error state
- disabled state
- permission/authorization state where applicable

Do not show an interactive control if it cannot meaningfully be used unless the UX deliberately explains why it is disabled.

### 8. Tests

beta.gouv standards expect automated testing, including unit-level and E2E/integration-level protection.

For every meaningful behaviour change:

- identify existing tests
- update existing tests when behaviour changes
- add regression tests for bugs
- test user-visible behaviour rather than implementation details
- use the test libraries already configured by the repository

Current La Suite React repositories commonly use tooling such as:

- Vitest
- Testing Library
- Playwright in some projects

These are examples, not mandatory dependencies.

Never install them if the repository already uses another supported test stack.

Critical user flows should have integration/E2E protection when the repository has an E2E framework.

### 9. Security and privacy

Never:

- hard-code secrets
- expose server-only secrets to browser bundles
- trust client-side authorization
- log sensitive data
- store unnecessary personal data client-side
- inject unsanitized HTML
- use `dangerouslySetInnerHTML` without proving that the content is trusted/sanitized

Environment-specific secrets must stay outside version control.

### 10. Design systems

If the project uses:

- DSFR
- `@codegouvfr/react-dsfr`
- La Suite UI components
- Cunningham
- another established internal design system

reuse its components and tokens before implementing custom equivalents.

Do not reproduce a button, input, modal, alert, badge, spacing scale or color token by hand when an approved component/token already exists.

### 11. Documentation

When a change introduces:

- a new architectural concept
- a new required environment variable
- a new setup step
- a new API contract
- a non-obvious technical constraint

update the relevant documentation.

### 12. Final verification

Before declaring a React/frontend task complete:

1. review the diff
2. remove debugging code
3. verify semantics and keyboard accessibility
4. run formatter/check mode
5. run lint
6. run type-check
7. run relevant unit/integration tests
8. run relevant E2E tests when available and relevant
9. run the build when reasonably necessary
10. report any command that could not be run

Never claim checks passed unless they were actually executed.

---

# Skill 2 — `dinum-python`

Create:

`.agents/skills/dinum-python/SKILL.md`

Use frontmatter similar to:

---
name: dinum-python
description: Apply DINUM, beta.gouv.fr and La Suite numérique Python engineering standards when creating, modifying or reviewing Python code.
---

Activate it whenever work touches:

- `.py`
- Django
- Django REST Framework
- FastAPI or other Python APIs
- Python workers
- Python CLI tools
- Python tests
- `pyproject.toml`
- Python dependency configuration

## Required behaviour

### 1. Inspect repository rules first

Before modifying Python:

inspect, where present:

- `pyproject.toml`
- `ruff.toml`
- `.flake8`
- `setup.cfg`
- `tox.ini`
- pytest configuration
- mypy/pyright configuration
- pylint configuration
- Makefile/task runner
- CI workflows
- nearby Python modules

Existing repository configuration always wins.

Do not change project-wide formatting rules as part of an unrelated task.

### 2. Style and automated linting

The historical La Suite Python handbook specifies:

- PEP 8
- a 99-character line length instead of PEP 8's older 79-character default
- structured imports
- documented modules/classes/functions/methods

However, current La Suite projects may use Ruff with another configured line length, including 88 characters.

Therefore:

- obey the project's formatter/linter configuration
- only use 99 as a fallback if the project has no configured line-length convention and following the La Suite handbook is appropriate
- do not manually fight the formatter
- do not disable lint checks globally
- keep exceptions narrow and justified

Current La Suite projects commonly use Ruff and/or Pylint.

Use what the repository already uses.

### 3. Imports

Follow repository configuration first.

In the absence of more specific configuration, maintain logical groups:

1. future imports
2. Python standard library
3. framework imports such as Django
4. third-party packages
5. application/first-party modules
6. local/relative imports

Separate groups clearly.

Keep imports sorted automatically when the project provides Ruff/isort.

Avoid wildcard imports.

Avoid importing modules only for side effects unless explicitly required and documented.

### 4. Documentation and intent

Public/non-obvious modules, classes and functions should explain their purpose.

Follow existing repository docstring conventions.

Docstrings should explain intent and behaviour, not merely paraphrase the function name.

For complex code explain:

- why the behaviour exists
- important invariants
- non-obvious edge cases

Do not add verbose comments explaining trivial Python syntax.

### 5. Functions and architecture

Prefer:

- small cohesive functions
- explicit inputs and outputs
- early returns when they simplify control flow
- clear domain boundaries
- dependency injection where it improves testability
- pure functions for domain calculations where practical

Avoid:

- large multipurpose functions
- hidden global mutable state
- boolean-parameter explosions
- duplicated business logic
- excessive abstraction
- catching exceptions only to ignore them
- broad `except Exception` unless at a deliberate application boundary

### 6. Typing

If the project uses type hints:

- keep new code typed
- type public interfaces
- model `None` explicitly
- prefer domain-specific types when they add clarity
- avoid unnecessary `Any`
- do not add casts solely to hide a type error

Do not introduce a new type checker to a repository as part of an unrelated feature.

### 7. Errors

Errors should be:

- explicit
- actionable
- correctly scoped

Never silently swallow an unexpected exception.

Do not expose internal exception details or sensitive information to end users.

At HTTP/API boundaries:

- use appropriate status codes
- provide stable machine-readable error formats where the project defines them
- avoid leaking implementation details

### 8. Django / database practices

When Django is used:

- follow the project's service/model/view architecture
- avoid unnecessary database queries
- inspect for N+1 queries
- use transactions for operations that must be atomic
- do not perform expensive work accidentally inside loops over querysets
- preserve migration compatibility
- do not rewrite existing migrations without a deliberate reason
- validate authorization server-side

Database changes should consider:

- migration safety
- nullability
- defaults
- indexes
- uniqueness
- backward compatibility
- data migration requirements

### 9. Security

Follow the La Suite security principles.

Never:

- version secrets
- hard-code passwords or tokens
- log secrets
- interpolate untrusted values into SQL
- disable TLS verification without a justified development-only reason
- trust user-supplied paths
- deserialize untrusted data with unsafe mechanisms
- weaken authentication/authorization to make tests pass

Use separate environment configuration for local, staging and production.

### 10. Tests

beta.gouv standards require automated tests to protect software evolution.

For every behaviour change:

- update existing tests
- add regression tests for bugs
- test critical business rules
- cover failure paths
- cover authorization when relevant
- keep tests deterministic
- avoid unnecessary network dependency in unit tests

If Django conventions are used, test filenames should clearly indicate the module/behaviour under test.

Follow the repository's established pytest/Django test conventions.

Current La Suite Python repositories commonly use pytest, pytest-django and coverage tooling.

These are examples, not dependencies to add automatically.

### 11. APIs

When modifying an API:

- preserve documented contracts unless the change intentionally introduces a breaking change
- validate inputs
- maintain authorization checks
- use consistent error schemas
- update OpenAPI/Swagger documentation when applicable
- update tests

beta.gouv recommends APIs be documented with OpenAPI/Swagger.

### 12. Performance

Before adding caching or complex optimization:

- identify the actual bottleneck
- keep implementation simple

Watch particularly for:

- repeated DB queries
- N+1 access
- large in-memory materialization
- repeated serialization
- blocking I/O in async contexts

### 13. Documentation

Update technical documentation when a change introduces:

- new dependencies
- new environment variables
- new background workers
- new services
- new local setup requirements
- architecture changes
- API changes

A project should remain understandable and runnable even if its current developers are absent.

### 14. Final verification

Before declaring a Python task complete:

1. review the diff
2. remove debugging statements
3. run the configured formatter/check
4. run configured linter
5. run configured type checker when applicable
6. run relevant tests
7. run broader tests when the risk warrants it
8. verify migrations where applicable
9. report commands that could not be run

Never claim a command succeeded if it was not executed.

---

# Cross-cutting DINUM principle

Both skills must explicitly state:

> Do not optimize for satisfying a checklist while degrading the product.
> DINUM/La Suite rules are intended to produce understandable, accessible,
> secure and maintainable software. Repository context and user needs matter.

Both skills should also include a short `## Sources` section identifying the canonical sources used:

- La Suite numérique Developer Handbook
- La Suite Python guide
- La Suite accessibility guide
- La Suite security guide
- La Suite code review guide
- beta.gouv.fr quality standards
- beta.gouv uniform-code standard
- beta.gouv automated-tests standard
- beta.gouv technical-documentation standard
- DINUM DesignGouv developer memo
- DINUM DesignGouv developer checklist
- current La Suite repository configuration as evidence of current operational practices

Where possible, put the canonical official URLs in the generated files.

Do not describe current repository-specific choices as universal DINUM requirements.

For example, Vitest, Ruff, ESLint, Prettier, React Query, Playwright, Pylint, etc. may be current implementation choices or recommended tooling, but not every one of them is a mandatory DINUM-wide standard.

At the end, show me:

- the paths created
- the complete content of both `SKILL.md` files
- a short explanation of how each skill is triggered
```

That prompt deliberately separates **official normative rules** from **practices observed in current La Suite repositories**, which I think is critical if you want your agent to remain useful rather than just mechanically reproducing one repo.

### Prompt 2 — modify `AGENT.md` / `AGENTS.md`

Then I would run this second prompt:

```md
# Task — Make DINUM code-quality skills mandatory through AGENT.md / AGENTS.md

Update the repository's agent instructions so that the DINUM code-quality skills are systematically consulted before coding or reviewing relevant code.

First determine whether the repository uses:

- `AGENT.md`
- `AGENTS.md`
- nested/scoped `AGENTS.md` files

Respect the existing convention.

Do NOT create both `AGENT.md` and `AGENTS.md`.

Do not delete or rewrite unrelated existing instructions.

Add a concise but mandatory section equivalent to the following:

## DINUM / La Suite engineering standards

Before creating, modifying, refactoring or reviewing application code, determine which DINUM engineering skill applies.

### React / frontend

For any work involving React, TypeScript, JavaScript, JSX/TSX, HTML, CSS, frontend components, Next.js, forms or browser-side behaviour:

1. Read `.agents/skills/dinum-react/SKILL.md` before implementation.
2. Apply its rules throughout implementation and review.
3. Re-read its final verification section before declaring the task complete.
4. Follow repository-local configuration whenever it conflicts with a generic recommendation in the skill.

### Python / backend

For any work involving Python, Django, Django REST Framework, Python APIs, workers, scripts, Python tests or Python dependency/configuration files:

1. Read `.agents/skills/dinum-python/SKILL.md` before implementation.
2. Apply its rules throughout implementation and review.
3. Re-read its final verification section before declaring the task complete.
4. Follow repository-local configuration whenever it conflicts with a generic recommendation in the skill.

### Full-stack changes

If a task touches both Python and frontend code, read and apply both skills.

### Mandatory quality gate

Before considering implementation complete, the agent must:

1. inspect the resulting diff;
2. verify that relevant DINUM skill requirements were respected;
3. run the repository's relevant formatter/linter/type-check/test commands;
4. verify accessibility for user-facing frontend changes;
5. verify tests for changed behaviour;
6. report any checks that were not executed or could not be executed.

The agent must never state that a quality check passed unless that check was actually run.

### Precedence

When recommendations conflict, apply this precedence:

1. explicit user instruction;
2. scoped AGENT.md / AGENTS.md instructions;
3. repository configuration and CI;
4. existing project architecture and conventions;
5. DINUM / beta.gouv / La Suite skill recommendations;
6. generic framework/language conventions.

The DINUM skills must not be ignored merely because the task is small.

For trivial changes, the depth of verification may be proportional to the change, but the applicable skill must still be consulted.

---

Also add a rule to the normal workflow:

Before editing source code:
- identify the affected languages/frameworks;
- load the applicable project skills;
- inspect the repository's existing lint/test/build configuration.

Before finishing:
- perform the applicable skill's final verification checklist.

If there are already general instructions for tests, linting, accessibility or code review, merge this behaviour into them rather than creating contradictory duplicate rules.

Do not weaken any existing repository-specific standards.

When finished, display the complete modified AGENT.md / AGENTS.md file and summarize exactly what was added.
```

With that setup, the agent doesn't need to carry a giant coding charter permanently in `AGENTS.md`: the main file acts as the **router/enforcement layer**, while the detailed standards live in the two `SKILL.md` files. That is much cleaner and makes the React/Python rules reusable across repositories.