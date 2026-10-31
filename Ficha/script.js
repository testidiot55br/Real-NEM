const STORAGE_KEY = "ficha-rpg.personagens.v1";
const MASTER_SHARE_STORAGE_KEY = "ficha-rpg.master-shares.v1";
const MASTER_NPC_STORAGE_KEY = "ficha-rpg.master-npcs.v1";
const CAMPAIGN_DIARY_STORAGE_KEY = "ficha-rpg.campaign-diary.v1";
const MASTER_INVENTORY_STORAGE_KEY = "ficha-rpg.master-inventory.v1";
const MASTER_UNLOCK_SESSION_KEY = "ficha-rpg.master-unlocked.v1";
const ROLL_DICE_COUNT_KEY = "ficha-rpg.roll-dice-count.v1";
const ROLL_DIE_TYPE_KEY = "ficha-rpg.roll-die-type.v1";
const SAFETY_BACKUP_STORAGE_KEY = "ficha-rpg.backup-snapshots.v1";
const MASTER_SECRET_NOTES_STORAGE_KEY = "ficha-rpg.master-secret-notes.v1";
const MASTER_MENU_EVENT_SETTINGS_KEY = "ficha-rpg.master-menu-event-settings.v1";
const FIREBASE_RUNTIME_CONFIG_KEY = "ficha-rpg.firebase-runtime-config.v1";
const LAYOUT_MODE_KEY = "ficha-rpg.layout-mode.v1";
const MASTER_PASSWORD = "9955";
const MASTER_UNLOCK_MAX_ATTEMPTS = 5;
const MASTER_UNLOCK_LOCKOUT_MS = 30000;
const MASTER_SYNC_CHANNEL_NAME = "ficha-rpg.master-sync.v1";

const SKILL_RANKS = ["Destreinado", "Treinado", "Veterano", "Expert"];
const SKILL_RANK_LABELS = {
  Destreinado: "Destreinado (+0)",
  Treinado: "Treinado (+5)",
  Veterano: "Veterano (+10)",
  Expert: "Expert (+15)",
};

const defaultAvatar = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#eadbbf"/>
        <stop offset="100%" stop-color="#d4b88d"/>
      </linearGradient>
    </defs>
    <rect width="120" height="120" fill="url(#g)"/>
    <circle cx="60" cy="44" r="22" fill="#8d6d47"/>
    <path d="M20 112c5-22 18-34 40-34s35 12 40 34" fill="#8d6d47"/>
  </svg>`
)}`;

const defaultItemIcon = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
    <rect width="80" height="80" fill="#1b2432"/>
    <rect x="13" y="13" width="54" height="54" rx="8" fill="#273347" stroke="#7f95b6" stroke-width="3"/>
    <path d="M24 49l10-11 8 9 10-13 8 15" fill="none" stroke="#9dc0ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
)}`;
const IMAGE_FIT_VALUES = new Set(["cover", "contain"]);
const PROFILE_FRAME_SHAPES = new Set(["square", "round", "hexagon"]);

const MAX_INVENTORY_SLOTS = 19;
const MASTER_NPC_INVENTORY_SLOTS = 8;
const CONDITION_PRESETS = [
  "Sangrando",
  "Atordoado",
  "Caído",
  "Agarrado",
  "Envenenado",
  "Morrendo",
];
const CONDITION_SHORT_LABELS = {
  Sangrando: "SG",
  Atordoado: "AT",
  "Caído": "CD",
  Agarrado: "AG",
  Envenenado: "EV",
  Morrendo: "MR",
  Morto: "MT",
};
const INVENTORY_ITEM_TYPES = ["Outro", "Arma", "Armadura", "Munição", "Ferramenta", "Consumível", "Evidência", "Amaldiçoado"];
const INVENTORY_ITEM_STATUSES = ["Guardado", "Equipado", "Perdido", "Gasto"];
const INVENTORY_ITEM_RARITIES = ["Comum", "Raro", "Proibido", "Paranormal"];
const MASTER_NPC_RISK_LABELS = {
  minimo: "Mínimo",
  baixo: "Baixo",
  moderado: "Moderado",
  alto: "Alto",
  extremo: "Extremo",
};
const MASTER_NPC_IMPORTANCE_LABELS = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
  critica: "Crítica",
};
const MASTER_NPC_RACE_LABELS = {
  humano: "Humano",
  criatura: "Criatura",
  animal: "Animal",
};
const MAX_CHANGE_HISTORY_ENTRIES = 30;
const DEFAULT_MENU_EVENT_SETTINGS = {
  enabled: true,
  forceActive: false,
  customFrames: [],
  updatedAt: "",
};

const trailsByClass = {
  Combatente: [
    {
      name: "Devastador",
      description:
        "Dano alto e combos agressivos. Especialista em finalizar rápido, mas consome muito PE e se desgasta facilmente.",
    },
    {
      name: "Ceifador",
      description:
        "Ataques múltiplos e pressão constante. Mantém ofensiva intensa, mas cada ação extra cobra um preço alto.",
    },
    {
      name: "Colosso",
      description:
        "Tanque do grupo. Muita resistência, bloqueios e controle de espaço. Excelente contra grupos, mas vulnerável a inimigos muito poderosos.",
    },
  ],
  Especialista: [
    {
      name: "Médico de Campo",
      description:
        "Suporte e sobrevivência do grupo. Cura, estabiliza e mantém aliados vivos sob pressão.",
    },
    {
      name: "Técnico",
      description:
        "Especialista em itens, equipamentos e consertos. Resolve problemas mecânicos e tecnológicos no improviso.",
    },
    {
      name: "Atirador de Elite",
      description:
        "Dano massivo a longa distância com armas de fogo longas. Preciso, letal e dependente de bom posicionamento.",
    },
  ],
};

const attributes = [
  { id: "forca", label: "Força" },
  { id: "agilidade", label: "Agilidade" },
  { id: "intelecto", label: "Intelecto" },
  { id: "presenca", label: "Presença" },
  { id: "vigor", label: "Vigor" },
];

const skillsCatalog = [
  {
    name: "Acrobacias",
    attribute: "Agilidade",
    description:
      "Equilíbrio, saltos, piruetas, queda controlada, movimentação em lugares difíceis e escapar de agarrões.",
  },
  {
    name: "Adestramento",
    attribute: "Presença",
    description:
      "Treinar, acalmar e comandar animais, além de interpretar comportamento animal.",
  },
  {
    name: "Artes",
    attribute: "Presença",
    description:
      "Expressão artística: desenho, música, atuação, escrita, dança, escultura e uso social dessas habilidades.",
  },
  {
    name: "Atletismo",
    attribute: "Força",
    description:
      "Força e preparo físico bruto: correr, nadar, escalar, levantar peso e arrombar com força.",
  },
  {
    name: "Atualidades",
    attribute: "Intelecto",
    description:
      "Notícias, cultura pop, política, eventos recentes e assuntos do momento.",
  },
  {
    name: "Ciências",
    attribute: "Intelecto",
    description:
      "Conhecimento científico geral para analisar substâncias, fenômenos e padrões.",
  },
  {
    name: "Crime",
    attribute: "Agilidade",
    description:
      "Arrombar fechaduras, desarmar alarmes simples, abrir cofres, falsificar e burlar sistemas básicos.",
  },
  {
    name: "Diplomacia",
    attribute: "Presença",
    description:
      "Convencer com tato, negociar, acalmar conflitos e resolver situações no diálogo.",
  },
  {
    name: "Enganação",
    attribute: "Presença",
    description:
      "Mentir, blefar, manipular, fingir emoções e assumir identidades.",
  },
  {
    name: "Fortitude",
    attribute: "Vigor",
    description:
      "Resistência física contra veneno, dor, cansaço extremo, sangramento e ambientes hostis.",
  },
  {
    name: "Furtividade",
    attribute: "Agilidade",
    description: "Se esconder, se mover sem ruído, infiltração e passar despercebido.",
  },

  {
    name: "Intimidação",
    attribute: "Presença",
    description:
      "Impor medo e pressão psicológica com postura agressiva ou presença dominante.",
  },
  {
    name: "Intuição",
    attribute: "Presença",
    description:
      "Perceber mentiras, segundas intenções, emoções e o clima social.",
  },
  {
    name: "Investigação",
    attribute: "Intelecto",
    description:
      "Buscar pistas, analisar cenas, ligar informações e encontrar detalhes escondidos.",
  },
  {
    name: "Luta",
    attribute: "Força",
    description:
      "Combate corpo a corpo: socos, chutes, facas, bastões, agarrões e briga geral.",
  },
  {
    name: "Medicina",
    attribute: "Intelecto",
    description:
      "Primeiros socorros, estabilização de feridos, tratamento de lesões e procedimentos médicos.",
  },
  {
    name: "Percepção",
    attribute: "Presença",
    description:
      "Notar detalhes com os sentidos, armadilhas, movimento suspeito e presenças ocultas.",
  },
  {
    name: "Pilotagem",
    attribute: "Agilidade",
    description:
      "Condução e controle de veículos como carro, moto, barco e outros do contexto.",
  },
  {
    name: "Pontaria",
    attribute: "Agilidade",
    description:
      "Ataques à distância com armas de fogo, arco, besta e arremessos.",
  },
  {
    name: "Profissão",
    attribute: "Intelecto",
    description:
      "Conhecimento prático da área de trabalho escolhida pelo personagem.",
  },
  {
    name: "Reflexos",
    attribute: "Agilidade",
    description:
      "Desviar de ataques, explosões e armadilhas com reação física rápida.",
  },
  {
    name: "Religião",
    attribute: "Intelecto",
    description:
      "Conhecimento de crenças, rituais, símbolos, seitas e mitologias.",
  },
  {
    name: "Sobrevivência",
    attribute: "Intelecto",
    description:
      "Se virar na natureza: rastrear, achar recursos, montar abrigo e resistir ao ambiente.",
  },
  {
    name: "Tática",
    attribute: "Intelecto",
    description:
      "Estratégia de combate, coordenação de equipe e avaliação de risco.",
  },
  {
    name: "Tecnologias",
    attribute: "Intelecto",
    description:
      "Computadores, redes, câmeras, eletrônicos e manipulação de sistemas.",
  },
  {
    name: "Vontade",
    attribute: "Presença",
    description:
      "Força mental para resistir a medo, influência paranormal e manipulação psicológica.",
  },
];

const ATTRIBUTE_META = {
  forca: { short: "FOR", position: 2 },
  agilidade: { short: "AGI", position: 1 },
  intelecto: { short: "INT", position: 3 },
  presenca: { short: "PRE", position: 4 },
  vigor: { short: "VIG", position: 5 },
};

const SKILL_RANK_SHORT_LABELS = {
  Destreinado: "Destreinado",
  Treinado: "Treinado",
  Veterano: "Veterano",
  Expert: "Expert",
};

const SKILL_RANK_BONUS = {
  Destreinado: 0,
  Treinado: 5,
  Veterano: 10,
  Expert: 15,
};
const SKILL_NAME_SET = new Set(skillsCatalog.map((skill) => skill.name));


const elements = {
  form: document.getElementById("character-form"),
  characterId: document.getElementById("character-id"),
  name: document.getElementById("name"),
  birthdate: document.getElementById("birthdate"),
  agePreview: document.getElementById("age-preview"),
  origin: document.getElementById("origin"),
  characterHeight: document.getElementById("character-height"),
  characterWeight: document.getElementById("character-weight"),
  classSelect: document.getElementById("class"),
  trail: document.getElementById("trail"),
  trailDescription: document.getElementById("trail-description"),
  profileRecordLine: document.getElementById("profile-record-line"),
  profileNameDisplay: document.getElementById("profile-name-display"),
  profileRoleDisplay: document.getElementById("profile-role-display"),
  profileOmenLine: document.getElementById("profile-omen-line"),
  appearance: document.getElementById("appearance"),
  personality: document.getElementById("personality"),
  internalConflict: document.getElementById("internal-conflict"),
  motivation: document.getElementById("motivation"),
  nex: document.getElementById("nex"),
  wounds: document.getElementById("wounds"),
  defense: document.getElementById("defense"),
  movement: document.getElementById("movement"),
  nexMax: document.getElementById("nex-max"),
  nexLost: document.getElementById("nex-lost"),
  pdMax: document.getElementById("pd-max"),
  pdLost: document.getElementById("pd-lost"),
  sanMax: document.getElementById("san-max"),
  sanLost: document.getElementById("san-lost"),
  peMax: document.getElementById("pe-max"),
  peLost: document.getElementById("pe-lost"),
  pdBarFill: document.getElementById("pd-bar-fill"),
  pdBarLabel: document.getElementById("pd-bar-label"),
  sanBarFill: document.getElementById("san-bar-fill"),
  sanBarLabel: document.getElementById("san-bar-label"),
  peBarFill: document.getElementById("pe-bar-fill"),
  peBarLabel: document.getElementById("pe-bar-label"),
  nexBarFill: document.getElementById("nex-bar-fill"),
  nexBarLabel: document.getElementById("nex-bar-label"),
  trackAdjusters: Array.from(document.querySelectorAll(".track-adjust")),
  attacks: document.getElementById("attacks"),
  items: document.getElementById("items"),
  battleNotes: document.getElementById("battle-notes"),
  attributesGrid: document.getElementById("attributes-grid"),
  skillsGrid: document.getElementById("skills-grid"),
  skillsCount: document.getElementById("skills-count"),
  skillsHint: document.getElementById("skills-hint"),
  skillSearch: document.getElementById("skill-search"),
  inventoryHint: document.getElementById("inventory-hint"),
  inventoryMetrics: document.getElementById("inventory-metrics"),
  inventoryCategoryStrip: document.getElementById("inventory-category-strip"),
  inventoryToggle: document.getElementById("inventory-toggle"),
  inventoryPanel: document.getElementById("inventory-panel"),
  inventoryGrid: document.getElementById("inventory-grid"),
  sheetStatusBadge: document.getElementById("sheet-status-badge"),
  sheetStatusList: document.getElementById("sheet-status-list"),
  sessionSummaryContent: document.getElementById("session-summary-content"),
  changeHistoryList: document.getElementById("change-history-list"),
  clearChangeHistory: document.getElementById("clear-change-history"),
  combatQuickActions: document.getElementById("combat-quick-actions"),
  combatCurrentTurn: document.getElementById("combat-current-turn"),
  combatRoundDisplay: document.getElementById("combat-round-display"),
  combatDefenseDisplay: document.getElementById("combat-defense-display"),
  combatMovementDisplay: document.getElementById("combat-movement-display"),
  combatWoundsDisplay: document.getElementById("combat-wounds-display"),
  combatPressureDisplay: document.getElementById("combat-pressure-display"),
  combatActionState: document.getElementById("combat-action-state"),
  combatActionHint: document.getElementById("combat-action-hint"),
  combatHudChips: document.getElementById("combat-hud-chips"),
  rollResult: document.getElementById("roll-result"),
  rollDiceCount: document.getElementById("roll-dice-count"),
  rollDiceDecrease: document.getElementById("roll-dice-decrease"),
  rollDiceIncrease: document.getElementById("roll-dice-increase"),
  rollDiceDisplay: document.getElementById("roll-dice-display"),
  rollDieType: document.getElementById("roll-die-type"),
  rollDieTrigger: document.getElementById("roll-die-trigger"),
  profileImageData: document.getElementById("profile-image-data"),
  profileImageFile: document.getElementById("profile-image-file"),
  profileImageFit: document.getElementById("profile-image-fit"),
  profileImagePositionX: document.getElementById("profile-image-position-x"),
  profileImagePositionY: document.getElementById("profile-image-position-y"),
  profileImageZoom: document.getElementById("profile-image-zoom"),
  profileFrameShape: document.getElementById("profile-frame-shape"),
  profileImageOpen: document.getElementById("profile-image-open"),
  profileImageModal: document.getElementById("profile-image-modal"),
  profileImageClose: document.getElementById("profile-image-close"),
  profileImageViewer: document.getElementById("profile-image-viewer"),
  profileImageFullPreview: document.getElementById("profile-image-full-preview"),
  profileImageEditToggle: document.getElementById("profile-image-edit-toggle"),
  profileImageTools: document.getElementById("profile-image-tools"),
  profileImagePositionXControl: document.getElementById("profile-image-position-x-control"),
  profileImagePositionYControl: document.getElementById("profile-image-position-y-control"),
  profileImageZoomControl: document.getElementById("profile-image-zoom-control"),
  profileFrameShapeButtons: Array.from(document.querySelectorAll("[data-profile-frame-shape]")),
  profileImageReplace: document.getElementById("profile-image-replace"),
  profileImageReset: document.getElementById("profile-image-reset"),
  profilePreview: document.getElementById("profile-preview-img"),
  avatarCircle: document.querySelector(".avatar-circle"),
  heroNexDisplay: document.getElementById("hero-nex-display"),
  profileStatusIcons: document.getElementById("profile-status-icons"),
  profileStaticSummary: document.getElementById("profile-static-summary"),
  topModeIndicator: document.getElementById("top-mode-indicator"),
  inActionToggle: document.getElementById("in-action-toggle"),
  readModeToggle: document.getElementById("read-mode-toggle"),
  combatModeToggle: document.getElementById("combat-mode-toggle"),
  sheetEditToggle: document.getElementById("sheet-edit-toggle"),
  uiToastStack: document.getElementById("ui-toast-stack"),
  exportCharacter: document.getElementById("export-character"),
  importCharacter: document.getElementById("import-character"),
  exportCharacterInline: document.getElementById("export-character-inline"),
  importCharacterInline: document.getElementById("import-character-inline"),
  importCharacterFile: document.getElementById("import-character-file"),
  saveButton: document.getElementById("save-character"),
  shareMasterCurrent: document.getElementById("share-master-current"),
  generateDerivedValues: document.getElementById("generate-derived-values"),
  derivedSummary: document.getElementById("derived-summary"),
  addAbilityButton: document.getElementById("add-ability"),
  abilitiesList: document.getElementById("abilities-list"),
  addAttackButton: document.getElementById("add-attack"),
  attacksList: document.getElementById("attacks-list"),
  initiativeAddSelf: document.getElementById("initiative-add-self"),
  initiativeAdd: document.getElementById("initiative-add"),
  initiativeSort: document.getElementById("initiative-sort"),
  initiativeNext: document.getElementById("initiative-next"),
  initiativeRound: document.getElementById("initiative-round"),
  initiativeList: document.getElementById("initiative-list"),
  encounterTitle: document.getElementById("encounter-title"),
  encounterNotes: document.getElementById("encounter-notes"),
  encounterSummary: document.getElementById("encounter-summary"),
  conditionsList: document.getElementById("conditions-list"),
  rollHistoryList: document.getElementById("roll-history-list"),
  clearRollHistory: document.getElementById("clear-roll-history"),
  modeMenu: document.getElementById("mode-menu"),
  menuBrand: document.getElementById("menu-brand"),
  menuCountdown: document.getElementById("menu-countdown"),
  openMenuButton: document.getElementById("open-menu"),
  layoutModeToggle: document.getElementById("layout-mode-toggle"),
  menuCreate: document.getElementById("menu-create"),
  menuAccess: document.getElementById("menu-access"),
  menuRooms: document.getElementById("menu-rooms"),
  menuMaster: document.getElementById("menu-master"),
  menuMasterInventory: document.getElementById("menu-master-inventory"),
  menuMasterNpcCreate: document.getElementById("menu-master-npc-create"),
  menuMasterNpcList: document.getElementById("menu-master-npc-list"),
  menuDiary: document.getElementById("menu-diary"),
  firebaseConfigJson: document.getElementById("firebase-config-json"),
  firebaseConfigSave: document.getElementById("firebase-config-save"),
  firebaseConfigClear: document.getElementById("firebase-config-clear"),
  firebaseConfigFeedback: document.getElementById("firebase-config-feedback"),
  menuEventEnabled: document.getElementById("menu-event-enabled"),
  menuEventForce: document.getElementById("menu-event-force"),
  menuEventFrames: document.getElementById("menu-event-frames"),
  menuEventSave: document.getElementById("menu-event-save"),
  menuEventReset: document.getElementById("menu-event-reset"),
  menuEventFeedback: document.getElementById("menu-event-feedback"),
  installAppButton: document.getElementById("install-app"),
  exportBackupButton: document.getElementById("export-backup"),
  importBackupButton: document.getElementById("import-backup"),
  importBackupFile: document.getElementById("import-backup-file"),
  menuHomeView: document.getElementById("menu-home-view"),
  menuHomeCreateStart: document.getElementById("menu-home-create-start"),
  menuAccessView: document.getElementById("menu-access-view"),
  menuRoomsView: document.getElementById("menu-rooms-view"),
  menuDiaryView: document.getElementById("menu-diary-view"),
  menuMasterLockView: document.getElementById("menu-master-lock-view"),
  menuMasterView: document.getElementById("menu-master-view"),
  menuMasterInventoryView: document.getElementById("menu-master-inventory-view"),
  menuMasterNpcView: document.getElementById("menu-master-npc-view"),
  menuMasterNpcCreateInline: document.getElementById("menu-master-npc-create-inline"),
  menuMasterNpcArchiveList: document.getElementById("menu-master-npc-archive-list"),
  missionsMasterGate: document.getElementById("missions-master-gate"),
  missionsOpenMaster: document.getElementById("missions-open-master"),
  missionsShell: document.getElementById("missions-shell"),
  missionCreateStart: document.getElementById("mission-create-start"),
  missionCreateForm: document.getElementById("mission-create-form"),
  missionCode: document.getElementById("mission-code"),
  missionTitle: document.getElementById("mission-title"),
  missionIntro: document.getElementById("mission-intro"),
  missionCreateConfirm: document.getElementById("mission-create-confirm"),
  missionCreateCancel: document.getElementById("mission-create-cancel"),
  missionsList: document.getElementById("missions-list"),
  missionPanel: document.getElementById("mission-panel"),
  missionPanelTitle: document.getElementById("mission-panel-title"),
  missionPanelIntro: document.getElementById("mission-panel-intro"),
  missionPanelMeta: document.getElementById("mission-panel-meta"),
  missionPanelSource: document.getElementById("mission-panel-source"),
  missionAssignmentPanel: document.getElementById("mission-assignment-panel"),
  missionAssignmentMeta: document.getElementById("mission-assignment-meta"),
  missionAvailableShares: document.getElementById("mission-available-shares"),
  missionRollFeed: document.getElementById("mission-roll-feed"),
  missionCopyCode: document.getElementById("mission-copy-code"),
  missionClosePanel: document.getElementById("mission-close-panel"),
  missionSheetGrid: document.getElementById("mission-sheet-grid"),
  menuCharacterSearch: document.getElementById("menu-character-search"),
  menuCharactersList: document.getElementById("menu-characters-list"),
  diaryCreateSession: document.getElementById("diary-create-session"),
  diaryAttachmentFile: document.getElementById("diary-attachment-file"),
  diarySearch: document.getElementById("diary-search"),
  campaignDiaryList: document.getElementById("campaign-diary-list"),
  campaignDiaryDetail: document.getElementById("campaign-diary-detail"),
  masterPasswordInput: document.getElementById("master-password-input"),
  masterPasswordFeedback: document.getElementById("master-password-feedback"),
  masterUnlockButton: document.getElementById("master-unlock-button"),
  masterLockButton: document.getElementById("master-lock-button"),
  masterSearch: document.getElementById("master-search"),
  masterCharactersList: document.getElementById("master-characters-list"),
  masterCharacterDetail: document.getElementById("master-character-detail"),
  masterInventoryAdd: document.getElementById("master-inventory-add"),
  masterInventoryList: document.getElementById("master-inventory-list"),
  masterInventoryEditorTitle: document.getElementById("master-inventory-editor-title"),
  masterInventoryEditorStatus: document.getElementById("master-inventory-editor-status"),
  masterInventoryPreview: document.getElementById("master-inventory-preview"),
  masterInventoryImagePick: document.getElementById("master-inventory-image-pick"),
  masterInventoryImageClear: document.getElementById("master-inventory-image-clear"),
  masterInventoryImageFile: document.getElementById("master-inventory-image-file"),
  masterInventoryName: document.getElementById("master-inventory-name"),
  masterInventoryDescription: document.getElementById("master-inventory-description"),
  masterInventoryType: document.getElementById("master-inventory-type"),
  masterInventoryRarity: document.getElementById("master-inventory-rarity"),
  masterInventoryStatus: document.getElementById("master-inventory-status"),
  masterInventoryImageFit: document.getElementById("master-inventory-image-fit"),
  masterInventoryWeight: document.getElementById("master-inventory-weight"),
  masterInventoryChargesCurrent: document.getElementById("master-inventory-charges-current"),
  masterInventoryChargesMax: document.getElementById("master-inventory-charges-max"),
  masterInventoryLinkedAttack: document.getElementById("master-inventory-linked-attack"),
  masterInventoryDefenseBonus: document.getElementById("master-inventory-defense-bonus"),
  masterInventoryAttackBonus: document.getElementById("master-inventory-attack-bonus"),
  masterInventoryDamageBonus: document.getElementById("master-inventory-damage-bonus"),
  masterInventorySanPenalty: document.getElementById("master-inventory-san-penalty"),
  masterInventoryNote: document.getElementById("master-inventory-note"),
  masterInventorySave: document.getElementById("master-inventory-save"),
  masterInventoryDuplicate: document.getElementById("master-inventory-duplicate"),
  masterInventoryDelete: document.getElementById("master-inventory-delete"),
  masterInventoryGiveAll: document.getElementById("master-inventory-give-all"),
  masterInventoryTargetMeta: document.getElementById("master-inventory-target-meta"),
  masterInventoryTargetList: document.getElementById("master-inventory-target-list"),
  masterNpcScreen: document.getElementById("master-npc-screen"),
  masterNpcEditor: document.getElementById("master-npc-editor"),
  npcScreenTitle: document.getElementById("npc-screen-title"),
  npcScreenStatus: document.getElementById("npc-screen-status"),
  npcSheetSelect: document.getElementById("npc-sheet-select"),
  npcSheetPrev: document.getElementById("npc-sheet-prev"),
  npcSheetNext: document.getElementById("npc-sheet-next"),
  npcSheetCreate: document.getElementById("npc-sheet-create"),
  npcSheetSave: document.getElementById("npc-sheet-save"),
  npcSheetDuplicate: document.getElementById("npc-sheet-duplicate"),
  npcSheetToggleCombat: document.getElementById("npc-sheet-toggle-combat"),
  npcSheetDelete: document.getElementById("npc-sheet-delete"),
  masterEditorBar: document.getElementById("master-editor-bar"),
  masterEditorTitle: document.getElementById("master-editor-title"),
  masterEditorStatus: document.getElementById("master-editor-status"),
  masterSettingsPanel: document.getElementById("master-settings-panel"),
  masterSheetSelect: document.getElementById("master-sheet-select"),
  masterPrevSheet: document.getElementById("master-prev-sheet"),
  masterNextSheet: document.getElementById("master-next-sheet"),
  masterExitButton: document.getElementById("master-exit"),
  roomsFirebaseStatus: document.getElementById("rooms-firebase-status"),
  roomName: document.getElementById("room-name"),
  roomMode: document.getElementById("room-mode"),
  roomCode: document.getElementById("room-code"),
  roomCreate: document.getElementById("room-create"),
  roomJoin: document.getElementById("room-join"),
  roomLeave: document.getElementById("room-leave"),
  roomSendCharacter: document.getElementById("room-send-character"),
  roomCopyCode: document.getElementById("room-copy-code"),
  roomReadyToggle: document.getElementById("room-ready-toggle"),
  roomSessionToggle: document.getElementById("room-session-toggle"),
  roomLobbyStatus: document.getElementById("room-lobby-status"),
  roomChatMessage: document.getElementById("room-chat-message"),
  roomChatSend: document.getElementById("room-chat-send"),
  roomSyncNpcs: document.getElementById("room-sync-npcs"),
  roomsCurrentCharacter: document.getElementById("rooms-current-character"),
  roomCurrentTitle: document.getElementById("room-current-title"),
  roomCurrentMeta: document.getElementById("room-current-meta"),
  roomParticipants: document.getElementById("room-participants"),
  roomEncounterSummary: document.getElementById("room-encounter-summary"),
  roomLogList: document.getElementById("room-log-list"),
  roomNpcsList: document.getElementById("room-npcs-list"),
  formPanel: document.querySelector(".form-panel"),
  rollModal: document.getElementById("roll-modal"),
  rollModalCard: document.getElementById("roll-modal-card"),
  rollClose: document.getElementById("roll-close"),
  rollModalTitle: document.getElementById("roll-modal-title"),
  rollModalResult: document.getElementById("roll-modal-result"),
  rollModalDice: document.getElementById("roll-modal-dice"),
  rollSkillAnimation: document.getElementById("roll-skill-animation"),
};

const TRACK_CONFIG = {
  pd: {
    maxInput: elements.pdMax,
    lostInput: elements.pdLost,
    fill: elements.pdBarFill,
    label: elements.pdBarLabel,
    orientation: "horizontal",
  },
  san: {
    maxInput: elements.sanMax,
    lostInput: elements.sanLost,
    fill: elements.sanBarFill,
    label: elements.sanBarLabel,
    orientation: "horizontal",
  },
  pe: {
    maxInput: elements.peMax,
    lostInput: elements.peLost,
    fill: elements.peBarFill,
    label: elements.peBarLabel,
    orientation: "horizontal",
  },
  nex: {
    maxInput: elements.nexMax,
    lostInput: elements.nexLost,
    fill: elements.nexBarFill,
    label: elements.nexBarLabel,
    orientation: "vertical",
  },
};

let characters = loadCharacters();
let masterShares = loadMasterShares();
let masterNpcs = loadMasterNpcs();
let campaignDiary = loadCampaignDiary();
let masterInventoryTemplates = loadMasterInventoryTemplates();
let masterSecretNotes = loadMasterSecretNotes();
let menuEventSettings = loadMenuEventSettings();
let editingId = null;
let skillRanks = {};
let inventoryItems = [];
let inventoryDragIndex = null;
let selectedInventoryIndex = -1;
let inventoryPanelOpen = false;
let combatAbilities = [];
let attackEntries = [];
let initiativeEntries = [];
let initiativeRound = 1;
let activeInitiativeId = "";
let combatConditions = [];
let rollHistoryEntries = [];
let changeHistoryEntries = [];
let selectedAbilityId = null;
let combatModeEnabled = false;
let readModeEnabled = false;
let inActionEnabled = false;
let characterSheetMode = "builder";
let autoDerivedEnabled = false;
let menuTransitionTimer = null;
let autoSaveTimer = null;
let autoSavePending = false;
let lastSavedAt = "";
let lastSaveToastAt = 0;
let diceAudioContext = null;
let zipperAudioContext = null;
let selectedMasterShareId = null;
let pendingMasterShare = null;
let masterUnlocked = sessionStorage.getItem(MASTER_UNLOCK_SESSION_KEY) === "1";
let masterSyncChannel = createMasterSyncChannel();
let editorMode = "character";
let editingMasterShareId = null;
let selectedDiarySessionId = null;
let diaryEditorSessionId = null;
let diaryEditorDraft = null;
let editingNpcId = null;
let selectedMasterInventoryItemId = null;
let masterNpcCombatMode = false;
let rollDiceCount = loadRollDiceCount();
let rollDieType = loadRollDieType();
let layoutModePreference = loadLayoutModePreference();
let activeRollAnimationTimers = [];
let activeRollAnimationToken = 0;
let installPromptEvent = null;
let firebaseReady = false;
let firebaseUnavailableReason = "Firebase não configurado";
let firebaseDatabaseRef = null;
let firebaseAuthRef = null;
let firebaseUser = null;
let masterShareListenerRef = null;
let menuEventSettingsListenerRef = null;
let remoteMasterShareIds = new Set();
let autoMasterShareBootstrapUid = "";
let lastSuggestedMissionCode = "";
let currentRoomId = "";
let currentRoomData = null;
let currentRoomMode = "";
let roomValueListenerRef = null;
let missionListListenerRef = null;
let missionListOwnerUid = "";
let missionValueListenerRef = null;
let hostMissionRecords = [];
let selectedMissionId = "";
let selectedMissionData = null;
let missionCreatorExpanded = false;
let missionCardTabState = {};
let onlineCharacterId = "";
let postMasterUnlockRoute = "master";
let masterUnlockAttempts = 0;
let masterUnlockLockedUntil = 0;
let masterUnlockCooldownTimer = null;
const startupToasts = [];
const AUTO_SAVE_DELAY = 880;
const MASTER_NPC_SYNC_DELAY = 160;
let menuBrandGlitchTimer = null;
let menuBrandGlitchRunning = false;
let menuButtonStatusTimer = null;
let menuButtonGlitchTimer = null;
let menuButtonGlitchRunning = false;
let menuCountdownTimer = null;
let menuCountdownGlitchTimer = null;
let menuCountdownGlitchRunning = false;
let menuButtonStatusFrame = 0;
let menuButtonLastInteractionAt = Date.now();
let menuStatusButtonsCache = [];
let deferredCombatHudFrame = null;
let deferredEncounterFrame = null;
let deferredResourceBarsFrame = null;
let masterNpcSyncTimer = null;
let masterNpcSyncNeedsEditor = false;
let profileImageDrag = null;
const clickGlitchTimers = new WeakMap();
const CLICK_GLITCH_SELECTOR = [
  "button",
  ".avatar-circle",
  ".inventory-photo",
  ".ability-card:not(.editing)",
  ".roll-skill-die",
].join(", ");
const MENU_BRAND_BASE_TEXT = "Nemesis";
const MENU_BRAND_GLITCH_FRAMES = [
  "CASE #047",
  "ELE SABE",
  "ESTAMOS AQUI",
  "ERROR_███",
  "DECADÊNCIA",
  "Carnal",
  "A MORTE",
];
const MENU_BRAND_GLITCH_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%?/\\[]{}<>█▓▒░";

bootNemesis();

function bootNemesis() {
  window.NEMESIS_READY = false;
  window.NEMESIS_BOOT_ERROR = "";
  if (document.body) {
    document.body.classList.remove("nemesis-ready");
  }
  try {
    init();
    window.NEMESIS_READY = true;
    if (document.body) {
      document.body.classList.add("nemesis-ready");
    }
  } catch (error) {
    window.NEMESIS_READY = false;
    window.NEMESIS_BOOT_ERROR = error instanceof Error ? error.message : String(error);
    // Keep the error visible in devtools without breaking the rest of the page.
    console.error(error);
  }
}

function init() {
  const bootIssues = [];
  const runInitStep = (label, action) => {
    try {
      action();
    } catch (error) {
      bootIssues.push(label);
      console.error(`Nemesis init step failed: ${label}`, error);
    }
  };

  runInitStep("layout", applyLayoutModePreference);
  runInitStep("atributos", renderAttributes);
  runInitStep("perícias", renderSkills);
  runInitStep("ataques", renderAttacks);
  runInitStep("iniciativa", renderInitiativeTracker);
  runInitStep("encontro", renderEncounterPanel);
  runInitStep("condições", renderConditions);
  runInitStep("histórico de rolagens", renderRollHistory);
  runInitStep("eventos", bindEvents);
  runInitStep("controles de dados", syncRollDiceControls);
  runInitStep("reset da ficha", resetForm);
  runInitStep("personagens criados", renderCharacterList);
  runInitStep("modo mestre", renderMasterCharacterList);
  runInitStep("npcs do mestre", renderMasterNpcList);
  runInitStep("editor de npc", renderMasterNpcEditor);
  runInitStep("evento do menu", renderMenuEventSettingsControls);
  runInitStep("missões e sessões", renderRoomsView);
  runInitStep("ações da ficha", updateCurrentShareActions);
  runInitStep("view inicial", () => {
    setView("create");
    showMenuHome();
    openModeMenu();
  });
  runInitStep("glitch do título", startMenuBrandGlitchLoop);
  runInitStep("subtexto do menu", startMenuButtonStatusLoop);
  runInitStep("glitch dos botões", startMenuButtonsGlitchLoop);
  runInitStep("contador do menu", startMenuCountdownLoop);
  runInitStep("avisos iniciais", flushStartupToasts);
  runInitStep("firebase local", hydrateRuntimeFirebaseConfigUI);
  runInitStep("presença firebase", initFirebasePresence);
  runInitStep("pwa", registerPwaShell);
  runInitStep("compartilhamento por link", importSharedStateFromLink);

  if (bootIssues.length > 0) {
    queueStartupToast(
      `Nemesis iniciou com falhas em ${bootIssues.slice(0, 3).join(", ")}${bootIssues.length > 3 ? "..." : ""}.`,
      "warning"
    );
    flushStartupToasts();
  }
}

function getCharacterStorageCandidates() {
  const candidates = [STORAGE_KEY];
  [
    "ficha-rpg.personagens",
    "ficha-rpg.characters",
    "nemesis.personagens",
    "nemesis.characters",
  ].forEach((key) => {
    if (!candidates.includes(key)) {
      candidates.push(key);
    }
  });
  return candidates;
}

function parseStoredCharacterCollection(parsed) {
  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && typeof parsed === "object") {
    if (Array.isArray(parsed.characters)) {
      return parsed.characters;
    }

    const values = Object.values(parsed).filter((value) => value && typeof value === "object");
    if (values.length > 0 && values.every((value) => !Array.isArray(value))) {
      return values;
    }
  }

  return [];
}

function persistCharactersWithRecovery(data) {
  return persistStoragePayloadWithRecovery(
    STORAGE_KEY,
    JSON.stringify(Array.isArray(data) ? data : [])
  );
}

function persistStoragePayloadWithRecovery(key, payload, recoveryKeys = [SAFETY_BACKUP_STORAGE_KEY]) {
  try {
    localStorage.setItem(key, payload);
    return true;
  } catch (error) {
    for (const recoveryKey of recoveryKeys) {
      if (!recoveryKey || recoveryKey === key) {
        continue;
      }

      try {
        localStorage.removeItem(recoveryKey);
        localStorage.setItem(key, payload);
        return true;
      } catch {
        // Try the next recovery key.
      }
    }

    throw error;
  }
}

function persistJsonWithRecovery(key, data, recoveryKeys = [SAFETY_BACKUP_STORAGE_KEY]) {
  return persistStoragePayloadWithRecovery(key, JSON.stringify(data), recoveryKeys);
}

function setAutoSavePendingState(nextPending) {
  const pending = Boolean(nextPending);
  if (autoSavePending === pending) {
    return;
  }

  autoSavePending = pending;
  renderSheetStatusCenter();
}

function scheduleCombatHudRender() {
  if (deferredCombatHudFrame !== null) {
    return;
  }

  deferredCombatHudFrame = window.requestAnimationFrame(() => {
    deferredCombatHudFrame = null;
    renderCombatHud();
  });
}

function scheduleEncounterPanelRender() {
  if (deferredEncounterFrame !== null) {
    return;
  }

  deferredEncounterFrame = window.requestAnimationFrame(() => {
    deferredEncounterFrame = null;
    renderEncounterPanel();
  });
}

function scheduleResourceBarsUpdate() {
  if (deferredResourceBarsFrame !== null) {
    return;
  }

  deferredResourceBarsFrame = window.requestAnimationFrame(() => {
    deferredResourceBarsFrame = null;
    updateResourceBars();
  });
}

function queueMasterNpcSync(options = {}) {
  const { renderEditor = false, delay = MASTER_NPC_SYNC_DELAY } = options;
  masterNpcSyncNeedsEditor = masterNpcSyncNeedsEditor || renderEditor;

  if (masterNpcSyncTimer) {
    window.clearTimeout(masterNpcSyncTimer);
  }

  masterNpcSyncTimer = window.setTimeout(() => {
    masterNpcSyncTimer = null;
    const shouldRenderEditor = masterNpcSyncNeedsEditor;
    masterNpcSyncNeedsEditor = false;
    saveMasterNpcs(masterNpcs);
    renderMasterNpcList();
    renderMasterNpcSheetSwitcher();
    updateMasterNpcScreenStatus();
    if (shouldRenderEditor) {
      renderMasterNpcEditor();
    }
  }, Math.max(0, delay));
}

function flushMasterNpcSync(options = {}) {
  const { renderEditor = false } = options;
  if (masterNpcSyncTimer) {
    window.clearTimeout(masterNpcSyncTimer);
    masterNpcSyncTimer = null;
  }

  const shouldRenderEditor = masterNpcSyncNeedsEditor || renderEditor;
  masterNpcSyncNeedsEditor = false;
  saveMasterNpcs(masterNpcs);
  renderMasterNpcList();
  renderMasterNpcSheetSwitcher();
  updateMasterNpcScreenStatus();
  if (shouldRenderEditor) {
    renderMasterNpcEditor();
  }
}

function refreshMenuStatusButtonsCache() {
  menuStatusButtonsCache = Array.from(document.querySelectorAll(".mode-btn, .menu-utility-btn"));
}

function shouldRunMenuAmbientEffects() {
  return Boolean(elements.modeMenu?.classList.contains("open")) && !document.hidden;
}

function stopMenuAmbientEffects() {
  if (menuBrandGlitchTimer) {
    window.clearTimeout(menuBrandGlitchTimer);
    menuBrandGlitchTimer = null;
  }
  if (menuButtonStatusTimer) {
    window.clearInterval(menuButtonStatusTimer);
    menuButtonStatusTimer = null;
  }
  if (menuButtonGlitchTimer) {
    window.clearTimeout(menuButtonGlitchTimer);
    menuButtonGlitchTimer = null;
  }
  if (menuCountdownTimer) {
    window.clearInterval(menuCountdownTimer);
    menuCountdownTimer = null;
  }
  if (menuCountdownGlitchTimer) {
    window.clearTimeout(menuCountdownGlitchTimer);
    menuCountdownGlitchTimer = null;
  }

  menuBrandGlitchRunning = false;
  menuButtonGlitchRunning = false;
  menuCountdownGlitchRunning = false;
  elements.menuBrand?.classList.remove("is-glitching");
  elements.menuCountdown?.classList.remove("is-glitching");
  getMenuStatusButtons().forEach((button) => button.classList.remove("is-glitching"));
  restoreMenuButtonLabels();
}

function refreshMenuAmbientEffects(force = false) {
  if (!shouldRunMenuAmbientEffects()) {
    stopMenuAmbientEffects();
    syncMenuCountdownDisplay(formatMenuCountdown());
    return;
  }

  refreshMenuStatusButtonsCache();
  if (force) {
    stopMenuAmbientEffects();
  }
  startMenuButtonStatusLoop();
  startMenuBrandGlitchLoop();
  startMenuButtonsGlitchLoop();
  startMenuCountdownLoop();
}

function queueStartupToast(message, kind = "status") {
  if (!message) {
    return;
  }
  startupToasts.push({ message, kind });
}

function flushStartupToasts() {
  if (!startupToasts.length) {
    return;
  }

  startupToasts.splice(0).forEach((notice, index) => {
    window.setTimeout(() => {
      pushUiToast(notice.message, notice.kind, 3600);
    }, 220 * index);
  });
}

function bindEvents() {
  if (elements.form) {
    elements.form.addEventListener("submit", handleSaveCharacter);
    elements.form.addEventListener("input", handleFormAutoSaveEvent);
    elements.form.addEventListener("change", handleFormAutoSaveEvent);
  }
  if (elements.saveButton) {
    elements.saveButton.addEventListener("click", (event) => {
      if (!elements.form) {
        return;
      }

      if (typeof elements.form.reportValidity === "function" && !elements.form.reportValidity()) {
        event.preventDefault();
        return;
      }

      if (typeof elements.form.requestSubmit === "function") {
        event.preventDefault();
        elements.form.requestSubmit();
      }
    });
  }
  if (elements.classSelect) {
    elements.classSelect.addEventListener("change", handleClassChange);
  }
  if (elements.trail) {
    elements.trail.addEventListener("change", handleTrailChange);
  }
  if (elements.birthdate) {
    elements.birthdate.addEventListener("change", handleBirthdateChange);
  }
  if (elements.wounds) {
    elements.wounds.addEventListener("change", () => {
      applyWoundState();
      updateProfileIdentity();
    });
  }
  if (elements.name) {
    elements.name.addEventListener("input", updateProfileIdentity);
  }
  if (elements.origin) {
    elements.origin.addEventListener("input", updateProfileIdentity);
  }
  [elements.characterHeight, elements.characterWeight].forEach((field) => {
    field?.addEventListener("input", () => {
      renderProfileStaticSummary();
    });
  });
  if (elements.nex) {
    elements.nex.addEventListener("change", normalizeNexValue);
    elements.nex.addEventListener("blur", normalizeNexValue);
  }
  if (elements.generateDerivedValues) {
    elements.generateDerivedValues.addEventListener("click", () => {
      const applied = applyDerivedCalculations({ force: true });
      if (applied) {
        queueAutoSave();
      }
    });
  }
  if (elements.shareMasterCurrent) {
    elements.shareMasterCurrent.addEventListener("click", handleShareCurrentToMaster);
  }

  Object.values(TRACK_CONFIG).forEach((track) => {
    if (track.maxInput) {
      track.maxInput.addEventListener("input", scheduleResourceBarsUpdate);
    }
    if (track.lostInput) {
      track.lostInput.addEventListener("input", scheduleResourceBarsUpdate);
    }
  });

  elements.trackAdjusters.forEach((button) => {
    button.addEventListener("click", () => {
      const track = button.dataset.track;
      const delta = Number.parseInt(button.dataset.delta || "0", 10);
      adjustTrack(track, delta);
    });
  });

  if (elements.skillSearch) {
    elements.skillSearch.addEventListener("input", renderSkills);
  }
  if (elements.rollDiceCount) {
    elements.rollDiceCount.addEventListener("change", () => {
      setRollDiceCount(readNumber(elements.rollDiceCount.value) ?? 1);
    });
  }
  if (elements.rollDiceDecrease) {
    elements.rollDiceDecrease.addEventListener("click", () => {
      setRollDiceCount(rollDiceCount - 1);
    });
  }
  if (elements.rollDiceIncrease) {
    elements.rollDiceIncrease.addEventListener("click", () => {
      setRollDiceCount(rollDiceCount + 1);
    });
  }
  if (elements.rollDieType) {
    elements.rollDieType.addEventListener("change", () => {
      setRollDieType(readNumber(elements.rollDieType.value) ?? 20);
    });
  }
  if (elements.rollDieTrigger) {
    elements.rollDieTrigger.addEventListener("click", () => {
      void handleManualDieRoll();
    });
  }

  if (elements.openMenuButton) {
    elements.openMenuButton.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.openMenuButton);
      openModeMenu();
      showMenuHome();
    });
  }
  if (elements.layoutModeToggle) {
    elements.layoutModeToggle.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.layoutModeToggle);
      toggleLayoutModePreference();
    });
  }

  if (elements.combatModeToggle) {
    elements.combatModeToggle.addEventListener("click", toggleCombatMode);
  }
  if (elements.inActionToggle) {
    elements.inActionToggle.addEventListener("click", toggleInAction);
  }
  if (elements.readModeToggle) {
    elements.readModeToggle.addEventListener("click", toggleReadMode);
  }
  if (elements.sheetEditToggle) {
    elements.sheetEditToggle.addEventListener("click", toggleCharacterSheetEditMode);
  }
  if (elements.exportCharacter) {
    elements.exportCharacter.addEventListener("click", handleExportCharacter);
  }
  if (elements.importCharacter) {
    elements.importCharacter.addEventListener("click", () => {
      elements.importCharacterFile?.click();
    });
  }
  if (elements.exportCharacterInline) {
    elements.exportCharacterInline.addEventListener("click", handleExportCharacter);
  }
  if (elements.importCharacterInline) {
    elements.importCharacterInline.addEventListener("click", () => {
      elements.importCharacterFile?.click();
    });
  }
  if (elements.importCharacterFile) {
    elements.importCharacterFile.addEventListener("change", handleImportCharacterFile);
  }
  if (elements.inventoryToggle) {
    elements.inventoryToggle.addEventListener("click", toggleInventoryPanel);
  }

  if (elements.addAbilityButton) {
    elements.addAbilityButton.addEventListener("click", handleAddAbility);
  }
  if (elements.addAttackButton) {
    elements.addAttackButton.addEventListener("click", handleAddAttack);
  }
  if (elements.attacksList) {
    elements.attacksList.addEventListener("click", handleAttackListClick);
    elements.attacksList.addEventListener("input", handleAttackListInput);
    elements.attacksList.addEventListener("change", handleAttackListInput);
  }
  if (elements.initiativeAddSelf) {
    elements.initiativeAddSelf.addEventListener("click", handleInitiativeAddSelf);
  }
  if (elements.initiativeAdd) {
    elements.initiativeAdd.addEventListener("click", handleInitiativeAdd);
  }
  if (elements.initiativeSort) {
    elements.initiativeSort.addEventListener("click", sortInitiativeEntries);
  }
  if (elements.initiativeNext) {
    elements.initiativeNext.addEventListener("click", advanceInitiativeTurn);
  }
  if (elements.initiativeList) {
    elements.initiativeList.addEventListener("click", handleInitiativeListClick);
    elements.initiativeList.addEventListener("input", handleInitiativeListInput);
  }
  if (elements.conditionsList) {
    elements.conditionsList.addEventListener("click", handleConditionListClick);
    elements.conditionsList.addEventListener("input", handleConditionListInput);
  }
  if (elements.clearRollHistory) {
    elements.clearRollHistory.addEventListener("click", clearRollHistory);
  }
  if (elements.clearChangeHistory) {
    elements.clearChangeHistory.addEventListener("click", clearChangeHistory);
  }
  if (elements.combatQuickActions) {
    elements.combatQuickActions.addEventListener("click", handleCombatQuickActionsClick);
  }

  if (elements.menuCreate) {
    elements.menuCreate.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuCreate);
      startNewCharacterFromMenu();
    });
  }
  if (elements.menuHomeCreateStart) {
    elements.menuHomeCreateStart.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuHomeCreateStart);
      startNewCharacterFromMenu();
    });
  }

  if (elements.menuAccess) {
    elements.menuAccess.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuAccess);
      if (
        elements.menuAccess.classList.contains("active")
        && !elements.menuAccessView?.classList.contains("hidden")
      ) {
        showMenuHome();
        return;
      }
      showMenuAccess();
    });
  }
  if (elements.menuRooms) {
    elements.menuRooms.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuRooms);
      if (
        elements.menuRooms.classList.contains("active")
        && !elements.menuRoomsView?.classList.contains("hidden")
      ) {
        showMenuHome();
        return;
      }
      showMenuRooms();
    });
  }

  if (elements.menuMaster) {
    elements.menuMaster.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuMaster);
      if (
        elements.menuMaster.classList.contains("active")
        && (
          !elements.menuMasterLockView?.classList.contains("hidden")
          || !elements.menuMasterView?.classList.contains("hidden")
        )
      ) {
        showMenuHome();
        return;
      }
      showMasterMode();
    });
  }

  if (elements.menuMasterInventory) {
    elements.menuMasterInventory.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuMasterInventory);
      if (
        elements.menuMasterInventory.classList.contains("active")
        && !elements.menuMasterInventoryView?.classList.contains("hidden")
      ) {
        showMenuHome();
        return;
      }
      showMenuMasterInventory();
    });
  }

  if (elements.menuMasterNpcCreate) {
    elements.menuMasterNpcCreate.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuMasterNpcCreate);
      handleMasterNpcCreate();
    });
  }

  if (elements.menuMasterNpcList) {
    elements.menuMasterNpcList.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuMasterNpcList);
      if (
        elements.menuMasterNpcList.classList.contains("active")
        && !elements.menuMasterNpcView?.classList.contains("hidden")
      ) {
        showMenuHome();
        return;
      }
      showMenuMasterNpcArchive();
    });
  }

  if (elements.menuDiary) {
    elements.menuDiary.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.menuDiary);
      if (
        elements.menuDiary.classList.contains("active")
        && !elements.menuDiaryView?.classList.contains("hidden")
      ) {
        showMenuHome();
        return;
      }
      showMenuDiary();
    });
  }
  if (elements.modeMenu) {
    ["pointermove", "pointerdown", "touchstart", "keydown"].forEach((eventName) => {
      elements.modeMenu.addEventListener(eventName, markMenuButtonsInteraction, { passive: eventName !== "keydown" });
    });
  }
  document.addEventListener("visibilitychange", () => {
    refreshMenuAmbientEffects(document.visibilityState === "visible");
  });
  window.addEventListener("pagehide", () => {
    if (autoSaveTimer) {
      window.clearTimeout(autoSaveTimer);
      autoSaveTimer = null;
      autoSaveCharacter();
    }
    if (masterNpcSyncTimer) {
      flushMasterNpcSync();
    }
    stopMenuAmbientEffects();
  });
  window.addEventListener("resize", applyLayoutModePreference);
  if (elements.firebaseConfigSave) {
    elements.firebaseConfigSave.addEventListener("click", saveRuntimeFirebaseConfig);
  }
  if (elements.firebaseConfigClear) {
    elements.firebaseConfigClear.addEventListener("click", clearRuntimeFirebaseConfig);
  }
  if (elements.menuEventSave) {
    elements.menuEventSave.addEventListener("click", handleMenuEventSettingsSave);
  }
  if (elements.menuEventReset) {
    elements.menuEventReset.addEventListener("click", handleMenuEventSettingsReset);
  }
  if (elements.installAppButton) {
    elements.installAppButton.addEventListener("click", handleInstallApp);
  }
  if (elements.exportBackupButton) {
    elements.exportBackupButton.addEventListener("click", exportFullBackup);
  }
  if (elements.importBackupButton) {
    elements.importBackupButton.addEventListener("click", () => elements.importBackupFile?.click());
  }
  if (elements.importBackupFile) {
    elements.importBackupFile.addEventListener("change", handleImportBackupFile);
  }

  if (elements.diaryCreateSession) {
    elements.diaryCreateSession.addEventListener("click", handleDiaryCreateSession);
  }

  if (elements.diaryAttachmentFile) {
    elements.diaryAttachmentFile.addEventListener("change", handleDiaryAttachmentFileChange);
  }

  if (elements.diarySearch) {
    elements.diarySearch.addEventListener("input", renderCampaignDiary);
  }

  if (elements.campaignDiaryList) {
    elements.campaignDiaryList.addEventListener("click", handleDiaryListClick);
  }

  if (elements.campaignDiaryDetail) {
    elements.campaignDiaryDetail.addEventListener("click", handleDiaryDetailClick);
    elements.campaignDiaryDetail.addEventListener("input", handleDiaryDetailInput);
    elements.campaignDiaryDetail.addEventListener("change", handleDiaryDetailInput);
  }

  if (elements.menuCharacterSearch) {
    elements.menuCharacterSearch.addEventListener("input", renderCharacterList);
  }
  if (elements.masterSearch) {
    elements.masterSearch.addEventListener("input", renderMasterCharacterList);
  }
  if (elements.masterUnlockButton) {
    elements.masterUnlockButton.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.masterUnlockButton);
      handleMasterUnlock();
    });
  }
  if (elements.masterLockButton) {
    elements.masterLockButton.addEventListener("click", () => {
      triggerMenuButtonAnimation(elements.masterLockButton);
      lockMasterMode();
    });
  }
  if (elements.masterSheetSelect) {
    elements.masterSheetSelect.addEventListener("change", handleMasterSheetSelection);
  }
  if (elements.masterPrevSheet) {
    elements.masterPrevSheet.addEventListener("click", () => stepMasterSheet(-1));
  }
  if (elements.masterNextSheet) {
    elements.masterNextSheet.addEventListener("click", () => stepMasterSheet(1));
  }
  if (elements.masterExitButton) {
    elements.masterExitButton.addEventListener("click", () => {
      exitMasterMode();
    });
  }
  if (elements.menuMasterNpcCreateInline) {
    elements.menuMasterNpcCreateInline.addEventListener("click", handleMasterNpcCreate);
  }
  if (elements.menuMasterNpcArchiveList) {
    elements.menuMasterNpcArchiveList.addEventListener("click", handleMasterNpcListClick);
  }
  if (elements.masterNpcEditor) {
    elements.masterNpcEditor.addEventListener("click", handleMasterNpcEditorClick);
    elements.masterNpcEditor.addEventListener("input", handleMasterNpcEditorInput);
    elements.masterNpcEditor.addEventListener("change", handleMasterNpcEditorChange);
  }
  if (elements.npcSheetCreate) {
    elements.npcSheetCreate.addEventListener("click", handleMasterNpcCreate);
  }
  if (elements.npcSheetSelect) {
    elements.npcSheetSelect.addEventListener("change", () => {
      const selectedId = elements.npcSheetSelect?.value || "";
      if (selectedId) {
        openMasterNpcSheet(selectedId, { closeMenu: false });
      }
    });
  }
  if (elements.npcSheetPrev) {
    elements.npcSheetPrev.addEventListener("click", () => stepMasterNpcSheet(-1));
  }
  if (elements.npcSheetNext) {
    elements.npcSheetNext.addEventListener("click", () => stepMasterNpcSheet(1));
  }
  if (elements.npcSheetSave) {
    elements.npcSheetSave.addEventListener("click", () => {
      flushMasterNpcSync({ renderEditor: false });
      pushUiToast("NPC salvo", "status", 1800);
    });
  }
  if (elements.npcSheetDuplicate) {
    elements.npcSheetDuplicate.addEventListener("click", () => {
      const npc = getActiveMasterNpc();
      if (!npc) {
        return;
      }
      const clonedNpc = cloneMasterNpc(npc);
      masterNpcs = [clonedNpc, ...masterNpcs];
      editingNpcId = clonedNpc.id;
      masterNpcCombatMode = false;
      saveMasterNpcs(masterNpcs);
      renderMasterNpcList();
      openMasterNpcSheet(clonedNpc.id, { closeMenu: false });
      pushUiToast("NPC duplicado", "status", 1800);
    });
  }
  if (elements.npcSheetToggleCombat) {
    elements.npcSheetToggleCombat.addEventListener("click", () => {
      masterNpcCombatMode = !masterNpcCombatMode;
      renderMasterNpcEditor();
      updateMasterNpcScreenStatus();
    });
  }
  if (elements.npcSheetDelete) {
    elements.npcSheetDelete.addEventListener("click", () => {
      const npc = getActiveMasterNpc();
      if (!npc) {
        return;
      }
      deleteMasterNpcById(npc.id);
    });
  }
  if (elements.masterCharacterDetail) {
    elements.masterCharacterDetail.addEventListener("input", handleMasterSecretNotesInput);
  }
  if (elements.masterInventoryAdd) {
    elements.masterInventoryAdd.addEventListener("click", handleMasterInventoryTemplateAdd);
  }
  if (elements.masterInventoryList) {
    elements.masterInventoryList.addEventListener("click", handleMasterInventoryListClick);
  }
  if (elements.masterInventorySave) {
    elements.masterInventorySave.addEventListener("click", saveSelectedMasterInventoryTemplate);
  }
  if (elements.masterInventoryDuplicate) {
    elements.masterInventoryDuplicate.addEventListener("click", duplicateSelectedMasterInventoryTemplate);
  }
  if (elements.masterInventoryDelete) {
    elements.masterInventoryDelete.addEventListener("click", deleteSelectedMasterInventoryTemplate);
  }
  if (elements.masterInventoryImagePick) {
    elements.masterInventoryImagePick.addEventListener("click", () => elements.masterInventoryImageFile?.click());
  }
  if (elements.masterInventoryImageClear) {
    elements.masterInventoryImageClear.addEventListener("click", clearMasterInventoryTemplateImage);
  }
  if (elements.masterInventoryImageFile) {
    elements.masterInventoryImageFile.addEventListener("change", handleMasterInventoryImageFileChange);
  }
  if (elements.masterInventoryGiveAll) {
    elements.masterInventoryGiveAll.addEventListener("click", handleGiveSelectedItemToAllActiveShares);
  }
  if (elements.masterInventoryTargetList) {
    elements.masterInventoryTargetList.addEventListener("click", handleMasterInventoryTargetListClick);
  }
  if (elements.masterPasswordInput) {
    elements.masterPasswordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleMasterUnlock();
      }
    });
  }
  if (elements.missionsOpenMaster) {
    elements.missionsOpenMaster.addEventListener("click", () => {
      if (masterUnlocked) {
        showMenuRooms();
        return;
      }
      postMasterUnlockRoute = "rooms";
      showMasterLockView("Desbloqueie o acesso restrito para criar sessões e acompanhar as fichas online.");
    });
  }
  if (elements.missionCreateStart) {
    elements.missionCreateStart.addEventListener("click", () => {
      missionCreatorExpanded = true;
      renderRoomsView();
      window.setTimeout(() => elements.missionTitle?.focus(), 0);
    });
  }
  if (elements.missionCreateCancel) {
    elements.missionCreateCancel.addEventListener("click", () => {
      missionCreatorExpanded = false;
      if (elements.missionTitle) {
        elements.missionTitle.value = "";
      }
      if (elements.missionIntro) {
        elements.missionIntro.value = "";
      }
      renderRoomsView();
    });
  }
  if (elements.missionCreateConfirm) {
    elements.missionCreateConfirm.addEventListener("click", handleCreateMission);
  }
  [elements.missionCode, elements.missionTitle, elements.missionIntro].forEach((field) => {
    if (field) {
      field.addEventListener("input", renderRoomsView);
    }
  });
  if (elements.missionsList) {
    elements.missionsList.addEventListener("click", handleMissionListClick);
  }
  if (elements.missionSheetGrid) {
    elements.missionSheetGrid.addEventListener("click", handleMissionSheetGridClick);
  }
  if (elements.missionAvailableShares) {
    elements.missionAvailableShares.addEventListener("click", handleMissionAvailableSharesClick);
  }
  if (elements.missionCopyCode) {
    elements.missionCopyCode.addEventListener("click", copySelectedMissionCode);
  }
  if (elements.missionClosePanel) {
    elements.missionClosePanel.addEventListener("click", () => closeSelectedMissionPanel(true));
  }
  if (elements.roomJoin) {
    elements.roomJoin.addEventListener("click", handleJoinRoom);
  }
  if (elements.roomLeave) {
    elements.roomLeave.addEventListener("click", leaveCurrentRoom);
  }
  if (elements.roomCopyCode) {
    elements.roomCopyCode.addEventListener("click", copyCurrentRoomCode);
  }
  if (elements.roomSendCharacter) {
    elements.roomSendCharacter.addEventListener("click", pushCurrentCharacterToRoom);
  }
  if (elements.roomCode) {
    elements.roomCode.addEventListener("input", () => {
      elements.roomCode.value = normalizeSessionCode(elements.roomCode.value);
    });
    elements.roomCode.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleJoinRoom();
      }
    });
  }

  if (elements.modeMenu) {
    elements.modeMenu.addEventListener("click", (event) => {
      if (event.target === elements.modeMenu) {
        closeModeMenu(true);
        showMenuHome();
      }
    });
  }

  if (elements.rollClose) {
    elements.rollClose.addEventListener("click", closeRollModal);
  }
  if (elements.rollModal) {
    elements.rollModal.addEventListener("click", (event) => {
      if (event.target === elements.rollModal) {
        closeRollModal();
      }
    });
  }

  document.addEventListener("click", handleInteractiveGlitchClick, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (elements.profileImageModal?.classList.contains("open")) {
      closeProfileImageModal();
      return;
    }
    if (elements.rollModal?.classList.contains("open")) {
      closeRollModal();
      return;
    }
    if (elements.modeMenu?.classList.contains("open")) {
      closeModeMenu(true);
      showMenuHome();
    }
  });

  if (elements.profileImageFile) {
    elements.profileImageFile.addEventListener("change", (event) => {
      const [file] = event.target.files;
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        elements.profileImageData.value = String(reader.result || "");
        setProfileImageSettings({ x: 50, y: 50, zoom: 1 });
        setProfilePreview(elements.profileImageData.value, elements.profileImageFit?.value || "cover");
        refreshProfileImageModal();
        setProfileImageToolsVisible(true);
        openProfileImageModal(true);
        queueAutoSave();
      };
      reader.readAsDataURL(file);
    });
  }
  if (elements.profileImageFit) {
    elements.profileImageFit.addEventListener("change", () => {
      setProfilePreview(elements.profileImageData.value, elements.profileImageFit.value);
      queueAutoSave();
    });
  }
  if (elements.profileImageOpen) {
    elements.profileImageOpen.addEventListener("click", (event) => {
      event.preventDefault();
      if (hasCustomProfileImage()) {
        openProfileImageModal(false);
      } else {
        openProfileImagePicker();
      }
    });
  }
  if (elements.profileImageModal) {
    elements.profileImageModal.addEventListener("click", (event) => {
      if (event.target === elements.profileImageModal) {
        closeProfileImageModal();
      }
    });
  }
  elements.profileImageClose?.addEventListener("click", closeProfileImageModal);
  elements.profileImageEditToggle?.addEventListener("click", () => {
    setProfileImageToolsVisible(true);
  });
  elements.profileImageReplace?.addEventListener("click", openProfileImagePicker);
  elements.profileImageReset?.addEventListener("click", () => {
    setProfileImageSettings({ x: 50, y: 50, zoom: 1 });
    syncProfileImageControls();
    refreshProfileImagePreview();
    refreshProfileImageModal();
    queueAutoSave();
  });
  [elements.profileImagePositionXControl, elements.profileImagePositionYControl, elements.profileImageZoomControl].forEach((control) => {
    control?.addEventListener("input", () => {
      setProfileImageSettings({
        x: elements.profileImagePositionXControl?.value,
        y: elements.profileImagePositionYControl?.value,
        zoom: elements.profileImageZoomControl?.value,
      });
      refreshProfileImagePreview();
      refreshProfileImageModal();
      queueAutoSave();
    });
  });
  elements.profileFrameShapeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setProfileImageSettings({ shape: button.dataset.profileFrameShape });
      syncProfileImageControls();
      refreshProfileImagePreview();
      refreshProfileImageModal();
      queueAutoSave();
    });
  });
  elements.profileImageViewer?.addEventListener("pointerdown", startProfileImageDrag);
  document.addEventListener("pointermove", moveProfileImageDrag);
  document.addEventListener("pointerup", stopProfileImageDrag);

  window.addEventListener("storage", handleStorageEvent);
  if (masterSyncChannel) {
    masterSyncChannel.addEventListener("message", handleMasterSyncMessage);
  }
  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  window.addEventListener("appinstalled", handleAppInstalled);
}

function startNewCharacterFromMenu() {
  try {
    setEditorMode("character");
  } catch (error) {
    console.error(error);
  }
  try {
    resetForm();
  } catch (error) {
    console.error(error);
  }
  try {
    setView("create");
  } catch (error) {
    console.error(error);
  }
  try {
    triggerSheetTransition();
  } catch (error) {
    console.error(error);
  }
  try {
    closeModeMenu(true);
    showMenuHome();
  } catch (error) {
    console.error(error);
  }
  try {
    elements.name?.focus();
  } catch (error) {
    console.error(error);
  }
}

function hideAllMenuViews() {
  elements.menuHomeView?.classList.add("hidden");
  elements.menuAccessView?.classList.add("hidden");
  elements.menuRoomsView?.classList.add("hidden");
  const tabletopView = document.getElementById("menu-tabletop-view");
  const preserveTabletopView = document.body.getAttribute("data-view") === "tabletop"
    && Boolean(tabletopView?.closest("#tabletop-standalone-screen"));
  if (!preserveTabletopView) {
    tabletopView?.classList.add("hidden");
  }
  elements.menuDiaryView?.classList.add("hidden");
  elements.menuMasterLockView?.classList.add("hidden");
  elements.menuMasterView?.classList.add("hidden");
  elements.menuMasterInventoryView?.classList.add("hidden");
  elements.menuMasterNpcView?.classList.add("hidden");
}

function setActiveMenuButton(button) {
  [
    elements.menuCreate,
    elements.menuAccess,
    elements.menuRooms,
    document.getElementById("menu-tabletop"),
    elements.menuMaster,
    elements.menuMasterInventory,
    elements.menuMasterNpcCreate,
    elements.menuMasterNpcList,
    elements.menuDiary,
  ].forEach((item) => {
    item?.classList.toggle("active", item === button);
  });
  updateMenuButtonStatusTexts(menuButtonStatusFrame);
}

function updateMasterMenuOptions() {
  const shouldShow = Boolean(masterUnlocked);
  [elements.menuMasterInventory, elements.menuMasterNpcCreate, elements.menuMasterNpcList].forEach((button) => {
    button?.classList.toggle("hidden", !shouldShow);
  });
  refreshMenuStatusButtonsCache();
}

function getOrderedMasterNpcs() {
  return [...masterNpcs].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

function getActiveMasterNpc() {
  return masterNpcs.find((npc) => npc.id === editingNpcId) || null;
}

function renderMasterNpcSheetSwitcher() {
  if (!elements.npcSheetSelect) {
    return;
  }

  const ordered = getOrderedMasterNpcs();
  elements.npcSheetSelect.innerHTML = "";

  if (!ordered.length) {
    elements.npcSheetSelect.add(new Option("Nenhum NPC cadastrado", ""));
    elements.npcSheetSelect.disabled = true;
    elements.npcSheetPrev.disabled = true;
    elements.npcSheetNext.disabled = true;
    elements.npcSheetSave.disabled = true;
    elements.npcSheetDuplicate.disabled = true;
    elements.npcSheetToggleCombat.disabled = true;
    elements.npcSheetDelete.disabled = true;
    return;
  }

  ordered.forEach((npc) => {
    const label = npc.name?.trim() || "NPC sem nome";
    elements.npcSheetSelect.add(new Option(label, npc.id));
  });

  const selectedId = ordered.some((npc) => npc.id === editingNpcId) ? editingNpcId : ordered[0].id;
  editingNpcId = selectedId;
  elements.npcSheetSelect.value = selectedId;
  const disableStep = ordered.length <= 1;
  elements.npcSheetSelect.disabled = false;
  elements.npcSheetPrev.disabled = disableStep;
  elements.npcSheetNext.disabled = disableStep;
  elements.npcSheetSave.disabled = false;
  elements.npcSheetDuplicate.disabled = false;
  elements.npcSheetToggleCombat.disabled = false;
  elements.npcSheetDelete.disabled = false;
}

function updateMasterNpcScreenStatus() {
  const npc = getActiveMasterNpc();
  if (!npc) {
    if (elements.npcScreenTitle) {
      elements.npcScreenTitle.textContent = "Criar NPC";
    }
    if (elements.npcScreenStatus) {
      elements.npcScreenStatus.textContent = "Monte um registro completo de presença, aliado, inimigo ou criatura.";
    }
    if (elements.npcSheetToggleCombat) {
      elements.npcSheetToggleCombat.textContent = "Modo combate";
    }
    return;
  }

  const age = calculateAge(npc.birthdate);
  if (elements.npcScreenTitle) {
    elements.npcScreenTitle.textContent = npc.name?.trim() || "NPC sem nome";
  }
  if (elements.npcScreenStatus) {
    elements.npcScreenStatus.textContent = [
      npc.role || "Registro em construção",
      MASTER_NPC_RACE_LABELS[npc.race] || "Humano",
      npc.threatType || "Ameaça não classificada",
      age !== null ? `${age} anos` : "",
    ].filter(Boolean).join(" • ");
  }
  if (elements.npcSheetToggleCombat) {
    elements.npcSheetToggleCombat.textContent = masterNpcCombatMode ? "Voltar ao dossiê" : "Modo combate";
  }
}

function showMenuMasterNpcArchive() {
  if (!masterUnlocked) {
    showMasterLockView("Desbloqueie o modo mestre para acessar os NPCs.");
    return;
  }
  hideAllMenuViews();
  elements.menuMasterNpcView?.classList.remove("hidden");
  setActiveMenuButton(elements.menuMasterNpcList);
  renderMasterNpcList();
}

function openMasterNpcSheet(npcId, options = {}) {
  const { closeMenu = true } = options;
  const targetNpc = masterNpcs.find((npc) => npc.id === npcId) || null;
  if (!targetNpc) {
    return;
  }

  editingNpcId = targetNpc.id;
  try {
    setEditorMode("character");
  } catch (error) {
    console.error(error);
  }
  setView("npc");
  renderMasterNpcSheetSwitcher();
  renderMasterNpcEditor();
  updateMasterNpcScreenStatus();

  if (closeMenu) {
    closeModeMenu(true);
    showMenuHome();
  }
}

function buildArchiveCode(seed = "") {
  const raw = String(seed || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 8);

  return raw ? `ARQ-${raw}` : "ARQ-SINAL";
}

function getProfileOmenLine() {
  const origin = elements.origin?.value.trim() || "";
  const nexValue = clamp(readNumber(elements.nex?.value) ?? 5, 0, 100);
  const woundState = String(elements.wounds?.value || "").trim();
  const fragments = [];

  if (origin) {
    fragments.push(origin);
  }
  fragments.push(`Ruído ${nexValue}%`);

  if (woundState) {
    fragments.push(woundState);
  }

  return fragments.join(" // ") || "Sem ruído registrado";
}

function normalizeCharacterMeasure(value, unit = "") {
  const clean = String(value || "").trim().replace(/\s+/g, " ");
  if (!clean) {
    return "";
  }
  return unit && !clean.toLowerCase().includes(unit.toLowerCase()) ? `${clean} ${unit}` : clean;
}

function formatCharacterPhysicalLine(character = {}) {
  const heightValue = String(character.height || "").trim();
  const weightValue = String(character.weight || "").trim();
  return [heightValue ? `Altura ${heightValue}` : "", weightValue ? `Peso ${weightValue}` : ""]
    .filter(Boolean)
    .join(" • ") || "Sem medidas";
}

function renderProfileStaticSummary() {
  if (!elements.profileStaticSummary) {
    return;
  }

  const birthdate = elements.birthdate?.value || "";
  const age = calculateAge(birthdate);
  const classValue = elements.classSelect?.value || "";
  const trailValue = elements.trail?.value || "";
  const profileValue = [classValue, trailValue].filter(Boolean).join(" • ") || "-";
  const birthValue = birthdate
    ? `${formatDisplayDate(birthdate)}${age !== null ? ` • ${age}a` : ""}`
    : "-";
  const originValue = elements.origin?.value.trim() || "-";
  const heightValue = normalizeCharacterMeasure(elements.characterHeight?.value, "m") || "-";
  const weightValue = normalizeCharacterMeasure(elements.characterWeight?.value, "kg") || "-";
  const physicalLine = [heightValue !== "-" ? `Altura ${heightValue}` : "", weightValue !== "-" ? `Peso ${weightValue}` : ""]
    .filter(Boolean)
    .join(" • ") || "sem medidas";
  const nexValue = clamp(readNumber(elements.nex?.value) ?? 5, 0, 100);
  const woundState = String(elements.wounds?.value || "").trim();
  const summaryItems = [
    {
      label: "Nascimento",
      value: birthValue,
      note: "linha biográfica",
    },
    {
      label: "Procedência",
      value: originValue,
      note: physicalLine,
    },
    {
      label: "Classificação",
      value: profileValue,
      note: woundState ? `${woundState} • NEX ${nexValue}%` : `NEX ${nexValue}%`,
    },
  ];

  elements.profileStaticSummary.innerHTML = summaryItems
    .map((item) => `
      <article class="profile-static-card">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
        <small>${escapeHtml(item.note)}</small>
      </article>
    `)
    .join("");
}

function syncCharacterSheetActions() {
  const isViewer = characterSheetMode === "viewer";
  const isEditor = characterSheetMode === "editor";
  const canEditSavedCharacter = editorMode === "character" && Boolean(editingId);

  document.body.setAttribute("data-character-sheet-mode", editorMode === "master" ? "master" : characterSheetMode);

  if (elements.sheetEditToggle) {
    elements.sheetEditToggle.classList.toggle("hidden", !canEditSavedCharacter);
    elements.sheetEditToggle.classList.toggle("active", isEditor);
    elements.sheetEditToggle.title = isEditor ? "Voltar para visualização" : "Editar ficha";
    elements.sheetEditToggle.setAttribute("aria-label", isEditor ? "Voltar para visualização" : "Editar ficha");
  }

  if (elements.saveButton && editorMode === "character") {
    elements.saveButton.classList.toggle("hidden", isViewer);
    elements.saveButton.textContent = isEditor ? "Atualizar personagem" : "Salvar personagem";
  }

  if (elements.avatarCircle) {
    elements.avatarCircle.classList.toggle("read-only", isViewer);
  }
  if (elements.profileStaticSummary) {
    elements.profileStaticSummary.classList.toggle("hidden", !isViewer);
  }

  renderProfileStaticSummary();
  renderInventorySection();
}

function setCharacterSheetMode(mode = "builder") {
  const validModes = new Set(["builder", "viewer", "editor"]);
  characterSheetMode = validModes.has(mode) ? mode : "builder";
  try {
    syncCharacterSheetActions();
  } catch (error) {
    console.error(error);
  }
  try {
    renderSkills();
  } catch (error) {
    console.error(error);
  }
  try {
    renderInventory();
  } catch (error) {
    console.error(error);
  }
}

function toggleCharacterSheetEditMode() {
  if (editorMode !== "character" || !editingId) {
    return;
  }

  const nextMode = characterSheetMode === "editor" ? "viewer" : "editor";
  recordChangeHistory("Modo de edição", nextMode === "editor" ? "Ficha aberta para edição" : "Ficha voltou para visualização");
  setCharacterSheetMode(nextMode);
}

function ensureZipperAudioContext() {
  const AudioContextRef = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextRef) {
    return null;
  }

  if (!zipperAudioContext) {
    zipperAudioContext = new AudioContextRef();
  }

  return zipperAudioContext;
}

function playInventoryToggleSound(opening) {
  const context = ensureZipperAudioContext();
  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    void context.resume();
  }

  const start = context.currentTime;
  const steps = 6;
  for (let index = 0; index < steps; index += 1) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const base = opening ? 180 : 360;
    const direction = opening ? 38 : -34;
    const time = start + index * 0.018;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(base + (index * direction), time);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(60, base + ((index + 1) * direction)), time + 0.03);

    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.exponentialRampToValueAtTime(0.028, time + 0.004);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.04);
  }
}

function renderInventorySection() {
  if (!elements.inventoryToggle || !elements.inventoryPanel) {
    return;
  }

  const isOpen = inventoryPanelOpen;
  elements.inventoryToggle.classList.toggle("active", isOpen);
  elements.inventoryToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  elements.inventoryPanel.classList.toggle("hidden", !isOpen);
}

function toggleInventoryPanel() {
  inventoryPanelOpen = !inventoryPanelOpen;
  if (!inventoryPanelOpen) {
    selectedInventoryIndex = -1;
    renderInventory();
  }
  renderInventorySection();
  playInventoryToggleSound(inventoryPanelOpen);
}

function showMenuHome() {
  hideAllMenuViews();
  updateMasterMenuOptions();
  elements.menuHomeView?.classList.remove("hidden");
  if (elements.menuCharacterSearch) {
    elements.menuCharacterSearch.value = "";
  }
  setActiveMenuButton(elements.menuCreate);
  restoreMenuButtonLabels();
  renderCharacterList();
  syncMenuBrandDisplay(getMenuBrandRestingText());
  refreshMenuStatusButtonsCache();
}

function syncMenuBrandDisplay(text = MENU_BRAND_BASE_TEXT) {
  if (!elements.menuBrand) {
    return;
  }

  elements.menuBrand.textContent = text;
  elements.menuBrand.dataset.glitchText = text;
}

function getDaysUntilMenuEvent(now = new Date()) {
  const target = getMenuCountdownTarget(now);
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

function getMenuEventState(now = new Date()) {
  const daysUntil = getDaysUntilMenuEvent(now);
  const enabled = menuEventSettings?.enabled !== false;
  const forced = Boolean(menuEventSettings?.forceActive);
  const collapseActive = enabled && (forced || daysUntil <= 30);
  return {
    enabled,
    forced,
    daysUntil,
    collapseActive,
  };
}

function getMenuBrandRestingText() {
  const state = getMenuEventState();
  if (!state.collapseActive) {
    return MENU_BRAND_BASE_TEXT;
  }

  const frames = getMenuBrandFrames();
  const alt = frames[randomMenuBrandInt(0, frames.length - 1)] || MENU_BRAND_BASE_TEXT;
  return Math.random() < 0.5
    ? blendMenuBrandFrames(MENU_BRAND_BASE_TEXT, alt)
    : corruptMenuBrandText(alt).slice(0, Math.max(MENU_BRAND_BASE_TEXT.length, alt.length));
}

function setMenuEventFeedback(message, isError = false) {
  if (!elements.menuEventFeedback) {
    return;
  }

  elements.menuEventFeedback.textContent = message || "";
  elements.menuEventFeedback.classList.toggle("error", Boolean(message) && isError);
  elements.menuEventFeedback.classList.toggle("success", Boolean(message) && !isError);
}

function buildMenuEventSettingsFromControls() {
  return normalizeMenuEventSettings({
    enabled: elements.menuEventEnabled?.checked,
    forceActive: elements.menuEventForce?.checked,
    customFramesText: elements.menuEventFrames?.value || "",
    updatedAt: new Date().toISOString(),
  });
}

function getMenuEventSettingsStatusText(settings = menuEventSettings) {
  const state = getMenuEventState();
  if (settings?.enabled === false) {
    return "Evento automático desativado.";
  }
  if (settings?.forceActive) {
    return "Colapso forçado agora. O menu já fica instável para todos.";
  }
  if (state.daysUntil <= 30) {
    return `Fase crítica ativa. Faltam ${state.daysUntil} dias para 9 de novembro.`;
  }
  return `Evento automático ativo. Intensifica quando faltarem 30 dias. Agora faltam ${state.daysUntil} dias.`;
}

function renderMenuEventSettingsControls() {
  if (elements.menuEventEnabled) {
    elements.menuEventEnabled.checked = menuEventSettings.enabled !== false;
  }
  if (elements.menuEventForce) {
    elements.menuEventForce.checked = Boolean(menuEventSettings.forceActive);
  }
  if (elements.menuEventFrames) {
    elements.menuEventFrames.value = Array.isArray(menuEventSettings.customFrames)
      ? menuEventSettings.customFrames.join("\n")
      : "";
  }
  setMenuEventFeedback(getMenuEventSettingsStatusText(menuEventSettings), false);
}

function applyMenuEventSettings(nextSettings, options = {}) {
  menuEventSettings = normalizeMenuEventSettings(nextSettings);

  if (options.persistLocal) {
    saveMenuEventSettings(menuEventSettings);
  }

  renderMenuEventSettingsControls();
  restoreMenuButtonLabels();
  syncMenuBrandDisplay(getMenuBrandRestingText());
  syncMenuCountdownDisplay(formatMenuCountdown());
  refreshMenuAmbientEffects(true);
}

async function syncMenuEventSettingsToFirebase(settings) {
  if (!firebaseReady || !firebaseDatabaseRef) {
    return false;
  }

  try {
    const user = await ensureFirebaseAuth();
    await firebaseDatabaseRef.ref("global/menuEventSettings").set({
      ...normalizeMenuEventSettings(settings),
      updatedBy: user.uid,
    });
    return true;
  } catch {
    return false;
  }
}

function detachMenuEventSettingsListener() {
  if (menuEventSettingsListenerRef) {
    menuEventSettingsListenerRef.off();
    menuEventSettingsListenerRef = null;
  }
}

function refreshMenuEventSettingsSubscription() {
  if (!firebaseReady || !firebaseDatabaseRef || !firebaseUser) {
    detachMenuEventSettingsListener();
    return;
  }

  if (menuEventSettingsListenerRef) {
    return;
  }

  menuEventSettingsListenerRef = firebaseDatabaseRef.ref("global/menuEventSettings");
  menuEventSettingsListenerRef.on("value", (snapshot) => {
    const remoteSettings = snapshot.val();
    if (!remoteSettings || typeof remoteSettings !== "object") {
      return;
    }
    applyMenuEventSettings(remoteSettings, { persistLocal: true });
  });
}

async function handleMenuEventSettingsSave() {
  const nextSettings = buildMenuEventSettingsFromControls();
  applyMenuEventSettings(nextSettings, { persistLocal: true });
  const remoteSynced = await syncMenuEventSettingsToFirebase(nextSettings);
  setMenuEventFeedback(
    remoteSynced
      ? `${getMenuEventSettingsStatusText(nextSettings)} Sincronizado para todos.`
      : getMenuEventSettingsStatusText(nextSettings),
    false
  );
}

async function handleMenuEventSettingsReset() {
  const nextSettings = {
    ...DEFAULT_MENU_EVENT_SETTINGS,
    updatedAt: new Date().toISOString(),
  };
  applyMenuEventSettings(nextSettings, { persistLocal: true });
  const remoteSynced = await syncMenuEventSettingsToFirebase(nextSettings);
  setMenuEventFeedback(
    remoteSynced
      ? "Evento restaurado para o padrão e sincronizado para todos."
      : "Evento restaurado para o padrão.",
    false
  );
}

function randomMenuBrandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickMenuBrandGlyph() {
  return MENU_BRAND_GLITCH_GLYPHS[randomMenuBrandInt(0, MENU_BRAND_GLITCH_GLYPHS.length - 1)];
}

function buildMenuBrandNoise(length = MENU_BRAND_BASE_TEXT.length) {
  return Array.from({ length }, () => pickMenuBrandGlyph()).join("");
}

function corruptMenuBrandText(text) {
  return Array.from(text).map((char) => {
    if (char === " ") {
      return Math.random() < 0.24 ? " " : pickMenuBrandGlyph();
    }
    return Math.random() < 0.42 ? pickMenuBrandGlyph() : char;
  }).join("");
}

function blendMenuBrandFrames(base, alt) {
  const targetLength = Math.max(base.length, alt.length);
  const baseChars = base.padEnd(targetLength, " ").split("");
  const altChars = alt.padEnd(targetLength, " ").split("");
  return baseChars.map((char, index) => {
    const altChar = altChars[index];
    const roll = Math.random();
    if (roll < 0.28) {
      return pickMenuBrandGlyph();
    }
    if (roll < 0.62) {
      return altChar;
    }
    return char;
  }).join("").trim();
}

function getMenuBrandFrames() {
  const customFrames = Array.isArray(menuEventSettings?.customFrames)
    ? menuEventSettings.customFrames
        .map((frame) => String(frame || "").trim())
        .filter(Boolean)
        .slice(0, 20)
        .map((frame) => frame.toUpperCase().slice(0, 24))
    : [];
  const savedNames = [...characters]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((character) => String(character?.name || "").trim())
    .filter(Boolean)
    .filter((name, index, list) => list.findIndex((item) => normalize(item) === normalize(name)) === index)
    .slice(0, 6)
    .map((name) => name.toUpperCase().slice(0, 18));

  return [...customFrames, ...MENU_BRAND_GLITCH_FRAMES, ...savedNames];
}

function getPrimaryMenuButtons() {
  return [
    elements.menuCreate,
    elements.menuAccess,
    elements.menuRooms,
    elements.menuMaster,
    elements.menuDiary,
  ].filter(Boolean);
}

function getMenuStatusButtons() {
  if (!menuStatusButtonsCache.length) {
    refreshMenuStatusButtonsCache();
  }
  menuStatusButtonsCache = menuStatusButtonsCache.filter((button) => button?.isConnected);
  return menuStatusButtonsCache;
}

function getMenuCollapseButtons() {
  return getMenuStatusButtons().filter((button) => !button.classList.contains("hidden"));
}

function getSelectedMenuStatusButtons() {
  return getMenuStatusButtons().filter(
    (button) => button.classList.contains("active") && !button.classList.contains("hidden")
  );
}

function primeMenuButtonLabel(button) {
  if (!button) {
    return "";
  }

  const base = (button.dataset.labelBase || button.textContent || "").trim();
  button.dataset.labelBase = base;
  return base;
}

function restoreMenuButtonLabels() {
  getMenuCollapseButtons().forEach((button) => {
    const base = primeMenuButtonLabel(button);
    if (base) {
      button.textContent = base;
    }
  });
}

function buildMenuButtonFrame(baseLabel = "") {
  const frames = getMenuBrandFrames();
  const targetFrame = frames[randomMenuBrandInt(0, frames.length - 1)] || baseLabel || MENU_BRAND_BASE_TEXT;
  const normalizedTarget = targetFrame.toUpperCase().slice(0, 22);
  return Math.random() < 0.5
    ? normalizedTarget
    : corruptMenuBrandText(normalizedTarget);
}

function primeMenuStatusBase(button) {
  if (!button || !button.dataset.statusText) {
    return "";
  }

  const base = (button.dataset.statusBase || button.dataset.statusText.replace(/\.+$/u, "")).trim();
  button.dataset.statusBase = base;
  return base;
}

function updateMenuButtonStatusTexts(step = 0) {
  const dotFrames = ["", ".", "..", "...", "..", "."];
  const dots = dotFrames[step % dotFrames.length];
  const selectedButtons = new Set(getSelectedMenuStatusButtons());

  getMenuStatusButtons().forEach((button) => {
    if (button.classList.contains("is-glitching")) {
      return;
    }
    const base = primeMenuStatusBase(button);
    if (!base) {
      return;
    }
    button.dataset.statusText = selectedButtons.has(button) ? `${base}${dots}` : "";
  });
}

function startMenuButtonStatusLoop() {
  if (!shouldRunMenuAmbientEffects()) {
    return;
  }

  if (menuButtonStatusTimer) {
    return;
  }

  updateMenuButtonStatusTexts(menuButtonStatusFrame);
  menuButtonStatusTimer = window.setInterval(() => {
    if (!shouldRunMenuAmbientEffects()) {
      stopMenuAmbientEffects();
      return;
    }
    menuButtonStatusFrame += 1;
    updateMenuButtonStatusTexts(menuButtonStatusFrame);
  }, 420);
}

function markMenuButtonsInteraction() {
  menuButtonLastInteractionAt = Date.now();
  if (!menuButtonGlitchRunning) {
    updateMenuButtonStatusTexts(menuButtonStatusFrame);
  }
}

function isMenuButtonsIdleEnough() {
  return Date.now() - menuButtonLastInteractionAt >= 5400;
}

function scheduleMenuButtonsGlitch() {
  if (!shouldRunMenuAmbientEffects()) {
    return;
  }

  if (menuButtonGlitchTimer) {
    window.clearTimeout(menuButtonGlitchTimer);
  }

  const eventState = getMenuEventState();
  menuButtonGlitchTimer = window.setTimeout(() => {
    void runMenuButtonsGlitchBurst();
  }, eventState.collapseActive
    ? randomMenuBrandInt(2200, 4800)
    : randomMenuBrandInt(9000, 18000));
}

async function runMenuButtonsGlitchBurst() {
  const eventState = getMenuEventState();
  const buttons = eventState.collapseActive
    ? getMenuCollapseButtons()
    : getSelectedMenuStatusButtons();
  if (!buttons.length) {
    updateMenuButtonStatusTexts(menuButtonStatusFrame);
    scheduleMenuButtonsGlitch();
    return;
  }

  if (menuButtonGlitchRunning) {
    scheduleMenuButtonsGlitch();
    return;
  }

  if (!shouldRunMenuAmbientEffects()) {
    scheduleMenuButtonsGlitch();
    return;
  }

  if (!isMenuButtonsIdleEnough()) {
    scheduleMenuButtonsGlitch();
    return;
  }

  menuButtonGlitchRunning = true;
  buttons.forEach((button) => button.classList.add("is-glitching"));
  const phases = [
    buttons.map((button) => {
      const base = primeMenuStatusBase(button) || "status";
      return buildMenuBrandNoise(Math.max(4, Math.min(base.length, 10))).slice(0, Math.max(4, Math.min(base.length, 10)));
    }),
    buttons.map((button) => {
      const base = primeMenuStatusBase(button) || "status";
      const length = Math.max(4, Math.min(base.length, 10));
      return corruptMenuBrandText(buildMenuBrandNoise(length)).slice(0, length);
    }),
    buttons.map((button) => {
      const base = primeMenuStatusBase(button) || "status";
      return buildMenuBrandNoise(Math.max(4, Math.min(base.length, 10))).slice(0, Math.max(4, Math.min(base.length, 10)));
    }),
  ];
  if (eventState.collapseActive) {
    const buttonPhases = [
      buttons.map((button) => buildMenuButtonFrame(primeMenuButtonLabel(button))),
      buttons.map((button) => corruptMenuBrandText(buildMenuButtonFrame(primeMenuButtonLabel(button))).slice(0, 22)),
      buttons.map((button) => buildMenuButtonFrame(primeMenuButtonLabel(button))),
    ];

    for (const phase of buttonPhases) {
      buttons.forEach((button, index) => {
        button.textContent = phase[index] || primeMenuButtonLabel(button);
        button.dataset.statusText = phase[index] || "";
      });
      await wait(randomMenuBrandInt(86, 160));
    }

    restoreMenuButtonLabels();
    buttons.forEach((button) => {
      button.classList.remove("is-glitching");
    });
    menuButtonGlitchRunning = false;
    updateMenuButtonStatusTexts(menuButtonStatusFrame);
    scheduleMenuButtonsGlitch();
    return;
  }

  for (const phase of phases) {
    buttons.forEach((button, index) => {
      button.dataset.statusText = phase[index] || "";
    });
    await wait(randomMenuBrandInt(72, 130));
  }

  buttons.forEach((button) => {
    button.classList.remove("is-glitching");
  });
  restoreMenuButtonLabels();
  menuButtonGlitchRunning = false;
  updateMenuButtonStatusTexts(menuButtonStatusFrame);
  scheduleMenuButtonsGlitch();
}

function startMenuButtonsGlitchLoop() {
  if (!shouldRunMenuAmbientEffects()) {
    return;
  }
  markMenuButtonsInteraction();
  scheduleMenuButtonsGlitch();
}

function scheduleMenuBrandGlitch() {
  if (!shouldRunMenuAmbientEffects()) {
    return;
  }

  if (menuBrandGlitchTimer) {
    window.clearTimeout(menuBrandGlitchTimer);
  }

  const eventState = getMenuEventState();
  menuBrandGlitchTimer = window.setTimeout(() => {
    void runMenuBrandGlitchBurst();
  }, eventState.collapseActive
    ? randomMenuBrandInt(320, 820)
    : randomMenuBrandInt(2600, 5400));
}

async function runMenuBrandGlitchBurst() {
  if (!elements.menuBrand) {
    return;
  }

  if (menuBrandGlitchRunning) {
    scheduleMenuBrandGlitch();
    return;
  }

  if (!shouldRunMenuAmbientEffects()) {
    syncMenuBrandDisplay(getMenuBrandRestingText());
    scheduleMenuBrandGlitch();
    return;
  }

  menuBrandGlitchRunning = true;
  const eventState = getMenuEventState();
  const glitchFrames = getMenuBrandFrames();
  const ghostFrame = glitchFrames[randomMenuBrandInt(0, glitchFrames.length - 1)];
  const frames = [
    buildMenuBrandNoise(randomMenuBrandInt(7, 12)),
    corruptMenuBrandText(ghostFrame),
    ghostFrame,
    buildMenuBrandNoise(randomMenuBrandInt(6, 10)),
    blendMenuBrandFrames(MENU_BRAND_BASE_TEXT, ghostFrame),
    corruptMenuBrandText(MENU_BRAND_BASE_TEXT),
  ];
  if (eventState.collapseActive) {
    frames.push(
      corruptMenuBrandText(ghostFrame),
      buildMenuBrandNoise(randomMenuBrandInt(8, 14)),
      blendMenuBrandFrames(ghostFrame, MENU_BRAND_BASE_TEXT),
    );
  }
  frames.push(eventState.collapseActive ? getMenuBrandRestingText() : MENU_BRAND_BASE_TEXT);

  elements.menuBrand.classList.add("is-glitching");

  for (const frame of frames) {
    syncMenuBrandDisplay(frame);
    await wait(randomMenuBrandInt(48, 96));
  }

  syncMenuBrandDisplay(eventState.collapseActive ? getMenuBrandRestingText() : MENU_BRAND_BASE_TEXT);
  await wait(eventState.collapseActive ? 70 : 120);
  elements.menuBrand.classList.remove("is-glitching");
  menuBrandGlitchRunning = false;
  scheduleMenuBrandGlitch();
}

function startMenuBrandGlitchLoop() {
  if (!elements.menuBrand || !shouldRunMenuAmbientEffects()) {
    return;
  }

  if (menuBrandGlitchTimer) {
    return;
  }

  syncMenuBrandDisplay(getMenuBrandRestingText());
  elements.menuBrand.classList.remove("is-glitching");
  scheduleMenuBrandGlitch();
}

function getMenuCountdownTarget(now = new Date()) {
  const year = now.getFullYear();
  const target = new Date(year, 10, 9, 0, 0, 0, 0);
  if (now.getTime() < target.getTime()) {
    return target;
  }
  return new Date(year + 1, 10, 9, 0, 0, 0, 0);
}

function padMenuCountdownPart(value, size = 2) {
  return String(Math.max(0, value)).padStart(size, "0");
}

function formatMenuCountdown(now = new Date()) {
  const target = getMenuCountdownTarget(now);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${padMenuCountdownPart(days, 3)}:${padMenuCountdownPart(hours)}:${padMenuCountdownPart(minutes)}:${padMenuCountdownPart(seconds)}`;
}

function syncMenuCountdownDisplay(text = formatMenuCountdown()) {
  if (!elements.menuCountdown) {
    return;
  }

  elements.menuCountdown.textContent = text;
}

function buildCorruptedMenuCountdown(text) {
  const digits = String(text || "").split("");
  const digitIndexes = digits
    .map((char, index) => ({ char, index }))
    .filter((entry) => /\d/.test(entry.char))
    .map((entry) => entry.index);

  if (!digitIndexes.length) {
    return text;
  }

  const replacements = Math.max(1, Math.min(3, randomMenuBrandInt(1, 2)));
  for (let count = 0; count < replacements; count += 1) {
    const targetIndex = digitIndexes[randomMenuBrandInt(0, digitIndexes.length - 1)];
    digits[targetIndex] = String(randomMenuBrandInt(0, 9));
  }

  return digits.join("");
}

function maybeGlitchMenuCountdown() {
  if (!elements.menuCountdown || menuCountdownGlitchRunning || !shouldRunMenuAmbientEffects()) {
    return;
  }

  const eventState = getMenuEventState();
  if (Math.random() >= (eventState.collapseActive ? 0.22 : 0.08)) {
    return;
  }

  const baseText = formatMenuCountdown();
  menuCountdownGlitchRunning = true;
  elements.menuCountdown.classList.add("is-glitching");
  syncMenuCountdownDisplay(buildCorruptedMenuCountdown(baseText));

  if (menuCountdownGlitchTimer) {
    window.clearTimeout(menuCountdownGlitchTimer);
  }

  menuCountdownGlitchTimer = window.setTimeout(() => {
    syncMenuCountdownDisplay(formatMenuCountdown());
    elements.menuCountdown?.classList.remove("is-glitching");
    menuCountdownGlitchRunning = false;
    menuCountdownGlitchTimer = null;
  }, eventState.collapseActive
    ? randomMenuBrandInt(170, 320)
    : randomMenuBrandInt(120, 220));
}

function startMenuCountdownLoop() {
  if (!elements.menuCountdown || !shouldRunMenuAmbientEffects()) {
    return;
  }

  if (menuCountdownTimer) {
    return;
  }

  syncMenuCountdownDisplay(formatMenuCountdown());
  elements.menuCountdown.classList.remove("is-glitching");
  menuCountdownGlitchRunning = false;

  menuCountdownTimer = window.setInterval(() => {
    if (!shouldRunMenuAmbientEffects()) {
      stopMenuAmbientEffects();
      return;
    }
    if (!menuCountdownGlitchRunning) {
      syncMenuCountdownDisplay(formatMenuCountdown());
    }
    maybeGlitchMenuCountdown();
  }, 1000);
}

function getCharacterArchiveStatus(character) {
  const woundState = String(character?.wounds || "").trim();
  if (woundState === "Morto") {
    return {
      label: "Morto",
      className: "dead",
    };
  }

  return {
    label: "Vivo",
    className: "alive",
  };
}

function showMenuAccess() {
  hideAllMenuViews();
  elements.menuAccessView?.classList.remove("hidden");
  if (elements.menuCharacterSearch) {
    elements.menuCharacterSearch.value = "";
  }
  setActiveMenuButton(elements.menuAccess);
  animateMenuAccessView();
  renderCharacterList();
  elements.menuCharacterSearch?.focus();
}

function getActiveCharacterForOnline() {
  const preferredId = onlineCharacterId
    || (editorMode === "character" ? editingId : "")
    || "";
  if (!preferredId) {
    return null;
  }

  if (editorMode === "character" && editingId === preferredId) {
    const fromForm = readFormData({ validateRequired: false });
    if (fromForm && fromForm.id === preferredId) {
      return fromForm;
    }
  }

  return characters.find((item) => item.id === preferredId) || null;
}

function ensureOnlineCharacterSelection() {
  const availableIds = new Set(characters.map((character) => character.id));
  if (onlineCharacterId && availableIds.has(onlineCharacterId)) {
    return characters.find((item) => item.id === onlineCharacterId) || null;
  }

  if (editorMode === "character" && editingId && availableIds.has(editingId)) {
    onlineCharacterId = editingId;
    return characters.find((item) => item.id === editingId) || null;
  }

  const fallback = [...characters]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))[0]
    || null;
  onlineCharacterId = fallback?.id || "";
  return fallback;
}

function setPreferredOnlineCharacterId(characterId, options = {}) {
  const { force = false } = options;
  if (!characterId) {
    return;
  }
  if (force || !currentRoomId || !onlineCharacterId) {
    onlineCharacterId = characterId;
  }
}

function ensureCharacterAutoMasterShareData(character, existingCharacter = null) {
  if (!character || typeof character !== "object") {
    return character;
  }

  const nextShareId = String(
    character.masterShareId
    || existingCharacter?.masterShareId
    || ""
  ).trim() || generateId();
  const nextSharedAt = String(
    character.masterSharedAt
    || existingCharacter?.masterSharedAt
    || character.updatedAt
    || existingCharacter?.updatedAt
    || ""
  ).trim() || new Date().toISOString();

  return {
    ...character,
    masterShareId: nextShareId,
    masterSharedAt: nextSharedAt,
  };
}

function bootstrapAutomaticMasterShares() {
  if (!firebaseReady || !firebaseDatabaseRef || !firebaseUser?.uid || autoMasterShareBootstrapUid === firebaseUser.uid) {
    return;
  }

  let mutated = false;
  const syncTargets = [];

  characters = characters
    .map((entry) => migrateCharacter(entry))
    .filter((entry) => entry !== null)
    .map((entry) => {
      if (entry.masterShareId) {
        const existingShare = masterShares.find((item) => item.shareId === entry.masterShareId);
        if (!existingShare?.ownerUid) {
          syncTargets.push(entry);
        }
        return entry;
      }
      mutated = true;
      const nextCharacter = ensureCharacterAutoMasterShareData(entry, entry);
      syncTargets.push(nextCharacter);
      return nextCharacter;
    });

  if (mutated) {
    saveCharacters(characters);
    renderCharacterList();
    updateCurrentShareActions();
  }

  syncTargets.forEach((character) => {
    syncCharacterToMaster(character);
  });

  autoMasterShareBootstrapUid = firebaseUser.uid;
}

function withMissionConnectionState(character, connected) {
  if (!character || typeof character !== "object") {
    return null;
  }

  return {
    ...character,
    ui: {
      ...(character.ui || {}),
      inAction: Boolean(connected),
    },
  };
}

function persistLocalMissionConnectionState(characterId, connected) {
  if (!characterId) {
    return null;
  }

  const index = characters.findIndex((item) => item.id === characterId);
  if (index === -1) {
    return null;
  }

  const liveEditorCharacter = editorMode === "character" && editingId === characterId
    ? readFormData({ validateRequired: false })
    : null;
  const baseCharacter = liveEditorCharacter || characters[index];
  const updatedCharacter = withMissionConnectionState(baseCharacter, connected);

  if (!updatedCharacter) {
    return null;
  }

  if (connected && !updatedCharacter.masterShareId) {
    updatedCharacter.masterShareId = generateId();
    updatedCharacter.masterSharedAt = new Date().toISOString();
  }

  updatedCharacter.updatedAt = new Date().toISOString();
  characters[index] = updatedCharacter;
  saveCharacters(characters);

  if (editingId === characterId) {
    setInAction(Boolean(connected));
  }

  renderCharacterList();
  highlightCurrentCard();
  updateCurrentShareActions();
  renderSheetMetaPanels();
  syncCharacterToMaster(updatedCharacter);
  return updatedCharacter;
}

function showMenuRooms() {
  hideAllMenuViews();
  elements.menuRoomsView?.classList.remove("hidden");
  setActiveMenuButton(elements.menuRooms);
  refreshMissionSubscriptions();
  renderRoomsView();
  if (masterUnlocked) {
    window.setTimeout(() => {
      if (missionCreatorExpanded) {
        elements.missionTitle?.focus();
      } else {
        (elements.roomCode || elements.missionCreateStart)?.focus();
      }
    }, 0);
  } else {
    window.setTimeout(() => (elements.roomCode || elements.missionsOpenMaster)?.focus(), 0);
  }
}

function showMenuDiary() {
  hideAllMenuViews();
  elements.menuDiaryView?.classList.remove("hidden");
  setActiveMenuButton(elements.menuDiary);
  campaignDiary = loadCampaignDiary();
  const sessions = getDiarySessions();
  if (!sessions.some((session) => session.id === selectedDiarySessionId)) {
    selectedDiarySessionId = sessions[0]?.id || null;
  }
  diaryEditorSessionId = null;
  diaryEditorDraft = null;
  renderCampaignDiary();
  elements.diarySearch?.focus();
}

function renderCampaignDiary() {
  if (!elements.campaignDiaryList || !elements.campaignDiaryDetail) {
    return;
  }

  renderCampaignDiaryList();
  renderCampaignDiaryDetail();
}

function getDiarySessions() {
  return Array.isArray(campaignDiary?.sessions) ? campaignDiary.sessions : [];
}

function getFilteredDiarySessions() {
  const filter = normalize(elements.diarySearch?.value || "");
  return [...getDiarySessions()]
    .filter((session) => {
      if (!filter) {
        return true;
      }

      const attachmentsLabel = Array.isArray(session.attachments)
        ? session.attachments.map((attachment) => attachment.name || "").join(" ")
        : "";
      const linkedCharactersLabel = getDiaryLinkedCharacterNames(session.linkedCharacterIds).join(" ");
      const haystack = normalize(`${session.title} ${session.summary} ${session.details} ${attachmentsLabel} ${linkedCharactersLabel}`);
      return haystack.includes(filter);
    })
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

function getDiarySessionById(sessionId) {
  return getDiarySessions().find((session) => session.id === sessionId) || null;
}

function createDiaryEditorDraft(session = null) {
  const sequence = session?.sequence || getNextDiarySessionSequence();
  return {
    id: session?.id || "",
    sequence,
    title: session?.title || formatDiarySessionTitle(sequence),
    summary: session?.summary || "",
    details: session?.details || "",
    linkedCharacterIds: Array.isArray(session?.linkedCharacterIds) ? [...session.linkedCharacterIds] : [],
    attachments: Array.isArray(session?.attachments)
      ? session.attachments.map((attachment) => normalizeDiaryAttachment(attachment)).filter((attachment) => attachment)
      : [],
  };
}

function normalizeDiaryAttachment(attachment) {
  if (!attachment || typeof attachment !== "object") {
    return null;
  }

  const dataUrl = typeof attachment.dataUrl === "string" ? attachment.dataUrl : "";
  if (!dataUrl) {
    return null;
  }

  const parsedSize = Number.parseInt(String(attachment.size ?? "0"), 10);
  return {
    id: typeof attachment.id === "string" && attachment.id ? attachment.id : generateId(),
    name: typeof attachment.name === "string" && attachment.name ? attachment.name : "Anexo",
    type: typeof attachment.type === "string" ? attachment.type : "",
    size: Number.isNaN(parsedSize) ? 0 : Math.max(0, parsedSize),
    dataUrl,
  };
}

function formatFileSize(bytes) {
  const size = Number(bytes) || 0;
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (size >= 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${size} B`;
}

function getDiaryImageAttachments(attachments = []) {
  return (Array.isArray(attachments) ? attachments : [])
    .map((attachment) => normalizeDiaryAttachment(attachment))
    .filter((attachment) => attachment && attachment.type.startsWith("image/"));
}

function getDiaryStoryPanels(session) {
  const summary = String(session?.summary || "").trim();
  const details = String(session?.details || "").replace(/\r/g, "").trim();
  const detailBlocks = details
    ? details.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)
    : [];

  const rawPanels = [];
  if (summary) {
    rawPanels.push({
      highlight: true,
      title: "Resumo rapido",
      text: summary,
    });
  }

  detailBlocks.forEach((block) => {
    if (!block || (summary && block === summary)) {
      return;
    }

    rawPanels.push({
      highlight: false,
      title: "Cena",
      text: block,
    });
  });

  if (!rawPanels.length) {
    return [{
      highlight: true,
      title: "Registro",
      text: "Nenhum detalhe registrado ainda.",
    }];
  }

  if (rawPanels.length > 4) {
    const compactPanels = rawPanels.slice(0, 3);
    compactPanels.push({
      highlight: false,
      title: "Continua",
      text: rawPanels.slice(3).map((panel) => panel.text).join("\n\n"),
    });
    return compactPanels;
  }

  return rawPanels;
}

function renderDiaryAttachmentsMarkup(attachments, editable = false) {
  const normalizedAttachments = Array.isArray(attachments)
    ? attachments.map((attachment) => normalizeDiaryAttachment(attachment)).filter((attachment) => attachment)
    : [];

  if (normalizedAttachments.length === 0) {
    return editable
      ? '<p class="empty-state">Nenhum anexo ainda. Adicione pistas, imagens, PDFs ou relatórios.</p>'
      : '<p class="empty-state">Nenhum anexo registrado nesta sessão.</p>';
  }

  return `
    <div class="diary-attachments-grid">
      ${normalizedAttachments
        .map((attachment) => {
          const isImage = attachment.type.startsWith("image/");
          return `
            <article class="diary-attachment-card">
              <div class="diary-attachment-preview${isImage ? " image" : ""}">
                ${isImage
                  ? `<img src="${escapeHtml(attachment.dataUrl)}" alt="${escapeHtml(attachment.name)}">`
                  : `<span>${escapeHtml((attachment.type || "arquivo").split("/").pop()?.toUpperCase() || "ARQ")}</span>`}
              </div>
              <div class="diary-attachment-copy">
                <strong>${escapeHtml(attachment.name)}</strong>
                <p>${escapeHtml(attachment.type || "Arquivo")} • ${escapeHtml(formatFileSize(attachment.size))}</p>
              </div>
              <div class="inline-actions">
                <a class="menu-open-btn diary-attachment-open" href="${escapeHtml(attachment.dataUrl)}" target="_blank" rel="noopener">Abrir</a>
                ${editable
                  ? `<button type="button" class="menu-delete-btn" data-diary-detail-action="remove-attachment" data-attachment-id="${escapeHtml(attachment.id)}">Excluir</button>`
                  : ""}
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function getDiaryLinkedCharacterNames(linkedCharacterIds = []) {
  const safeIds = Array.isArray(linkedCharacterIds) ? linkedCharacterIds : [];
  return safeIds
    .map((characterId) => characters.find((character) => character.id === characterId)?.name || "")
    .filter(Boolean);
}

function renderDiaryCharacterLinksMarkup(linkedCharacterIds = []) {
  const names = getDiaryLinkedCharacterNames(linkedCharacterIds);
  if (!names.length) {
    return '<p class="empty-state">Nenhum registro vinculado a esta sessão.</p>';
  }

  return `
    <div class="diary-character-links">
      ${names.map((name) => `<span class="diary-character-pill">${escapeHtml(name)}</span>`).join("")}
    </div>
  `;
}

function renderDiaryCharacterSelectorMarkup(linkedCharacterIds = []) {
  if (!characters.length) {
    return '<p class="empty-state">Salve ao menos um personagem para vincular registros à sessão.</p>';
  }

  const selected = new Set(Array.isArray(linkedCharacterIds) ? linkedCharacterIds : []);
  return `
    <div class="diary-character-selector">
      ${characters
        .map((character) => `
          <label class="diary-character-option">
            <input
              type="checkbox"
              data-diary-character-toggle="true"
              value="${escapeHtml(character.id)}"
              ${selected.has(character.id) ? "checked" : ""}
            >
            <span>${escapeHtml(character.name || "Personagem")}</span>
          </label>
        `)
        .join("")}
    </div>
  `;
}

function syncDiaryDraftFromEditorFields() {
  if (!diaryEditorDraft) {
    return;
  }

  const titleInput = document.getElementById("diary-session-title");
  const summaryInput = document.getElementById("diary-session-summary");
  const detailsInput = document.getElementById("diary-session-details");
  const selectedCharacters = Array.from(
    document.querySelectorAll('input[data-diary-character-toggle="true"]:checked')
  )
    .map((input) => input instanceof HTMLInputElement ? input.value : "")
    .filter(Boolean);

  if (titleInput instanceof HTMLInputElement) {
    diaryEditorDraft.title = titleInput.value;
  }
  if (summaryInput instanceof HTMLTextAreaElement) {
    diaryEditorDraft.summary = summaryInput.value;
  }
  if (detailsInput instanceof HTMLTextAreaElement) {
    diaryEditorDraft.details = detailsInput.value;
  }
  diaryEditorDraft.linkedCharacterIds = selectedCharacters;
}

function formatDiarySessionTitle(sequence) {
  return `Sessao ${String(sequence).padStart(2, "0")}`;
}

function parseDiarySessionSequence(title) {
  const match = String(title || "").match(/sessao\s*(\d+)/i);
  if (!match) {
    return 0;
  }

  const parsed = Number.parseInt(match[1], 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getNextDiarySessionSequence() {
  return getDiarySessions().reduce((highest, session) => {
    const parsedSequence = Number.isFinite(session?.sequence)
      ? session.sequence
      : parseDiarySessionSequence(session?.title);
    return Math.max(highest, parsedSequence || 0);
  }, 0) + 1;
}

function renderCampaignDiaryList() {
  elements.campaignDiaryList.innerHTML = "";

  const filtered = getFilteredDiarySessions();

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "diary-session-empty";

    const title = document.createElement("h3");
    title.textContent = getDiarySessions().length === 0 ? "Nenhuma sessao criada" : "Nenhuma sessao encontrada";

    const text = document.createElement("p");
    text.textContent = getDiarySessions().length === 0
      ? "Crie a primeira sessao para registrar o que aconteceu na campanha."
      : "Tente ajustar a busca ou crie uma nova sessao.";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.dataset.diaryAction = getDiarySessions().length === 0 ? "create" : "clear-search";
    button.textContent = getDiarySessions().length === 0 ? "Criar Sessao" : "Limpar Busca";

    empty.appendChild(title);
    empty.appendChild(text);
    empty.appendChild(button);
    elements.campaignDiaryList.appendChild(empty);
    return;
  }

  if (!filtered.some((session) => session.id === selectedDiarySessionId)) {
    selectedDiarySessionId = filtered[0].id;
  }

  filtered.forEach((session) => {
    const card = document.createElement("article");
    card.className = session.id === selectedDiarySessionId ? "diary-session-card active" : "diary-session-card";
    card.dataset.sessionId = session.id;

    const previewImage = getDiaryImageAttachments(session.attachments)[0];
    const previewSummary = String(session.summary || session.details || "").replace(/\s+/g, " ").trim() || "Sem resumo rapido.";
    const attachmentsCount = Array.isArray(session.attachments) ? session.attachments.length : 0;
    const linkedCount = Array.isArray(session.linkedCharacterIds) ? session.linkedCharacterIds.length : 0;
    const sessionSequence = Number.isFinite(session.sequence) && session.sequence > 0
      ? `Sessao ${String(session.sequence).padStart(2, "0")}`
      : "Registro";
    const badges = [
      linkedCount > 0 ? `${linkedCount} registro${linkedCount === 1 ? "" : "s"}` : "Sem vinculos",
      attachmentsCount > 0 ? `${attachmentsCount} anexo${attachmentsCount === 1 ? "" : "s"}` : "Sem anexos",
    ];

    const main = document.createElement("button");
    main.type = "button";
    main.className = "diary-session-main diary-session-main-visual";
    main.dataset.diaryAction = "open";
    main.innerHTML = `
      <div class="diary-session-preview${previewImage ? " has-image" : ""}">
        ${previewImage
          ? `<img src="${escapeHtml(previewImage.dataUrl)}" alt="${escapeHtml(session.title || "Sessao")}">`
          : `<span>${escapeHtml(sessionSequence)}</span>`}
      </div>
      <div class="diary-session-copy">
        <p class="diary-session-kicker">${escapeHtml(sessionSequence)}</p>
        <h3>${escapeHtml(session.title || "Sessao sem titulo")}</h3>
        <p class="diary-session-summary">${escapeHtml(previewSummary)}</p>
      </div>
      <div class="diary-session-footer">
        <div class="diary-session-badges">
          ${badges.map((badge) => `<span class="diary-session-badge">${escapeHtml(badge)}</span>`).join("")}
        </div>
        <p class="diary-session-meta">Atualizado ${escapeHtml(formatDateTime(session.updatedAt))}</p>
      </div>
    `;

    card.appendChild(main);
    elements.campaignDiaryList.appendChild(card);
  });
}

function renderCampaignDiaryDetail() {
  elements.campaignDiaryDetail.innerHTML = "";
  const filteredSessions = getFilteredDiarySessions();

  if (diaryEditorDraft) {
    elements.campaignDiaryDetail.innerHTML = `
      <div class="diary-detail-card diary-editor-card">
        <div class="diary-detail-top">
          <div>
            <p class="master-lock-eyebrow">${diaryEditorDraft.id ? "Reescrever Sessao" : "Nova Sessao"}</p>
            <h3>${diaryEditorDraft.id ? "Editar registro da mesa" : "Criar novo registro da mesa"}</h3>
          </div>
          <div class="diary-detail-actions">
            <button type="button" class="secondary" data-diary-detail-action="cancel">Cancelar</button>
            <button type="button" class="primary" data-diary-detail-action="save">Salvar Sessao</button>
          </div>
        </div>

        <div class="diary-editor-grid">
          <label>
            Titulo
            <input id="diary-session-title" type="text" maxlength="80" value="${escapeHtml(diaryEditorDraft.title)}" placeholder="Ex.: Sessao 4 - O hospital vazio">
          </label>
          <label class="diary-editor-full">
            Resumo curto
            <textarea id="diary-session-summary" rows="3" placeholder="Resumo rapido para o card da sessao...">${escapeHtml(diaryEditorDraft.summary)}</textarea>
          </label>
          <label class="diary-editor-full">
            Relato detalhado
            <textarea id="diary-session-details" rows="14" placeholder="Escreva tudo o que aconteceu na sessao...">${escapeHtml(diaryEditorDraft.details)}</textarea>
          </label>
          <section class="diary-detail-section diary-editor-full">
            <div class="section-toolbar">
              <div>
                <h4>Registros Vinculados</h4>
                <p class="hint">Marque os personagens que participaram desta sessão.</p>
              </div>
            </div>
            ${renderDiaryCharacterSelectorMarkup(diaryEditorDraft.linkedCharacterIds)}
          </section>
          <section class="diary-detail-section diary-editor-full">
            <div class="section-toolbar">
              <div>
                <h4>Anexos da Sessao</h4>
                <p class="hint">Guarde imagens, PDFs, pistas e documentos da investigação.</p>
              </div>
              <button type="button" class="secondary" data-diary-detail-action="add-attachment">Adicionar anexo</button>
            </div>
            ${renderDiaryAttachmentsMarkup(diaryEditorDraft.attachments, true)}
          </section>
        </div>
      </div>
    `;
    return;
  }

  if (filteredSessions.length === 0 && getDiarySessions().length > 0) {
    elements.campaignDiaryDetail.innerHTML = `
      <div class="diary-detail-empty">
        <h3>Nenhuma sessao encontrada</h3>
        <p>Ajuste a busca para voltar a visualizar uma sessao registrada.</p>
      </div>
    `;
    return;
  }

  const session = getDiarySessionById(selectedDiarySessionId);
  if (!session) {
    elements.campaignDiaryDetail.innerHTML = `
      <div class="diary-detail-empty">
        <h3>Nenhuma sessao aberta</h3>
        <p>Abra uma sessao da lista ou crie uma nova para comecar a registrar a campanha.</p>
      </div>
    `;
    return;
  }

  const normalizedAttachments = Array.isArray(session.attachments)
    ? session.attachments.map((attachment) => normalizeDiaryAttachment(attachment)).filter((attachment) => attachment)
    : [];
  const imageAttachments = getDiaryImageAttachments(normalizedAttachments);
  const coverImage = imageAttachments[0] || null;
  const linkedNames = getDiaryLinkedCharacterNames(session.linkedCharacterIds);
  const storyPanels = getDiaryStoryPanels(session);
  const heroSummary = String(session.summary || storyPanels[0]?.text || "").trim() || "Sem resumo rapido.";
  const sessionSequence = Number.isFinite(session.sequence) && session.sequence > 0
    ? `Sessao ${String(session.sequence).padStart(2, "0")}`
    : "Registro";
  const storyBadges = [
    `${linkedNames.length} registro${linkedNames.length === 1 ? "" : "s"} vinculado${linkedNames.length === 1 ? "" : "s"}`,
    `${normalizedAttachments.length} anexo${normalizedAttachments.length === 1 ? "" : "s"}`,
    `Atualizado ${formatDateTime(session.updatedAt)}`,
  ];

  elements.campaignDiaryDetail.innerHTML = `
    <article class="diary-detail-card diary-story-card">
      <div class="diary-story-hero">
        <div class="diary-story-cover${coverImage ? " has-image" : ""}">
          ${coverImage
            ? `<img src="${escapeHtml(coverImage.dataUrl)}" alt="${escapeHtml(session.title || "Sessao")}">`
            : `<span>${escapeHtml(sessionSequence)}</span>`}
        </div>
        <div class="diary-story-copy">
          <p class="master-lock-eyebrow">Resumo da mesa</p>
          <h3>${escapeHtml(session.title || "Sessao sem titulo")}</h3>
          <p class="diary-story-summary">${escapeHtml(heroSummary)}</p>
          <div class="diary-story-badges">
            ${storyBadges.map((badge) => `<span class="diary-story-badge">${escapeHtml(badge)}</span>`).join("")}
          </div>
        </div>
        <div class="diary-detail-actions diary-story-actions">
          <button type="button" class="secondary" data-diary-detail-action="share">Compartilhar</button>
          <button type="button" class="secondary" data-diary-detail-action="edit">Editar Sessao</button>
          <button type="button" class="menu-delete-btn" data-diary-detail-action="delete">Excluir</button>
        </div>
      </div>

      <section class="diary-story-strip">
        ${storyPanels
          .map((panel, index) => `
            <article class="diary-story-panel${panel.highlight ? " highlight" : ""}">
              <span class="diary-story-panel-kicker">${escapeHtml(panel.title || `Quadro ${index + 1}`)}</span>
              <p>${escapeHtml(panel.text)}</p>
            </article>
          `)
          .join("")}
      </section>

      <section class="diary-detail-section diary-story-section">
        <h4>Registros envolvidos</h4>
        ${renderDiaryCharacterLinksMarkup(session.linkedCharacterIds)}
      </section>

      <section class="diary-detail-section diary-story-section">
        <h4>Relato completo</h4>
        <div class="diary-detail-body">${escapeHtml(session.details || session.summary || "Nenhum detalhe registrado ainda.")}</div>
      </section>

      <section class="diary-detail-section diary-story-section">
        <h4>Galeria da sessao</h4>
        ${renderDiaryAttachmentsMarkup(session.attachments, false)}
      </section>
    </article>
  `;
}

function handleDiaryCreateSession() {
  diaryEditorSessionId = null;
  diaryEditorDraft = createDiaryEditorDraft();
  renderCampaignDiary();
  window.setTimeout(() => {
    document.getElementById("diary-session-title")?.focus();
  }, 0);
}

function handleDiaryListClick(event) {
  const trigger = event.target instanceof Element
    ? event.target.closest("[data-diary-action]")
    : null;

  if (!trigger) {
    return;
  }

  const action = trigger.dataset.diaryAction;

  if (action === "create") {
    handleDiaryCreateSession();
    return;
  }

  if (action === "clear-search" && elements.diarySearch) {
    elements.diarySearch.value = "";
    renderCampaignDiary();
    return;
  }

  const sessionCard = trigger.closest("[data-session-id]");
  const sessionId = sessionCard?.dataset.sessionId || "";

  if (action === "open" && sessionId) {
    selectedDiarySessionId = sessionId;
    diaryEditorSessionId = null;
    diaryEditorDraft = null;
    renderCampaignDiary();
  }
}

function handleDiaryDetailClick(event) {
  const trigger = event.target instanceof Element
    ? event.target.closest("[data-diary-detail-action]")
    : null;

  if (!trigger) {
    return;
  }

  const action = trigger.dataset.diaryDetailAction;

  if (action === "cancel") {
    diaryEditorSessionId = null;
    diaryEditorDraft = null;
    renderCampaignDiary();
    return;
  }

  if (action === "edit") {
    const session = getDiarySessionById(selectedDiarySessionId);
    if (!session) {
      return;
    }

    diaryEditorSessionId = session.id;
    diaryEditorDraft = createDiaryEditorDraft(session);
    renderCampaignDiary();
    window.setTimeout(() => {
      document.getElementById("diary-session-title")?.focus();
    }, 0);
    return;
  }

  if (action === "share") {
    void shareDiarySessionByLink(selectedDiarySessionId);
    return;
  }

  if (action === "save") {
    saveDiarySessionFromEditor();
    return;
  }

  if (action === "add-attachment") {
    syncDiaryDraftFromEditorFields();
    elements.diaryAttachmentFile?.click();
    return;
  }

  if (action === "remove-attachment") {
    if (!diaryEditorDraft) {
      return;
    }

    const attachmentId = trigger.dataset.attachmentId || "";
    syncDiaryDraftFromEditorFields();
    diaryEditorDraft.attachments = (Array.isArray(diaryEditorDraft.attachments) ? diaryEditorDraft.attachments : [])
      .filter((attachment) => attachment.id !== attachmentId);
    renderCampaignDiaryDetail();
    return;
  }

  if (action === "delete") {
    deleteDiarySession(selectedDiarySessionId);
  }
}

function handleDiaryDetailInput(event) {
  if (!(event.target instanceof HTMLElement) || !diaryEditorDraft) {
    return;
  }

  if (
    event.target.id === "diary-session-title"
    || event.target.id === "diary-session-summary"
    || event.target.id === "diary-session-details"
    || event.target.matches('[data-diary-character-toggle="true"]')
  ) {
    syncDiaryDraftFromEditorFields();
  }
}

function handleDiaryAttachmentFileChange(event) {
  const input = event.target;
  const files = Array.from(input?.files || []);

  if (!files.length || !diaryEditorDraft) {
    if (input) {
      input.value = "";
    }
    return;
  }

  Promise.all(
    files.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const attachment = normalizeDiaryAttachment({
          id: generateId(),
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: String(reader.result || ""),
        });

        if (!attachment) {
          reject(new Error("Falha ao ler anexo."));
          return;
        }

        resolve(attachment);
      };
      reader.onerror = () => reject(new Error("Falha ao ler anexo."));
      reader.readAsDataURL(file);
    }))
  )
    .then((attachments) => {
      diaryEditorDraft.attachments = [
        ...(Array.isArray(diaryEditorDraft.attachments) ? diaryEditorDraft.attachments : []),
        ...attachments,
      ].slice(0, 18);
      renderCampaignDiaryDetail();
    })
    .catch(() => {
      alert("Não foi possível anexar um ou mais arquivos.");
    })
    .finally(() => {
      if (input) {
        input.value = "";
      }
    });
}

function saveDiarySessionFromEditor() {
  syncDiaryDraftFromEditorFields();
  const titleInput = document.getElementById("diary-session-title");
  const summaryInput = document.getElementById("diary-session-summary");
  const detailsInput = document.getElementById("diary-session-details");

  if (!titleInput || !summaryInput || !detailsInput) {
    return;
  }

  const now = new Date().toISOString();
  const existingSession = getDiarySessionById(diaryEditorDraft?.id || "");
  const sequence = diaryEditorDraft?.sequence
    || existingSession?.sequence
    || getNextDiarySessionSequence();
  const defaultTitle = formatDiarySessionTitle(sequence);
  const title = titleInput.value.trim() || defaultTitle;
  const summary = summaryInput.value.trim();
  const details = detailsInput.value.trim();
  const sessionId = diaryEditorDraft?.id || generateId();
  const payload = normalizeDiarySession({
    id: sessionId,
    sequence,
    title,
    summary,
    details,
    linkedCharacterIds: Array.isArray(diaryEditorDraft?.linkedCharacterIds) ? diaryEditorDraft.linkedCharacterIds : [],
    attachments: Array.isArray(diaryEditorDraft?.attachments) ? diaryEditorDraft.attachments : [],
    createdAt: existingSession?.createdAt || now,
    updatedAt: now,
  });

  const remaining = getDiarySessions().filter((session) => session.id !== sessionId);
  campaignDiary = {
    sessions: [payload, ...remaining].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
    updatedAt: now,
  };

  saveCampaignDiary(campaignDiary);
  selectedDiarySessionId = sessionId;
  diaryEditorSessionId = null;
  diaryEditorDraft = null;
  renderCampaignDiary();
}

function deleteDiarySession(sessionId) {
  if (!sessionId) {
    return;
  }

  const session = getDiarySessionById(sessionId);
  if (!session) {
    return;
  }

  if (!window.confirm(`Excluir a sessao "${session.title || "Sessao sem titulo"}"?`)) {
    return;
  }

  const remaining = getDiarySessions().filter((item) => item.id !== sessionId);
  campaignDiary = {
    sessions: remaining,
    updatedAt: new Date().toISOString(),
  };

  saveCampaignDiary(campaignDiary);
  selectedDiarySessionId = remaining[0]?.id || null;
  diaryEditorSessionId = null;
  diaryEditorDraft = null;
  renderCampaignDiary();
}

function showMasterMode() {
  postMasterUnlockRoute = "master";
  if (masterUnlocked) {
    showMasterDashboard();
    return;
  }

  showMasterLockView();
}

function showMasterLockView(message = "") {
  hideAllMenuViews();
  elements.menuMasterLockView?.classList.remove("hidden");
  setActiveMenuButton(elements.menuMaster);
  if (elements.masterPasswordInput) {
    elements.masterPasswordInput.value = "";
  }
  if (getMasterUnlockRemainingMs() > 0) {
    scheduleMasterUnlockCooldownUi();
  } else {
    updateMasterFeedback(message, false);
    scheduleMasterUnlockCooldownUi();
  }
  elements.masterPasswordInput?.focus();
}

function showMasterDashboard() {
  updateMasterMenuOptions();
  hydrateRuntimeFirebaseConfigUI();
  renderMenuEventSettingsControls();
  refreshMissionSubscriptions();
  importPendingMasterShare();
  renderMasterCharacterList();
  renderMasterCharacterDetail();
  hideAllMenuViews();
  elements.menuMasterView?.classList.remove("hidden");
  setActiveMenuButton(elements.menuMaster);
  elements.masterSearch?.focus();
}

function showMenuMasterInventory() {
  if (!masterUnlocked) {
    showMasterLockView("Desbloqueie o modo mestre para acessar o inventário do mestre.");
    return;
  }
  updateMasterMenuOptions();
  importPendingMasterShare();
  hideAllMenuViews();
  elements.menuMasterInventoryView?.classList.remove("hidden");
  setActiveMenuButton(elements.menuMasterInventory);
  renderMasterInventoryScreen();
}

function normalizeMasterInventoryTemplate(template, index = 0) {
  if (!template || typeof template !== "object") {
    return null;
  }

  const item = normalizeInventoryItem(template.item || template);
  return {
    id: typeof template.id === "string" && template.id ? template.id : `master-item-${index + 1}-${generateId()}`,
    item,
    createdAt: typeof template.createdAt === "string" && template.createdAt ? template.createdAt : new Date().toISOString(),
    updatedAt: typeof template.updatedAt === "string" && template.updatedAt ? template.updatedAt : new Date().toISOString(),
  };
}

function loadMasterInventoryTemplates() {
  try {
    const raw = localStorage.getItem(MASTER_INVENTORY_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .map((template, index) => normalizeMasterInventoryTemplate(template, index))
      .filter((template) => template !== null);
  } catch {
    return [];
  }
}

function saveMasterInventoryTemplates(data) {
  try {
    const normalized = Array.isArray(data)
      ? data.map((template, index) => normalizeMasterInventoryTemplate(template, index)).filter((template) => template)
      : [];
    persistJsonWithRecovery(MASTER_INVENTORY_STORAGE_KEY, normalized);
    recordSafetyBackup("master-inventory");

    if (masterSyncChannel) {
      try {
        masterSyncChannel.postMessage({ type: "master-inventory-updated" });
      } catch {
        // Ignore channel sync errors.
      }
    }
  } catch (error) {
    console.error(error);
    pushUiToast("Não foi possível salvar o inventário do mestre.", "danger", 3200);
  }
}

function getOrderedMasterInventoryTemplates() {
  return [...masterInventoryTemplates].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

function getSelectedMasterInventoryTemplate() {
  return masterInventoryTemplates.find((template) => template.id === selectedMasterInventoryItemId) || null;
}

function getMasterInventoryTemplateById(templateId) {
  return masterInventoryTemplates.find((template) => template.id === templateId) || null;
}

function ensureSelectedMasterInventoryTemplate() {
  if (masterInventoryTemplates.some((template) => template.id === selectedMasterInventoryItemId)) {
    return;
  }
  selectedMasterInventoryItemId = getOrderedMasterInventoryTemplates()[0]?.id || null;
}

function hydrateMasterInventoryFieldOptions() {
  const bindOptions = (select, values) => {
    if (!select) {
      return;
    }
    if (select.options.length === values.length) {
      return;
    }
    select.innerHTML = values
      .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
      .join("");
  };

  bindOptions(elements.masterInventoryType, INVENTORY_ITEM_TYPES);
  bindOptions(elements.masterInventoryRarity, INVENTORY_ITEM_RARITIES);
  bindOptions(elements.masterInventoryStatus, INVENTORY_ITEM_STATUSES);
}

function setMasterInventoryPreview(item = createEmptyInventoryItem()) {
  if (!elements.masterInventoryPreview) {
    return;
  }
  const image = typeof item?.image === "string" ? item.image : "";
  elements.masterInventoryPreview.src = image || defaultItemIcon;
  elements.masterInventoryPreview.alt = item?.name ? `Preview de ${item.name}` : "Preview do item do mestre";
  elements.masterInventoryPreview.dataset.imageValue = image;
  elements.masterInventoryPreview.style.setProperty("--image-fit", normalizeImageFit(item?.imageFit));
}

function syncMasterInventoryEditor() {
  const template = getSelectedMasterInventoryTemplate();
  const item = template?.item || createEmptyInventoryItem();

  hydrateMasterInventoryFieldOptions();
  setMasterInventoryPreview(item);

  if (elements.masterInventoryEditorTitle) {
    elements.masterInventoryEditorTitle.textContent = template?.item?.name || "Item pronto";
  }
  if (elements.masterInventoryEditorStatus) {
    elements.masterInventoryEditorStatus.textContent = template
      ? `${formatMasterUpdatedAt(template.updatedAt)} • pronto para entrega nas fichas conectadas`
      : "Monte um item base para reutilizar durante a sessão.";
  }

  if (elements.masterInventoryName) {
    elements.masterInventoryName.value = item.name || "";
  }
  if (elements.masterInventoryDescription) {
    elements.masterInventoryDescription.value = item.description || "";
  }
  if (elements.masterInventoryType) {
    elements.masterInventoryType.value = item.type || "Outro";
  }
  if (elements.masterInventoryRarity) {
    elements.masterInventoryRarity.value = item.rarity || "Comum";
  }
  if (elements.masterInventoryStatus) {
    elements.masterInventoryStatus.value = getInventoryItemStatus(item);
  }
  if (elements.masterInventoryImageFit) {
    elements.masterInventoryImageFit.value = normalizeImageFit(item.imageFit);
  }
  if (elements.masterInventoryWeight) {
    elements.masterInventoryWeight.value = String(item.weight || 0);
  }
  if (elements.masterInventoryChargesCurrent) {
    elements.masterInventoryChargesCurrent.value = String(item.chargesCurrent || 0);
  }
  if (elements.masterInventoryChargesMax) {
    elements.masterInventoryChargesMax.value = String(item.chargesMax || 0);
  }
  if (elements.masterInventoryLinkedAttack) {
    elements.masterInventoryLinkedAttack.value = item.linkedAttack || "";
  }
  if (elements.masterInventoryDefenseBonus) {
    elements.masterInventoryDefenseBonus.value = String(item.defenseBonus || 0);
  }
  if (elements.masterInventoryAttackBonus) {
    elements.masterInventoryAttackBonus.value = String(item.attackBonus || 0);
  }
  if (elements.masterInventoryDamageBonus) {
    elements.masterInventoryDamageBonus.value = String(item.damageBonus || 0);
  }
  if (elements.masterInventorySanPenalty) {
    elements.masterInventorySanPenalty.value = String(item.sanPenalty || 0);
  }
  if (elements.masterInventoryNote) {
    elements.masterInventoryNote.value = item.note || "";
  }
  if (elements.masterInventoryDuplicate) {
    elements.masterInventoryDuplicate.disabled = !template;
  }
  if (elements.masterInventoryDelete) {
    elements.masterInventoryDelete.disabled = !template;
  }
}

function readMasterInventoryTemplateForm() {
  return normalizeInventoryItem({
    image: String(elements.masterInventoryPreview?.dataset.imageValue || ""),
    imageFit: elements.masterInventoryImageFit?.value || "cover",
    name: elements.masterInventoryName?.value.trim() || "",
    description: elements.masterInventoryDescription?.value.trim() || "",
    type: elements.masterInventoryType?.value || "Outro",
    status: elements.masterInventoryStatus?.value || "Guardado",
    rarity: elements.masterInventoryRarity?.value || "Comum",
    weight: elements.masterInventoryWeight?.value || 0,
    chargesCurrent: elements.masterInventoryChargesCurrent?.value || 0,
    chargesMax: elements.masterInventoryChargesMax?.value || 0,
    note: elements.masterInventoryNote?.value.trim() || "",
    linkedAttack: elements.masterInventoryLinkedAttack?.value.trim() || "",
    defenseBonus: elements.masterInventoryDefenseBonus?.value || 0,
    attackBonus: elements.masterInventoryAttackBonus?.value || 0,
    damageBonus: elements.masterInventoryDamageBonus?.value || 0,
    sanPenalty: elements.masterInventorySanPenalty?.value || 0,
  });
}

function renderMasterInventoryList() {
  if (!elements.masterInventoryList) {
    return;
  }

  ensureSelectedMasterInventoryTemplate();
  const ordered = getOrderedMasterInventoryTemplates();
  if (!ordered.length) {
    elements.masterInventoryList.innerHTML = '<p class="empty-state">Nenhum item pronto salvo ainda.</p>';
    return;
  }

  elements.masterInventoryList.innerHTML = ordered
    .map((template) => {
      const item = template.item || createEmptyInventoryItem();
      const description = item.description || item.note || "Item sem descrição rápida.";
      const updatedLabel = formatMasterUpdatedAt(template.updatedAt);
      return `
        <article
          class="master-inventory-template-card${template.id === selectedMasterInventoryItemId ? " active" : ""}"
        >
          <button
            type="button"
            class="master-inventory-template-select"
            data-master-inventory-id="${escapeHtml(template.id)}"
          >
            <div class="master-inventory-template-head">
              <img
                class="master-inventory-template-preview"
                style="--image-fit:${escapeHtml(normalizeImageFit(item.imageFit))}"
                src="${escapeHtml(item.image || defaultItemIcon)}"
                alt="${escapeHtml(item.name || "Item do mestre")}"
              >
              <div class="master-inventory-template-copy">
                <h4>${escapeHtml(item.name || "Item sem nome")}</h4>
                <p>${escapeHtml(description)}</p>
              </div>
            </div>
            <p class="master-inventory-template-meta">${escapeHtml(updatedLabel)}</p>
            <div class="master-inventory-pill-row">
              <span class="master-inventory-pill">${escapeHtml(item.type || "Outro")}</span>
              <span class="master-inventory-pill">${escapeHtml(item.rarity || "Comum")}</span>
              <span class="master-inventory-pill">${escapeHtml(getInventoryItemStatus(item))}</span>
            </div>
          </button>
          <div class="master-inventory-card-actions">
            <button
              type="button"
              class="secondary"
              data-master-inventory-id="${escapeHtml(template.id)}"
            >Editar</button>
            <button
              type="button"
              class="menu-delete-btn"
              data-master-inventory-delete-id="${escapeHtml(template.id)}"
            >Excluir</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function getMasterInventoryRecipients() {
  return [...masterShares]
    .sort((recordA, recordB) => {
      const liveA = isCharacterInAction(recordA?.snapshot);
      const liveB = isCharacterInAction(recordB?.snapshot);
      if (liveA !== liveB) {
        return liveA ? -1 : 1;
      }

      const updatedComparison = String(recordA?.updatedAt || "").localeCompare(String(recordB?.updatedAt || ""));
      if (updatedComparison !== 0) {
        return updatedComparison > 0 ? -1 : 1;
      }

      return String(recordA?.snapshot?.name || "").localeCompare(String(recordB?.snapshot?.name || ""), "pt-BR");
    });
}

function getRecipientInventoryState(snapshot = {}) {
  const slotLimit = getInventorySlotsForTrail(snapshot?.trail);
  const inventory = deriveInventoryItems(snapshot).slice(0, slotLimit).map((item) => normalizeInventoryItem(item));
  while (inventory.length < slotLimit) {
    inventory.push(createEmptyInventoryItem());
  }
  const filledCount = inventory.filter((item) => isInventoryItemFilled(item)).length;
  const emptyIndex = inventory.findIndex((item) => !isInventoryItemFilled(item));
  return {
    slotLimit,
    inventory,
    filledCount,
    emptyIndex,
  };
}

function renderMasterInventoryTargetList() {
  if (!elements.masterInventoryTargetList || !elements.masterInventoryTargetMeta) {
    return;
  }

  const template = getSelectedMasterInventoryTemplate();
  const recipients = getMasterInventoryRecipients();
  elements.masterInventoryTargetMeta.textContent = recipients.length
    ? `${recipients.length} ficha(s) compartilhadas disponíveis para receber ${template?.item?.name ? `"${template.item.name}"` : "o item selecionado"}, mesmo entre dispositivos.`
    : "Nenhuma ficha foi enviada ao mestre ainda. Quando o jogador compartilhar, ela aparece aqui.";

  if (elements.masterInventoryGiveAll) {
    elements.masterInventoryGiveAll.disabled = !template || recipients.length === 0;
  }

  if (!recipients.length) {
    elements.masterInventoryTargetList.innerHTML = '<p class="empty-state">Quando um jogador compartilhar a ficha com o mestre, ela aparece aqui e pode receber itens em qualquer dispositivo.</p>';
    return;
  }

  elements.masterInventoryTargetList.innerHTML = recipients
    .map((record) => {
      const snapshot = record.snapshot || {};
      const inventoryState = getRecipientInventoryState(snapshot);
      const canReceive = Boolean(template) && inventoryState.emptyIndex !== -1;
      const isLive = isCharacterInAction(snapshot);
      return `
        <article class="master-inventory-target-card">
          <div class="master-inventory-target-head">
            <img
              class="master-inventory-target-avatar"
              style="--image-fit:${escapeHtml(normalizeImageFit(snapshot.profileImageFit))}"
              src="${escapeHtml(snapshot.profileImage || defaultAvatar)}"
              alt="${escapeHtml(snapshot.name || "Jogador")}"
            >
            <div class="master-inventory-target-copy">
              <h4>${escapeHtml(snapshot.name || "Jogador")}</h4>
              <p>${escapeHtml(snapshot.class || "-")} • ${escapeHtml(snapshot.trail || "-")}</p>
              <p>${escapeHtml(String(inventoryState.filledCount))}/${escapeHtml(String(inventoryState.slotLimit))} espaço(s) usados • ${inventoryState.emptyIndex === -1 ? "sem espaço livre" : "há espaço livre"}</p>
            </div>
          </div>
          <div class="master-inventory-pill-row">
            <span class="master-inventory-pill ${isLive ? "is-live" : "is-offline"}">${isLive ? "Conectado" : "Offline"}</span>
            <span class="master-inventory-pill">Ficha sincronizada</span>
          </div>
          <div class="master-inventory-target-actions">
            <button
              type="button"
              class="${canReceive ? "primary" : "secondary"}"
              data-master-inventory-give="${escapeHtml(record.shareId)}"
              ${canReceive ? "" : "disabled"}
            >${template ? "Entregar para esta ficha" : "Selecione um item"}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMasterInventoryScreen() {
  ensureSelectedMasterInventoryTemplate();
  renderMasterInventoryList();
  syncMasterInventoryEditor();
  renderMasterInventoryTargetList();
}

function handleMasterInventoryTemplateAdd() {
  const now = new Date().toISOString();
  const template = normalizeMasterInventoryTemplate({
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    item: {
      ...createEmptyInventoryItem(),
      name: "Novo item",
    },
  });
  masterInventoryTemplates = [template, ...masterInventoryTemplates];
  selectedMasterInventoryItemId = template.id;
  saveMasterInventoryTemplates(masterInventoryTemplates);
  renderMasterInventoryScreen();
  elements.masterInventoryName?.focus();
  elements.masterInventoryName?.select();
  pushUiToast("Novo item do mestre criado.", "status", 1800);
}

function deleteMasterInventoryTemplateById(templateId, options = {}) {
  const template = getMasterInventoryTemplateById(templateId);
  if (!template) {
    return false;
  }

  if (!options.skipConfirm && !window.confirm(`Excluir o item pronto "${template.item?.name || "Item"}"?`)) {
    return false;
  }

  masterInventoryTemplates = masterInventoryTemplates.filter((entry) => entry.id !== template.id);
  selectedMasterInventoryItemId = getOrderedMasterInventoryTemplates()[0]?.id || null;
  saveMasterInventoryTemplates(masterInventoryTemplates);
  renderMasterInventoryScreen();
  pushUiToast("Item do mestre removido.", "status", 1800);
  return true;
}

function handleMasterInventoryListClick(event) {
  const deleteTrigger = event.target instanceof Element ? event.target.closest("[data-master-inventory-delete-id]") : null;
  if (deleteTrigger) {
    deleteMasterInventoryTemplateById(deleteTrigger.getAttribute("data-master-inventory-delete-id") || "");
    return;
  }

  const trigger = event.target instanceof Element ? event.target.closest("[data-master-inventory-id]") : null;
  if (!trigger) {
    return;
  }
  selectedMasterInventoryItemId = trigger.getAttribute("data-master-inventory-id") || null;
  renderMasterInventoryScreen();
}

function saveSelectedMasterInventoryTemplate() {
  const item = readMasterInventoryTemplateForm();
  if (!item.name.trim()) {
    pushUiToast("Dê um nome ao item antes de salvar.", "danger", 2200);
    elements.masterInventoryName?.focus();
    return;
  }

  const existing = getSelectedMasterInventoryTemplate();
  const now = new Date().toISOString();
  const template = normalizeMasterInventoryTemplate({
    id: existing?.id || generateId(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    item,
  });
  const index = masterInventoryTemplates.findIndex((entry) => entry.id === template.id);
  if (index === -1) {
    masterInventoryTemplates.unshift(template);
  } else {
    masterInventoryTemplates[index] = template;
  }
  selectedMasterInventoryItemId = template.id;
  saveMasterInventoryTemplates(masterInventoryTemplates);
  renderMasterInventoryScreen();
  pushUiToast(existing ? "Item do mestre atualizado." : "Item do mestre salvo.", "status", 1800);
}

function duplicateSelectedMasterInventoryTemplate() {
  const template = getSelectedMasterInventoryTemplate();
  if (!template) {
    return;
  }
  const now = new Date().toISOString();
  const cloned = normalizeMasterInventoryTemplate({
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    item: {
      ...template.item,
      name: `${template.item?.name || "Item"} (cópia)`,
    },
  });
  masterInventoryTemplates.unshift(cloned);
  selectedMasterInventoryItemId = cloned.id;
  saveMasterInventoryTemplates(masterInventoryTemplates);
  renderMasterInventoryScreen();
  pushUiToast("Item do mestre duplicado.", "status", 1800);
}

function deleteSelectedMasterInventoryTemplate() {
  const template = getSelectedMasterInventoryTemplate();
  if (!template) {
    return;
  }
  deleteMasterInventoryTemplateById(template.id, { skipConfirm: false });
}

function handleMasterInventoryImageFileChange(event) {
  const [file] = event.target?.files || [];
  if (!file || !elements.masterInventoryPreview) {
    if (event.target) {
      event.target.value = "";
    }
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    elements.masterInventoryPreview.dataset.imageValue = String(reader.result || "");
    elements.masterInventoryPreview.src = String(reader.result || defaultItemIcon);
  };
  reader.readAsDataURL(file);
  event.target.value = "";
}

function clearMasterInventoryTemplateImage() {
  setMasterInventoryPreview({
    ...readMasterInventoryTemplateForm(),
    image: "",
  });
}

function buildGrantedInventoryForSnapshot(snapshot, templateItem) {
  const inventoryState = getRecipientInventoryState(snapshot);
  if (inventoryState.emptyIndex === -1) {
    return null;
  }
  const nextInventory = inventoryState.inventory.slice();
  nextInventory[inventoryState.emptyIndex] = normalizeInventoryItem(templateItem);
  return nextInventory;
}

function applyUpdatedMasterShareRecords(records) {
  if (!Array.isArray(records) || !records.length) {
    return;
  }

  records.forEach((record) => {
    const normalized = migrateMasterShareRecord(record);
    if (!normalized) {
      return;
    }
    const index = masterShares.findIndex((item) => item.shareId === normalized.shareId);
    if (index === -1) {
      return;
    }
    masterShares[index] = mergeMasterShareRecords(masterShares[index], normalized);
    syncLocalCharacterFromMasterRecord(normalized);
    void syncMasterShareRecordToFirebase(normalized);
  });

  masterShares = [...masterShares].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  saveMasterShares(masterShares);
  refreshMasterViews();
}

function deliverSelectedMasterTemplateToShare(shareId, options = {}) {
  const template = getSelectedMasterInventoryTemplate();
  const record = masterShares.find((entry) => entry.shareId === shareId) || null;
  if (!template || !record) {
    return false;
  }

  const nextInventory = buildGrantedInventoryForSnapshot(record.snapshot || {}, template.item);
  if (!nextInventory) {
    if (!options.silent) {
      pushUiToast(`${record.snapshot?.name || "Essa ficha"} está sem espaço livre no inventário.`, "danger", 2600);
    }
    return false;
  }

  const now = new Date().toISOString();
  applyUpdatedMasterShareRecords([{
    ...record,
    updatedAt: now,
    snapshot: {
      ...(record.snapshot || {}),
      inventory: nextInventory,
      updatedAt: now,
    },
  }]);

  if (!options.silent) {
    pushUiToast(`"${template.item?.name || "Item"}" entregue para ${record.snapshot?.name || "a ficha"}.`, "status", 2200);
  }
  return true;
}

function handleMasterInventoryTargetListClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-master-inventory-give]") : null;
  if (!trigger) {
    return;
  }
  deliverSelectedMasterTemplateToShare(trigger.getAttribute("data-master-inventory-give") || "");
}

function handleGiveSelectedItemToAllActiveShares() {
  const recipients = getMasterInventoryRecipients();
  if (!recipients.length) {
    pushUiToast("Nenhuma ficha compartilhada disponível para receber o item.", "danger", 2200);
    return;
  }

  const template = getSelectedMasterInventoryTemplate();
  if (!template) {
    pushUiToast("Selecione um item pronto antes de entregar.", "danger", 2200);
    return;
  }

  const updates = [];
  let deliveredCount = 0;
  let blockedCount = 0;
  recipients.forEach((record) => {
    const nextInventory = buildGrantedInventoryForSnapshot(record.snapshot || {}, template.item);
    if (!nextInventory) {
      blockedCount += 1;
      return;
    }
    const now = new Date().toISOString();
    updates.push({
      ...record,
      updatedAt: now,
      snapshot: {
        ...(record.snapshot || {}),
        inventory: nextInventory,
        updatedAt: now,
      },
    });
    deliveredCount += 1;
  });

  if (updates.length) {
    applyUpdatedMasterShareRecords(updates);
  }

  if (!deliveredCount) {
    pushUiToast("Nenhuma ficha tinha espaço livre para receber esse item.", "danger", 2400);
    return;
  }

  pushUiToast(
    blockedCount
      ? `"${template.item?.name || "Item"}" entregue para ${deliveredCount} ficha(s). ${blockedCount} sem espaço livre.`
      : `"${template.item?.name || "Item"}" entregue para ${deliveredCount} ficha(s).`,
    "status",
    2600
  );
}

function stepMasterNpcSheet(direction) {
  const ordered = getOrderedMasterNpcs();
  if (ordered.length <= 1) {
    return;
  }

  const currentIndex = Math.max(0, ordered.findIndex((npc) => npc.id === editingNpcId));
  const nextIndex = (currentIndex + direction + ordered.length) % ordered.length;
  openMasterNpcSheet(ordered[nextIndex].id, { closeMenu: false });
}

function updateMasterFeedback(message, isError = false) {
  if (!elements.masterPasswordFeedback) {
    return;
  }

  elements.masterPasswordFeedback.textContent = message || "";
  elements.masterPasswordFeedback.classList.toggle("error", Boolean(message) && isError);
  elements.masterPasswordFeedback.classList.toggle("success", Boolean(message) && !isError);
}

function getMasterUnlockRemainingMs(now = Date.now()) {
  return Math.max(0, masterUnlockLockedUntil - now);
}

function scheduleMasterUnlockCooldownUi() {
  if (!elements.masterUnlockButton) {
    return;
  }

  const remaining = getMasterUnlockRemainingMs();
  if (masterUnlockCooldownTimer) {
    window.clearTimeout(masterUnlockCooldownTimer);
    masterUnlockCooldownTimer = null;
  }

  if (remaining <= 0) {
    elements.masterUnlockButton.disabled = false;
    return;
  }

  const waitSeconds = Math.ceil(remaining / 1000);
  elements.masterUnlockButton.disabled = true;
  updateMasterFeedback(`Muitas tentativas. Aguarde ${waitSeconds}s.`, true);
  masterUnlockCooldownTimer = window.setTimeout(() => {
    scheduleMasterUnlockCooldownUi();
  }, Math.min(1000, remaining));
}

function handleMasterUnlock() {
  const remaining = getMasterUnlockRemainingMs();
  if (remaining > 0) {
    scheduleMasterUnlockCooldownUi();
    return;
  }

  const password = elements.masterPasswordInput.value.trim();
  if (password !== MASTER_PASSWORD) {
    masterUnlockAttempts += 1;
    if (masterUnlockAttempts >= MASTER_UNLOCK_MAX_ATTEMPTS) {
      masterUnlockAttempts = 0;
      masterUnlockLockedUntil = Date.now() + MASTER_UNLOCK_LOCKOUT_MS;
      scheduleMasterUnlockCooldownUi();
      elements.masterPasswordInput.select();
      return;
    }
    updateMasterFeedback("Senha incorreta.", true);
    elements.masterPasswordInput.select();
    return;
  }
  masterUnlockAttempts = 0;
  masterUnlockLockedUntil = 0;
  scheduleMasterUnlockCooldownUi();

  const importedName = pendingMasterShare?.snapshot?.name || "Personagem";
  const hadPendingShare = Boolean(pendingMasterShare);

  masterUnlocked = true;
  sessionStorage.setItem(MASTER_UNLOCK_SESSION_KEY, "1");
  updateMasterFeedback("Modo mestre desbloqueado.", false);
  updateMasterMenuOptions();
  refreshMissionSubscriptions();
  window.renderMasterPhone?.();
  if (postMasterUnlockRoute === "missions") {
    showMenuRooms();
  } else if (postMasterUnlockRoute === "tabletop" && typeof showMenuTabletop === "function") {
    showMenuTabletop();
  } else {
    showMenuHome();
  }
  postMasterUnlockRoute = "master";

  if (hadPendingShare) {
    alert(`Registro de "${importedName}" adicionado ao modo mestre.`);
  }
}

function lockMasterMode() {
  masterUnlocked = false;
  sessionStorage.removeItem(MASTER_UNLOCK_SESSION_KEY);
  updateMasterMenuOptions();
  pendingMasterShare = null;
  postMasterUnlockRoute = "master";
  closeSelectedMissionPanel(false);
  refreshMissionSubscriptions();
  window.renderMasterPhone?.();

  if (editorMode === "master") {
    resetForm();
    setEditorMode("character");
    setView("create");
  }

  openModeMenu();
  showMasterLockView("Modo mestre bloqueado.");
}

function exitMasterMode() {
  if (editorMode !== "master") {
    return;
  }

  masterUnlocked = false;
  sessionStorage.removeItem(MASTER_UNLOCK_SESSION_KEY);
  updateMasterMenuOptions();
  pendingMasterShare = null;
  postMasterUnlockRoute = "master";
  editingMasterShareId = null;
  selectedMasterShareId = null;
  closeSelectedMissionPanel(false);
  refreshMissionSubscriptions();
  window.renderMasterPhone?.();
  resetForm();
  setEditorMode("character");
  setView("create");
  openModeMenu();
  showMenuHome();
}

function setEditorMode(mode) {
  editorMode = mode === "master" ? "master" : "character";
  document.body.setAttribute("data-sheet-mode", editorMode);
  elements.masterEditorBar?.classList.toggle("hidden", editorMode !== "master");
  if (elements.masterSettingsPanel) {
    elements.masterSettingsPanel.classList.toggle("hidden", editorMode !== "master");
  }
  elements.shareMasterCurrent?.classList.toggle("hidden", editorMode === "master");
  if (elements.saveButton) {
    elements.saveButton.textContent = editorMode === "master"
      ? "Salvar registro do mestre"
      : "Salvar personagem";
  }
  try {
    updateInActionToggle();
  } catch (error) {
    console.error(error);
  }
  try {
    updateCurrentShareActions();
  } catch (error) {
    console.error(error);
  }
  try {
    renderMasterSheetSwitcher();
  } catch (error) {
    console.error(error);
  }
  try {
    syncCharacterSheetActions();
  } catch (error) {
    console.error(error);
  }
}

function getActiveMasterRecord() {
  return masterShares.find((item) => item.shareId === editingMasterShareId) || null;
}

function renderMasterSheetSwitcher() {
  if (!elements.masterSheetSelect) {
    return;
  }

  const ordered = [...masterShares].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  elements.masterSheetSelect.innerHTML = "";

  if (ordered.length === 0) {
    const option = new Option("Nenhum registro compartilhado", "");
    elements.masterSheetSelect.add(option);
    elements.masterSheetSelect.disabled = true;
    elements.masterPrevSheet.disabled = true;
    elements.masterNextSheet.disabled = true;
    return;
  }

  ordered.forEach((record) => {
    const label = record.snapshot?.name || "Personagem";
    elements.masterSheetSelect.add(new Option(label, record.shareId));
  });

  const selected = editingMasterShareId || selectedMasterShareId || ordered[0].shareId;
  elements.masterSheetSelect.value = selected;
  elements.masterSheetSelect.disabled = false;
  elements.masterPrevSheet.disabled = ordered.length <= 1;
  elements.masterNextSheet.disabled = ordered.length <= 1;
}

function updateMasterEditorStatus(message = "") {
  if (!elements.masterEditorStatus || !elements.masterEditorTitle) {
    return;
  }

  const record = getActiveMasterRecord();
  if (!record) {
  elements.masterEditorTitle.textContent = "Registro do Mestre";
  elements.masterEditorStatus.textContent =
    message || "Nenhum registro compartilhado foi carregado ainda.";
    return;
  }

  elements.masterEditorTitle.textContent = record.snapshot?.name || "Registro do Mestre";
  elements.masterEditorStatus.textContent = message || `${formatMasterUpdatedAt(record.updatedAt)} • edição do mestre ativa`;
}

function handleMasterSheetSelection() {
  const shareId = elements.masterSheetSelect.value;
  if (!shareId) {
    return;
  }

  enterMasterSheet(shareId);
}

function stepMasterSheet(delta) {
  const ordered = [...masterShares].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  if (ordered.length === 0) {
    return;
  }

  const currentId = editingMasterShareId || selectedMasterShareId || ordered[0].shareId;
  const currentIndex = Math.max(0, ordered.findIndex((item) => item.shareId === currentId));
  const nextIndex = (currentIndex + delta + ordered.length) % ordered.length;
  enterMasterSheet(ordered[nextIndex].shareId);
}

function enterMasterSheet(shareId = null) {
  const imported = importPendingMasterShare();
  const targetId = shareId || imported?.shareId || selectedMasterShareId || masterShares[0]?.shareId || null;

  setEditorMode("master");
  setView("master");
  selectedMasterShareId = targetId;
  renderMasterCharacterList();
  renderMasterSheetSwitcher();

  if (targetId) {
    loadMasterShareIntoEditor(targetId);
  } else {
    editingMasterShareId = null;
    resetForm();
    setEditorMode("master");
    updateMasterEditorStatus("Nenhum registro compartilhado para o mestre ainda.");
  }

  triggerSheetTransition();
  closeModeMenu(true);
  showMenuHome();
}

function renderAttributes(values = {}) {
  elements.attributesGrid.innerHTML = "";

  attributes
    .slice()
    .sort((a, b) => ATTRIBUTE_META[a.id].position - ATTRIBUTE_META[b.id].position)
    .forEach((attribute) => {
      const value = values[attribute.id] ?? 1;
      const meta = ATTRIBUTE_META[attribute.id];

      const node = document.createElement("div");
      node.className = `attribute-node pos-${meta.position}`;

      const rollButton = document.createElement("button");
      rollButton.type = "button";
      rollButton.className = "attribute-roll";
      rollButton.title = `Rolar d20 para ${attribute.label}`;

      const dieFrame = document.createElement("img");
      dieFrame.className = "attribute-die-frame";
      dieFrame.src = "icon-d20.png";
      dieFrame.alt = "";

      const valueText = document.createElement("span");
      valueText.className = "attribute-value";
      valueText.textContent = String(value);

      const labelText = document.createElement("span");
      labelText.className = "attribute-name";
      labelText.textContent = attribute.label.toUpperCase();

      const shortText = document.createElement("span");
      shortText.className = "attribute-short";
      shortText.textContent = meta.short;

      rollButton.appendChild(valueText);
      rollButton.appendChild(labelText);
      rollButton.appendChild(shortText);
      rollButton.addEventListener("click", () => rollAttribute(attribute));

      const controls = document.createElement("div");
      controls.className = "attribute-controls";

      const downButton = document.createElement("button");
      downButton.type = "button";
      downButton.className = "attr-step";
      downButton.textContent = "-";
      downButton.addEventListener("click", () => stepAttribute(attribute.id, -1, valueText));

      const upButton = document.createElement("button");
      upButton.type = "button";
      upButton.className = "attr-step";
      upButton.textContent = "+";
      upButton.addEventListener("click", () => stepAttribute(attribute.id, 1, valueText));

      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.id = `attr-${attribute.id}`;
      hiddenInput.value = String(value);

      controls.appendChild(downButton);
      controls.appendChild(upButton);

      node.appendChild(dieFrame);
      node.appendChild(rollButton);
      node.appendChild(controls);
      node.appendChild(hiddenInput);
      elements.attributesGrid.appendChild(node);
    });
}

function stepAttribute(attributeId, delta, valueDisplay) {
  const input = document.getElementById(`attr-${attributeId}`);
  if (!input) {
    return;
  }

  const current = readNumber(input.value) ?? 0;
  const next = clamp(current + delta, 0, 10);

  input.value = String(next);
  valueDisplay.textContent = String(next);
  updateDerivedSummary();
  queueAutoSave();

  if (attributeId === "intelecto") {
    updateSkillGuidance();
  }
}

function rollAttribute(attribute) {
  const diceCount = clampRollDiceCount(rollDiceCount);
  const rolls = rollDicePool(diceCount);
  const highest = Math.max(...rolls);
  const sum = rolls.reduce((total, value) => total + value, 0);
  const short = ATTRIBUTE_META[attribute.id]?.short || attribute.label;

  if (diceCount > 1) {
    setRollResult(
      `${attribute.label} (${short}): ${diceCount}d20 -> maior ${highest} | soma ${sum}`
    );
  } else {
    setRollResult(`${attribute.label} (${short}): ${diceCount}d20 -> maior ${highest}`);
  }
  recordRollHistory({
    kind: "Atributo",
    label: `${attribute.label} (${short})`,
    total: highest,
    detail: diceCount > 1 ? `Maior ${highest} • soma ${sum}` : `Resultado ${highest}`,
    rolls,
  });
  void showRollModal({
    title: `${attribute.label} (${short})`,
    rolls,
    highest,
    bonus: 0,
    total: highest,
    animateRoll: true,
  });
}

function renderSkills() {
  if (!elements.skillsGrid || !elements.skillSearch) {
    return;
  }

  const search = normalize(elements.skillSearch.value);
  elements.skillsGrid.innerHTML = "";
  const viewerMode = editorMode === "character" && characterSheetMode === "viewer";

  const filtered = skillsCatalog.filter((skill) => {
    const rank = getSkillRank(skill.name);
    if (viewerMode && rank === "Destreinado") {
      return false;
    }
    const haystack = normalize(`${skill.name} ${skill.attribute} ${skill.description}`);
    return haystack.includes(search);
  });

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhuma perícia encontrada para esse filtro.";
    elements.skillsGrid.appendChild(empty);
    updateSkillsCount();
    updateSkillGuidance();
    return;
  }

  filtered.forEach((skill) => {
    const rank = getSkillRank(skill.name);
    const bonus = SKILL_RANK_BONUS[rank];

    const card = document.createElement("div");
    card.className = `skill-card rank-${rank.toLowerCase()}`;

    const rollButton = document.createElement("button");
    rollButton.type = "button";
    rollButton.className = "skill-roll";
    rollButton.title = `Rolar d20 para ${skill.name}`;

    const dieLabel = document.createElement("span");
    dieLabel.className = "skill-die";
    dieLabel.textContent = `d20 +${bonus}`;

    const nameLabel = document.createElement("span");
    nameLabel.className = "skill-name";
    nameLabel.textContent = skill.name;

    const rankButton = document.createElement("button");
    rankButton.type = "button";
    rankButton.className = "skill-rank-toggle";
    rankButton.textContent = SKILL_RANK_SHORT_LABELS[rank];
    rankButton.title = "Clique para alternar o nível de treino";
    rankButton.disabled = viewerMode;

    rollButton.appendChild(dieLabel);
    rollButton.appendChild(nameLabel);

    rollButton.addEventListener("click", () => rollSkill(skill, rank));
    rankButton.addEventListener("click", () => {
      cycleSkillRank(skill.name);
      renderSkills();
    });

    card.appendChild(rollButton);
    if (!viewerMode) {
      card.appendChild(rankButton);
    }
    elements.skillsGrid.appendChild(card);
  });

  updateSkillsCount();
  updateSkillGuidance();
  renderSheetMetaPanels();
}

function rollSkill(skill, rank) {
  const bonus = SKILL_RANK_BONUS[rank] ?? 0;
  const diceCount = clampRollDiceCount(rollDiceCount);
  const rolls = rollDicePool(diceCount);
  const highest = Math.max(...rolls);
  const sum = rolls.reduce((totalValue, value) => totalValue + value, 0);
  const total = highest + bonus;
  const diceLabel = `${diceCount}d20`;

  if (diceCount > 1 && bonus > 0) {
    setRollResult(
      `${skill.name} (${SKILL_RANK_SHORT_LABELS[rank]}): ${diceLabel} -> maior ${highest} + ${bonus} = ${total} | soma ${sum}`
    );
  } else if (diceCount > 1) {
    setRollResult(`${skill.name}: ${diceLabel} -> maior ${highest} | soma ${sum}`);
  } else if (bonus > 0) {
    setRollResult(
      `${skill.name} (${SKILL_RANK_SHORT_LABELS[rank]}): ${diceLabel} -> ${formatTopRollLabel(rolls)} + ${bonus} = ${total}`
    );
  } else {
    setRollResult(`${skill.name}: ${diceLabel} -> ${formatTopRollLabel(rolls)}`);
  }

  recordRollHistory({
    kind: "Perícia",
    label: skill.name,
    total,
    detail: `${rank} • bônus ${bonus}`,
    rolls,
  });

  void showRollModal({
    title: skill.name,
    rolls,
    highest,
    bonus,
    total,
    animateRoll: true,
  });
}

function findAttributeByLabel(label) {
  return attributes.find((attribute) => normalize(attribute.label) === normalize(label));
}

function getSkillRank(skillName) {
  return skillRanks[skillName] || "Destreinado";
}

function cycleSkillRank(skillName) {
  const current = getSkillRank(skillName);
  const index = SKILL_RANKS.indexOf(current);
  const next = SKILL_RANKS[(index + 1) % SKILL_RANKS.length];

  if (next === "Destreinado") {
    delete skillRanks[skillName];
  } else {
    skillRanks[skillName] = next;
  }

  recordChangeHistory("Perícia alterada", `${skillName} • ${next}`);
  queueAutoSave();
  updateDerivedSummary();
}

function populateTrailOptions(selectedClass, selectedTrail = "") {
  elements.trail.innerHTML = "";

  if (!selectedClass || !trailsByClass[selectedClass]) {
    const option = new Option("Selecione a classe primeiro", "");
    elements.trail.add(option);
    elements.trail.disabled = true;
    updateTrailDescription();
    return;
  }

  elements.trail.disabled = false;
  elements.trail.add(new Option("Selecione", ""));

  trailsByClass[selectedClass].forEach((trail) => {
    elements.trail.add(new Option(trail.name, trail.name));
  });

  if (selectedTrail) {
    elements.trail.value = selectedTrail;
  }

  updateTrailDescription();
}

function updateTrailDescription() {
  const selectedClass = elements.classSelect.value;
  const selectedTrail = elements.trail.value;

  if (!selectedClass || !selectedTrail) {
    elements.trailDescription.textContent = "Selecione uma classe e trilha para ver a descrição.";
    return;
  }

  const trail = trailsByClass[selectedClass]?.find((item) => item.name === selectedTrail);
  elements.trailDescription.textContent = trail?.description || "Descrição da trilha não encontrada.";
}

function updateProfileIdentity() {
  const name = elements.name.value.trim();
  const selectedClass = elements.classSelect.value;
  const trail = elements.trail.value;
  const woundState = String(elements.wounds?.value || "").trim();
  const archiveSeed = editingId || elements.characterId?.value || name;
  const archiveCode = buildArchiveCode(archiveSeed);
  const recordState = woundState === "Morto"
    ? "registro encerrado"
    : woundState
      ? `alerta ${woundState.toLowerCase()}`
      : "registro ativo";

  elements.profileNameDisplay.textContent = name || "Novo Personagem";
  if (elements.profileRecordLine) {
    elements.profileRecordLine.textContent = `${archiveCode} // ${recordState}`;
  }
  if (elements.profileOmenLine) {
    elements.profileOmenLine.textContent = getProfileOmenLine();
  }

  if (selectedClass && trail) {
    elements.profileRoleDisplay.textContent = `${selectedClass} • ${trail}`;
    renderRoomsView();
    return;
  }

  if (selectedClass) {
    elements.profileRoleDisplay.textContent = selectedClass;
    renderRoomsView();
    return;
  }

  elements.profileRoleDisplay.textContent = "Classe e trilha";
  renderRoomsView();
}

function handleClassChange() {
  populateTrailOptions(elements.classSelect.value);
  updateSkillGuidance();
  updateProfileIdentity();
  renderInventory();
  updateDerivedSummary();
}

function handleTrailChange() {
  updateTrailDescription();
  updateProfileIdentity();
  renderInventory();
  updateDerivedSummary();
}

function handleBirthdateChange() {
  updateAgePreview();
}

function updateAgePreview() {
  const calculated = calculateAge(elements.birthdate.value);
  elements.agePreview.textContent =
    calculated === null ? "Idade: -" : `Idade: ${calculated}`;
  return calculated;
}

function calculateAge(dateInput) {
  if (!dateInput) {
    return null;
  }

  const birthDate = new Date(`${dateInput}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return Math.max(0, age);
}

function handleSaveCharacter(event) {
  event.preventDefault();

  try {
    const character = readFormData({ validateRequired: true });
    if (!character) {
      return;
    }

    persistEditorData(character, true);
  } catch (error) {
    console.error(error);
    const detail = error instanceof Error ? error.message : String(error);
    alert(`Não foi possível salvar o personagem.\n\nErro: ${detail}`);
  }
}

function handleShareCurrentToMaster() {
  if (editorMode === "master") {
    return;
  }

  const character = readFormData({ validateRequired: true });
  if (!character) {
    return;
  }

  persistCharacter(character, false);
  void shareCharacterToMaster(character.id);
}

function handleFormAutoSaveEvent(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (["skill-search", "master-search", "master-sheet-select"].includes(target.id)) {
    return;
  }

  if (target.id === "encounter-title" || target.id === "encounter-notes") {
    scheduleEncounterPanelRender();
  }

  if (["defense", "movement", "wounds"].includes(target.id)) {
    scheduleCombatHudRender();
  }

  if (event.type === "change") {
    const change = describeFieldChange(target);
    if (change) {
      recordChangeHistory(change.label, change.detail);
    }
  }

  queueAutoSave();
}

function queueAutoSave() {
  if (autoSaveTimer) {
    window.clearTimeout(autoSaveTimer);
  }

  setAutoSavePendingState(true);

  autoSaveTimer = window.setTimeout(() => {
    autoSaveTimer = null;
    autoSaveCharacter();
  }, AUTO_SAVE_DELAY);
}

function autoSaveCharacter() {
  const character = readFormData({ validateRequired: false });
  if (!character) {
    return;
  }

  persistEditorData(character, false);
}

function persistEditorData(character, showAlert) {
  if (editorMode === "master") {
    persistMasterShare(character, showAlert);
    return;
  }

  persistCharacter(character, showAlert);
}

function persistMasterShare(character, showAlert) {
  const record = getActiveMasterRecord();
  if (!record) {
    return;
  }

  const updatedRecord = {
    ...record,
    updatedAt: new Date().toISOString(),
    snapshot: {
      ...record.snapshot,
      ...character,
      id: record.snapshot?.id || character.id || generateId(),
      masterShareId: record.shareId,
      masterSharedAt: record.sharedAt,
      updatedAt: new Date().toISOString(),
    },
  };

  const index = masterShares.findIndex((item) => item.shareId === record.shareId);
  if (index !== -1) {
    masterShares[index] = updatedRecord;
    saveMasterShares(masterShares);
    void syncMasterShareRecordToFirebase(updatedRecord);
    syncLocalCharacterFromMasterRecord(updatedRecord);
    editingMasterShareId = updatedRecord.shareId;
    selectedMasterShareId = updatedRecord.shareId;
    setAutoSavePendingState(false);
    lastSavedAt = updatedRecord.updatedAt;
    renderMasterCharacterList();
    renderMasterSheetSwitcher();
    updateMasterEditorStatus();
    renderSheetMetaPanels();
    notifySheetSaved("Registro do mestre atualizado");
    if (showAlert) {
      alert("Registro do mestre salvo com sucesso.");
    }
  }
}

function persistCharacter(character, showAlert) {
  let savedCharacter = character;
  let updatedExisting = false;
  const targetId = editingId || character.id || "";
  const shareTimestamp = new Date().toISOString();

  if (targetId) {
    const index = characters.findIndex((item) => item.id === targetId);
    if (index !== -1) {
      const existing = characters[index];
      savedCharacter = ensureCharacterAutoMasterShareData({
        ...existing,
        ...character,
        createdAt: existing.createdAt,
      }, {
        ...existing,
        masterSharedAt: existing.masterSharedAt || shareTimestamp,
      });
      characters[index] = savedCharacter;
      updatedExisting = true;
    }
  }

  if (!updatedExisting) {
    savedCharacter = ensureCharacterAutoMasterShareData({
      ...character,
      id: character.id || targetId || generateId(),
      createdAt: character.createdAt || new Date().toISOString(),
    }, {
      masterSharedAt: shareTimestamp,
    });
    characters.push(savedCharacter);
  }

  saveCharacters(characters);
  editingId = savedCharacter.id;
  setPreferredOnlineCharacterId(savedCharacter.id);
  elements.characterId.value = savedCharacter.id;
  setAutoSavePendingState(false);
  lastSavedAt = savedCharacter.updatedAt || new Date().toISOString();

  try {
    syncCharacterToMaster(savedCharacter);
    if (!currentRoomId || savedCharacter.id === onlineCharacterId) {
      void syncCurrentRoomParticipant(savedCharacter);
    }
    void syncRoomEncounterState();
    renderCharacterList();
    highlightCurrentCard();
    updateCurrentShareActions();
    renderSheetMetaPanels();
    notifySheetSaved("Registro salvo");
  } catch (error) {
    console.error(error);
    renderCharacterList();
    notifySheetSaved("Registro salvo");
  }

  if (showAlert) {
    if (editorMode === "character") {
      try {
        setCharacterSheetMode("viewer");
      } catch (error) {
        console.error(error);
      }
    }
    alert("Personagem salvo com sucesso.");
  }
}

function readFormData(options = {}) {
  const { validateRequired = true } = options;
  const safeRead = (reader, fallback) => {
    try {
      return reader();
    } catch (error) {
      console.error(error);
      return fallback;
    }
  };
  const normalizeNexSnapshotValue = (value) => {
    const parsed = readNumber(value);
    const safe = clamp(parsed ?? 0, 0, 100);
    return Math.floor(safe / 5) * 5;
  };
  const existingCharacter = editorMode === "master"
    ? getActiveMasterRecord()?.snapshot || null
    : characters.find((item) => item.id === editingId) || null;
  const name = elements.name.value.trim();
  const selectedClass = elements.classSelect.value;
  const trail = elements.trail.value;

  if (!name) {
    if (validateRequired) {
      alert("Informe o nome do personagem.");
    }
    return null;
  }

  if (!selectedClass || !trail) {
    if (validateRequired) {
      alert("Selecione classe e trilha.");
    }
    return null;
  }

  const attributesData = {};
  attributes.forEach((attribute) => {
    attributesData[attribute.id] = readAttributeValue(attribute.id);
  });

  const orderedRanks = {};
  Object.keys(skillRanks && typeof skillRanks === "object" ? skillRanks : {})
    .filter((skillName) => SKILL_NAME_SET.has(skillName))
    .sort((a, b) => a.localeCompare(b))
    .forEach((skillName) => {
      orderedRanks[skillName] = skillRanks[skillName];
    });

  const pd = safeRead(() => readTrackValues(elements.pdMax.value, elements.pdLost.value), { max: 0, lost: 0, current: 0 });
  const san = safeRead(() => readTrackValues(elements.sanMax.value, elements.sanLost.value), { max: 0, lost: 0, current: 0 });
  const pe = safeRead(() => readTrackValues(elements.peMax.value, elements.peLost.value), { max: 0, lost: 0, current: 0 });
  const initiativeState = safeRead(readInitiativeData, { entries: [], round: 1, activeId: "" });

  return {
    id: existingCharacter?.id || editingId || generateId(),
    name,
    birthdate: elements.birthdate.value || "",
    origin: elements.origin.value.trim(),
    height: normalizeCharacterMeasure(elements.characterHeight?.value, "m"),
    weight: normalizeCharacterMeasure(elements.characterWeight?.value, "kg"),
    class: selectedClass,
    trail,
    wounds: elements.wounds?.value || "",
    appearance: elements.appearance.value.trim(),
    personality: elements.personality.value.trim(),
    internalConflict: elements.internalConflict.value.trim(),
    motivation: elements.motivation.value.trim(),
    profileImage: elements.profileImageData.value.trim() || "",
    profileImageFit: normalizeImageFit(elements.profileImageFit?.value, existingCharacter?.profileImageFit || "cover"),
    profileImagePositionX: getProfileImageSettings().x,
    profileImagePositionY: getProfileImageSettings().y,
    profileImageZoom: getProfileImageSettings().zoom,
    profileFrameShape: getProfileImageSettings().shape,
    attributes: attributesData,
    resources: {
      nex: normalizeNexSnapshotValue(elements.nex?.value),
      defense: readNumber(elements.defense.value),
      movement: elements.movement.value.trim(),
      pdMax: pd.max,
      pdLost: pd.lost,
      sanMax: san.max,
      sanLost: san.lost,
      peMax: pe.max,
      peLost: pe.lost,
    },
    inventory: safeRead(readInventoryData, []),
    combat: {
      attacks: elements.attacks.value.trim(),
      attackEntries: safeRead(readAttackEntriesData, []),
      items: elements.items.value.trim(),
      battleNotes: elements.battleNotes.value.trim(),
      encounterTitle: elements.encounterTitle?.value.trim() || "",
      encounterNotes: elements.encounterNotes?.value.trim() || "",
      abilities: safeRead(readAbilitiesData, []),
      initiativeEntries: initiativeState.entries,
      initiativeRound: initiativeState.round,
      activeInitiativeId: initiativeState.activeId,
      conditions: safeRead(readConditionStatesData, []),
      rollHistory: safeRead(readRollHistoryData, []),
      autoDerived: autoDerivedEnabled,
    },
    ui: {
      readMode: readModeEnabled,
      inAction: inActionEnabled,
      changeHistory: safeRead(readChangeHistoryData, []),
    },
    skillRanks: orderedRanks,
    masterShareId: existingCharacter?.masterShareId || "",
    masterSharedAt: existingCharacter?.masterSharedAt || "",
    updatedAt: new Date().toISOString(),
  };
}

function handleDeleteCharacter(characterId = editingId) {
  const targetId = characterId || editingId;
  if (!targetId) {
    return false;
  }

  const character = characters.find((item) => item.id === targetId);
  if (!character) {
    return false;
  }

  if (!confirm(`Excluir o personagem "${character.name}"?`)) {
    return false;
  }

  characters = characters.filter((item) => item.id !== targetId);
  saveCharacters(characters);

  const secretKey = targetId;
  if (masterSecretNotes[secretKey]) {
    const { [secretKey]: _removedNote, ...remainingNotes } = masterSecretNotes;
    masterSecretNotes = remainingNotes;
    saveMasterSecretNotes(masterSecretNotes);
  }

  const updatedSessions = getDiarySessions().map((session) => normalizeDiarySession({
    ...session,
    linkedCharacterIds: (Array.isArray(session.linkedCharacterIds) ? session.linkedCharacterIds : [])
      .filter((characterId) => characterId !== targetId),
  }));
  campaignDiary = {
    sessions: updatedSessions,
    updatedAt: new Date().toISOString(),
  };
  saveCampaignDiary(campaignDiary);

  if (character.masterShareId) {
    removeMasterShare(character.masterShareId);
  }

  if (editingId === targetId) {
    resetForm();
  }
  if (onlineCharacterId === targetId) {
    onlineCharacterId = "";
  }

  renderCharacterList();
  renderRoomsView();
  updateCurrentShareActions();
  return true;
}

function resetForm() {
  const safeUiStep = (action) => {
    try {
      action();
    } catch (error) {
      console.error(error);
    }
  };

  elements.form?.reset();
  elements.characterId.value = "";
  editingId = null;
  editingMasterShareId = null;
  skillRanks = {};
  inventoryItems = [];
  combatAbilities = [];
  attackEntries = [];
  initiativeEntries = [];
  initiativeRound = 1;
  activeInitiativeId = "";
  combatConditions = CONDITION_PRESETS.map((name) => createConditionState(name));
  rollHistoryEntries = [];
  changeHistoryEntries = [];
  selectedInventoryIndex = -1;
  inventoryPanelOpen = false;
  autoDerivedEnabled = false;
  selectedAbilityId = null;
  setAutoSavePendingState(false);
  lastSavedAt = "";
  safeUiStep(() => setCombatMode(false));
  safeUiStep(() => setInAction(false));
  safeUiStep(() => setReadMode(false));

  safeUiStep(() => renderAttributes());
  safeUiStep(() => populateTrailOptions(""));
  safeUiStep(renderSkills);
  safeUiStep(renderInventory);
  safeUiStep(renderAbilities);
  safeUiStep(renderAttacks);
  safeUiStep(renderInitiativeTracker);
  safeUiStep(renderEncounterPanel);
  safeUiStep(renderConditions);
  safeUiStep(renderRollHistory);

  if (elements.characterHeight) {
    elements.characterHeight.value = "";
  }
  if (elements.characterWeight) {
    elements.characterWeight.value = "";
  }

  elements.profileImageData.value = "";
  elements.profileImageFile.value = "";
  if (elements.profileImageFit) {
    elements.profileImageFit.value = "cover";
  }
  setProfileImageSettings({ x: 50, y: 50, zoom: 1, shape: "square" });
  safeUiStep(() => setProfilePreview("", "cover"));

  if (elements.defense) {
    elements.defense.value = "";
  }
  if (elements.movement) {
    elements.movement.value = "";
  }
  if (elements.pdMax) {
    elements.pdMax.value = "0";
  }
  if (elements.pdLost) {
    elements.pdLost.value = "0";
  }
  if (elements.peMax) {
    elements.peMax.value = "0";
  }
  if (elements.peLost) {
    elements.peLost.value = "0";
  }
  if (elements.sanMax) {
    elements.sanMax.value = "0";
  }
  if (elements.sanLost) {
    elements.sanLost.value = "0";
  }
  if (elements.nex) {
    elements.nex.value = "5";
  }
  if (elements.nexMax) {
    elements.nexMax.value = "100";
  }
  if (elements.nexLost) {
    elements.nexLost.value = "95";
  }

  safeUiStep(normalizeNexValue);
  safeUiStep(updateResourceBars);
  safeUiStep(updateDerivedSummary);
  safeUiStep(updateAgePreview);
  safeUiStep(updateProfileIdentity);
  safeUiStep(applyWoundState);
  safeUiStep(updateCurrentShareActions);
  safeUiStep(() => setRollResult("Clique em um atributo ou perícia para rolar d20 ou use o dado livre."));
  safeUiStep(clearCardHighlight);
  safeUiStep(() => setCharacterSheetMode("builder"));
  safeUiStep(renderSheetMetaPanels);
  safeUiStep(renderRoomsView);
}

function buildCharacterArchiveEntries() {
  const localEntries = [...characters]
    .map((rawCharacter) => migrateCharacter(rawCharacter))
    .filter((character) => character !== null)
    .map((character) => ({
      key: `character:${character.id}`,
      character,
      shareId: character.masterShareId || "",
      remoteRecord: null,
      isRemoteOnly: false,
      isOnline: false,
    }));

  if (!masterUnlocked) {
    return localEntries;
  }

  const localByShareId = new Map();
  const localByCharacterId = new Map();
  localEntries.forEach((entry) => {
    if (entry.shareId) {
      localByShareId.set(entry.shareId, entry);
    }
    if (entry.character?.id) {
      localByCharacterId.set(entry.character.id, entry);
    }
  });

  const remoteEntries = [];
  masterShares.forEach((record) => {
    const snapshot = migrateCharacter({
      ...(record?.snapshot || {}),
      id: record?.snapshot?.id || record?.sourceCharacterId || generateId(),
      masterShareId: record?.shareId || record?.snapshot?.masterShareId || "",
      masterSharedAt: record?.sharedAt || record?.snapshot?.masterSharedAt || "",
      updatedAt: record?.updatedAt || record?.snapshot?.updatedAt || new Date().toISOString(),
    });
    if (!snapshot) {
      return;
    }

    const localMatch = localByShareId.get(record.shareId) || localByCharacterId.get(snapshot.id);
    if (localMatch) {
      localMatch.remoteRecord = record;
      localMatch.isOnline = true;
      localMatch.character = {
        ...localMatch.character,
        ...snapshot,
        id: localMatch.character.id,
        createdAt: localMatch.character.createdAt,
        masterShareId: record.shareId || snapshot.masterShareId || localMatch.character.masterShareId || "",
        masterSharedAt: record.sharedAt || snapshot.masterSharedAt || localMatch.character.masterSharedAt || "",
        updatedAt: snapshot.updatedAt || record.updatedAt || localMatch.character.updatedAt,
      };
      return;
    }

    remoteEntries.push({
      key: `remote:${record.shareId}`,
      character: snapshot,
      shareId: record.shareId || "",
      remoteRecord: record,
      isRemoteOnly: true,
      isOnline: true,
    });
  });

  return [...localEntries, ...remoteEntries];
}

function openCharacterArchiveEntry(entry) {
  if (!entry?.character) {
    return;
  }

  if (entry.isRemoteOnly && entry.shareId) {
    loadMasterShareIntoEditor(entry.shareId);
  } else {
    loadCharacter(entry.character.id);
  }

  setView("create");
  triggerSheetTransition();
  closeModeMenu(true);
  showMenuHome();
}

function renderCharacterList() {
  if (!elements.menuCharactersList || !elements.menuCharacterSearch) {
    return;
  }

  elements.menuCharactersList.innerHTML = "";

  const filter = normalize(elements.menuCharacterSearch.value);
  const filtered = buildCharacterArchiveEntries()
    .sort((entryA, entryB) => (entryA.character.updatedAt < entryB.character.updatedAt ? 1 : -1))
    .filter((entry) => {
      const character = entry.character || {};
      const haystack = normalize(
        `${character.name} ${character.class} ${character.trail} ${character.origin || ""}`
      );
      return haystack.includes(filter);
    });

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = masterUnlocked
      ? "Nenhum registro local ou online disponível ainda."
      : "Nenhum personagem salvo ainda.";
    elements.menuCharactersList.appendChild(empty);
    return;
  }

  filtered.forEach((entry) => {
    const character = entry.character;
    const statusInfo = getCharacterArchiveStatus(character);
    const archiveCode = buildArchiveCode(character.id || character.name);
    const archiveMeta = [
      character.class || "",
      character.trail || "",
      character.origin || "",
    ].filter(Boolean).join(" • ") || "Sem classificação";
    const inventoryCount = Array.isArray(character.inventory)
      ? character.inventory.filter((item) => isInventoryItemFilled(item)).length
      : 0;
    const nexValue = clamp(Number(character.resources?.nex) || 0, 0, 100);
    const signalLine = [
      `NEX ${nexValue}%`,
      entry.isOnline ? "sincronizado online" : "arquivo local",
      inventoryCount > 0
        ? `${inventoryCount} item${inventoryCount === 1 ? "" : "s"}`
        : "sem evidências",
      character.wounds ? character.wounds : "estável",
    ].join(" // ");
    const updatedLabel = character.updatedAt
      ? `Último ruído • ${formatDateTime(character.updatedAt)}`
      : "Último ruído • sem registro";

    const card = document.createElement("article");
    card.className = "menu-character-card";
    card.dataset.id = character.id;
    card.dataset.status = statusInfo.className;

    const cardMain = document.createElement("div");
    cardMain.className = "menu-card-main";

    const avatar = document.createElement("img");
    avatar.className = "menu-card-avatar";
    avatar.alt = `Avatar de ${character.name}`;
    avatar.src = character.profileImage || defaultAvatar;
    applyProfileImageSettingsToElement(avatar, getCharacterProfileImageSettings(character));
    avatar.classList.add(`frame-shape-${normalizeProfileFrameShape(character.profileFrameShape)}`);

    const content = document.createElement("div");
    content.className = "menu-card-content";

    const archiveLabel = document.createElement("p");
    archiveLabel.className = "menu-card-archive";
    archiveLabel.textContent = entry.isRemoteOnly ? "Registro online" : "Registro arquivado";

    const codeLabel = document.createElement("p");
    codeLabel.className = "menu-card-code";
    codeLabel.textContent = archiveCode;

    const title = document.createElement("h3");
    title.textContent = character.name;

    const status = document.createElement("span");
    status.className = `menu-card-status ${statusInfo.className}`;
    status.textContent = statusInfo.label;

    const meta = document.createElement("p");
    meta.className = "menu-card-meta";
    meta.textContent = archiveMeta;

    const signal = document.createElement("p");
    signal.className = "menu-card-signal";
    signal.textContent = signalLine;

    const updated = document.createElement("p");
    updated.className = "menu-card-updated";
    updated.textContent = updatedLabel;

    content.appendChild(archiveLabel);
    content.appendChild(codeLabel);
    content.appendChild(title);
    content.appendChild(meta);
    content.appendChild(signal);
    content.appendChild(updated);
    content.appendChild(status);

    cardMain.appendChild(avatar);
    cardMain.appendChild(content);
    cardMain.addEventListener("click", () => {
      openCharacterArchiveEntry(entry);
    });

    const cardActions = document.createElement("div");
    cardActions.className = "menu-card-actions";

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "menu-open-btn";
    openButton.textContent = "Abrir";
    openButton.addEventListener("click", () => {
      triggerMenuButtonAnimation(openButton);
      openCharacterArchiveEntry(entry);
    });

    if (character.id === editingId || (entry.isRemoteOnly && entry.shareId === editingMasterShareId)) {
      card.classList.add("active");
    }

    cardActions.appendChild(openButton);

    if (!entry.isRemoteOnly) {
      const linkButton = document.createElement("button");
      linkButton.type = "button";
      linkButton.className = "menu-share-btn";
      linkButton.textContent = "Link";
      linkButton.addEventListener("click", () => {
        triggerMenuButtonAnimation(linkButton);
        void shareCharacterByLink(character.id);
      });

      const masterButton = document.createElement("button");
      masterButton.type = "button";
      masterButton.className = character.masterShareId
        ? "menu-master-share-btn active"
        : "menu-master-share-btn";
      masterButton.textContent = "Atualizar Mestre";
      masterButton.addEventListener("click", () => {
        triggerMenuButtonAnimation(masterButton);
        void shareCharacterToMaster(character.id);
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "menu-delete-btn";
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => {
        triggerMenuButtonAnimation(deleteButton);
        handleDeleteCharacter(character.id);
      });

      cardActions.appendChild(linkButton);
      cardActions.appendChild(masterButton);
      cardActions.appendChild(deleteButton);
    }

    card.appendChild(cardMain);
    card.appendChild(cardActions);
    elements.menuCharactersList.appendChild(card);
  });
}

function renderMasterCharacterList() {
  if (!elements.masterCharactersList) {
    return;
  }

  elements.masterCharactersList.innerHTML = "";

  const filter = normalize(elements.masterSearch.value);
  const filtered = [...masterShares]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .filter((record) => {
      const snapshot = record.snapshot || {};
      const haystack = normalize(
        `${snapshot.name || ""} ${snapshot.class || ""} ${snapshot.trail || ""} ${snapshot.origin || ""}`
      );
      return haystack.includes(filter);
    });

  if (!filtered.some((record) => record.shareId === selectedMasterShareId)) {
    selectedMasterShareId = filtered[0]?.shareId || null;
  }

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum registro compartilhado com o mestre ainda.";
    elements.masterCharactersList.appendChild(empty);
    renderMasterCharacterDetail();
    return;
  }

  filtered.forEach((record) => {
    const snapshot = record.snapshot || {};
    const resources = snapshot.resources || {};
    const pdInfo = deriveTrack(resources.pdMax, resources.pdLost);
    const archiveCode = buildArchiveCode(snapshot.id || record.shareId || snapshot.name);
    const nexValue = clamp(Number(resources.nex) || 0, 0, 100);
    const signalLine = [
      `NEX ${nexValue}%`,
      snapshot.wounds ? snapshot.wounds : "Estável",
    ].join(" • ");

    const button = document.createElement("button");
    button.type = "button";
    button.className = record.shareId === selectedMasterShareId
      ? "master-character-card active"
      : "master-character-card";
    button.addEventListener("click", () => {
      selectedMasterShareId = record.shareId;
      renderMasterCharacterList();
      renderMasterCharacterDetail();
    });

    const liveLabel = isMasterLive(record.updatedAt) ? "Ativo" : "Sincronizado";
    button.innerHTML = `
      <div class="master-character-card-top">
        <img class="master-character-card-avatar" style="--image-fit:${escapeHtml(normalizeImageFit(snapshot.profileImageFit))}" src="${escapeHtml(snapshot.profileImage || defaultAvatar)}" alt="Avatar de ${escapeHtml(snapshot.name || "Personagem")}">
        <div class="master-character-card-copy">
          <p class="master-character-card-case">${escapeHtml(archiveCode)}</p>
          <h3>${escapeHtml(snapshot.name || "Personagem")}</h3>
          <p>${escapeHtml(snapshot.class || "-" )} • ${escapeHtml(snapshot.trail || "-")}</p>
          <p>${escapeHtml(snapshot.origin || "Sem origem")}</p>
          <p class="master-character-card-physical">${escapeHtml(formatCharacterPhysicalLine(snapshot))}</p>
          <p class="master-character-card-signal">${escapeHtml(signalLine)}</p>
        </div>
      </div>
      <div class="master-character-card-bottom">
        <span class="master-character-live ${isMasterLive(record.updatedAt) ? "active" : ""}">${liveLabel}</span>
        <span>PV ${escapeHtml(formatTrack(pdInfo))}</span>
        <span>${escapeHtml(formatMasterUpdatedAt(record.updatedAt))}</span>
      </div>
    `;

    elements.masterCharactersList.appendChild(button);
  });

  renderMasterCharacterDetail();
}

function getMasterSecretNoteStorageKey(record) {
  return record?.sourceCharacterId || record?.snapshot?.id || record?.shareId || "";
}

function getMasterSecretNote(record) {
  const key = getMasterSecretNoteStorageKey(record);
  return key ? String(masterSecretNotes[key] || "") : "";
}

function setMasterSecretNote(record, value) {
  const key = getMasterSecretNoteStorageKey(record);
  if (!key) {
    return;
  }

  masterSecretNotes = {
    ...masterSecretNotes,
    [key]: String(value || ""),
  };
  saveMasterSecretNotes(masterSecretNotes);
}

function getLinkedDiarySessionsForCharacter(characterId) {
  if (!characterId) {
    return [];
  }

  return getDiarySessions()
    .filter((session) => Array.isArray(session.linkedCharacterIds) && session.linkedCharacterIds.includes(characterId))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);
}

function renderMasterCharacterDetail() {
  if (!elements.masterCharacterDetail) {
    return;
  }

  const record = masterShares.find((item) => item.shareId === selectedMasterShareId) || null;
  if (!record) {
    elements.masterCharacterDetail.innerHTML = `
      <div class="master-detail-empty">
        <h3>Nenhum registro compartilhado</h3>
        <p>Quando um jogador enviar o registro para o mestre, ele aparecera aqui.</p>
      </div>
    `;
    return;
  }

  const snapshot = record.snapshot || {};
  const resources = snapshot.resources || {};
  const pdInfo = deriveTrack(resources.pdMax, resources.pdLost);
  const sanInfo = deriveTrack(resources.sanMax, resources.sanLost);
  const peInfo = deriveTrack(resources.peMax, resources.peLost);
  const birthLabel = snapshot.birthdate
    ? `${formatDisplayDate(snapshot.birthdate)}${calculateAge(snapshot.birthdate) !== null ? ` • ${calculateAge(snapshot.birthdate)} anos` : ""}`
    : "-";
  const trailDescription = getTrailDescription(snapshot.class, snapshot.trail);
  const archiveCode = buildArchiveCode(snapshot.id || record.shareId || snapshot.name);
  const masterSignalLine = [
    resources.nex === null || resources.nex === undefined ? "NEX -" : `NEX ${resources.nex}%`,
    snapshot.wounds ? snapshot.wounds : "Estável",
    snapshot.origin || "Sem origem",
  ].join(" // ");
  const skillsMarkup = skillsCatalog
    .map((skill) => {
      const rank = snapshot.skillRanks?.[skill.name] || "Destreinado";
      const bonus = SKILL_RANK_BONUS[rank] || 0;
      return `
        <article class="master-skill-card rank-${normalize(rank)}">
          <h4>${escapeHtml(skill.name)}</h4>
          <p>${escapeHtml(skill.attribute)} • ${escapeHtml(SKILL_RANK_SHORT_LABELS[rank] || rank)}${bonus > 0 ? ` (+${bonus})` : ""}</p>
        </article>
      `;
    })
    .join("");

  const inventoryItemsFilled = Array.isArray(snapshot.inventory)
    ? snapshot.inventory.filter((item) => isInventoryItemFilled(item))
    : [];
  const equippedInventory = Array.isArray(snapshot.inventory)
    ? snapshot.inventory.map((item) => normalizeInventoryItem(item)).filter((item) => item.equipped)
    : [];
  const equipmentDefense = equippedInventory.reduce((sum, item) => sum + item.defenseBonus, 0);
  const cursedSanPenalty = equippedInventory.reduce((sum, item) => sum + Math.max(0, item.sanPenalty), 0);
  const masterDefenseLabel = resources.defense === null || resources.defense === undefined
    ? "-"
    : String((Number(resources.defense) || 0) + equipmentDefense);
  const masterSanLabel = sanInfo.max === null || sanInfo.max === undefined
    ? "-/-"
    : cursedSanPenalty > 0
      ? `${sanInfo.current}/${Math.max(0, sanInfo.max - cursedSanPenalty)}`
      : formatTrack(sanInfo);

  const inventoryMarkup = inventoryItemsFilled.length > 0
    ? inventoryItemsFilled
        .map((item) => `
          <article class="master-item-card">
            <img style="--image-fit:${escapeHtml(normalizeImageFit(item.imageFit))}" src="${escapeHtml(item.image || defaultItemIcon)}" alt="${escapeHtml(item.name || "Item")}">
            <div>
              <h4>${escapeHtml(item.name || "Item sem nome")}</h4>
              <p>${escapeHtml(item.description || "Sem descrição.")}</p>
            </div>
          </article>
        `)
        .join("")
    : '<p class="empty-state">Nenhum item preenchido no inventário.</p>';

  const attackEntriesFilled = deriveAttackEntries(snapshot)
    .filter((entry) =>
      entry.name.trim()
      || entry.damage.trim()
      || entry.range.trim()
      || entry.notes.trim()
      || entry.ammoMax > 0
      || entry.chargesMax > 0
      || entry.bonus !== 0
      || entry.peCost > 0
    );
  const attacksMarkup = attackEntriesFilled.length > 0
    ? `
      <div class="master-attack-grid">
        ${attackEntriesFilled
          .map((entry) => `
            <article class="master-attack-card">
              <div class="master-attack-top">
                <h4>${escapeHtml(entry.name || "Ataque sem nome")}</h4>
                <span>${escapeHtml(entry.skill)}${entry.bonus ? ` • +${escapeHtml(String(entry.bonus))}` : ""}</span>
              </div>
              <p>${escapeHtml(entry.category)} • Dano ${escapeHtml(entry.damage || "-")} • Crit ${escapeHtml(entry.critical || "-")}</p>
              <p>Alcance ${escapeHtml(entry.range || "-")} • ${escapeHtml(getAttackResourceSummary(normalizeAttackEntry(entry)))} • PE ${escapeHtml(String(entry.peCost || 0))}</p>
              <p>${escapeHtml(entry.notes || "Sem observações.")}</p>
            </article>
          `)
          .join("")}
      </div>
    `
    : '<p class="empty-state">Nenhum ataque pronto cadastrado.</p>';

  const abilityEntries = Array.isArray(snapshot.combat?.abilities)
    ? snapshot.combat.abilities.filter((ability) => ability?.name || ability?.description)
    : [];
  const abilitiesMarkup = abilityEntries.length > 0
    ? `
      <div class="master-attack-grid">
        ${abilityEntries
          .map((abilityEntry) => {
            const ability = normalizeAbility(abilityEntry);
            return `
            <article class="master-attack-card ${ability.special ? "special" : ""}">
              <div class="master-attack-top">
                <h4>${escapeHtml(ability.name || "Habilidade sem nome")}</h4>
                <span>${escapeHtml(ability.special ? "Especial" : "Comum")} • PE ${escapeHtml(String(ability.peCost || 0))}</span>
              </div>
              <p>${escapeHtml(ability.description || "Sem descrição.")}</p>
              <p>${escapeHtml(ability.skill || "-")}${ability.bonus ? ` • bônus ${ability.bonus >= 0 ? "+" : ""}${escapeHtml(String(ability.bonus))}` : ""}${ability.damage ? ` • dano ${escapeHtml(ability.damage)}` : ""}${ability.chargesMax > 0 ? ` • cargas ${escapeHtml(String(ability.chargesCurrent))}/${escapeHtml(String(ability.chargesMax))}` : ""}</p>
            </article>
          `;
          })
          .join("")}
      </div>
    `
    : '<p class="empty-state">Nenhuma habilidade especial cadastrada.</p>';

  const activeConditions = Array.isArray(snapshot.combat?.conditions)
    ? snapshot.combat.conditions
      .map((condition) => normalizeConditionState(condition))
      .filter((condition) => condition.active)
    : [];
  const conditionsMarkup = activeConditions.length > 0
    ? `
      <div class="master-pill-list">
        ${activeConditions
          .map((condition) => `<span class="master-pill">${escapeHtml(condition.name)}${condition.turns ? ` • ${escapeHtml(String(condition.turns))}t` : ""}</span>`)
          .join("")}
      </div>
    `
    : '<p class="empty-state">Nenhuma condição ativa.</p>';

  const initiativeEntriesView = Array.isArray(snapshot.combat?.initiativeEntries)
    ? snapshot.combat.initiativeEntries
      .map((entry) => normalizeInitiativeEntry(entry))
      .filter((entry) => entry.name.trim())
      .sort((a, b) => b.initiative - a.initiative)
    : [];
  const initiativeMarkup = initiativeEntriesView.length > 0
    ? `
      <div class="master-initiative-list">
        ${initiativeEntriesView
          .map((entry) => `
            <article class="master-initiative-row${entry.id === snapshot.combat?.activeInitiativeId ? " active" : ""}">
              <strong>${escapeHtml(entry.name)}</strong>
              <span>${escapeHtml(String(entry.initiative))}</span>
              <span>${escapeHtml(entry.tag || "-")}</span>
            </article>
          `)
          .join("")}
      </div>
    `
    : '<p class="empty-state">Nenhuma iniciativa registrada.</p>';

  const rollHistoryMarkup = Array.isArray(snapshot.combat?.rollHistory) && snapshot.combat.rollHistory.length > 0
    ? `
      <div class="master-history-list">
        ${snapshot.combat.rollHistory
          .slice(0, 8)
          .map((entry) => `
            <article class="master-history-item">
              <div>
                <strong>${escapeHtml(entry.kind || "Rolagem")} • ${escapeHtml(entry.label || "Teste")}</strong>
                <p>${escapeHtml(entry.detail || "Sem detalhe")} • ${escapeHtml(formatDateTime(entry.at))}</p>
              </div>
              <span>${escapeHtml(String(entry.total ?? 0))}</span>
            </article>
          `)
          .join("")}
      </div>
    `
    : '<p class="empty-state">Nenhuma rolagem registrada ainda.</p>';

  const noteEntries = [
    { label: "Aparência", value: snapshot.appearance },
    { label: "Personalidade", value: snapshot.personality },
    { label: "Conflito Interno", value: snapshot.internalConflict },
    { label: "Motivação", value: snapshot.motivation },
    { label: "Itens e Equipamentos", value: snapshot.combat?.items },
    { label: "Notas de Combate", value: snapshot.combat?.battleNotes },
  ].filter((entry) => entry.value);

  const notesMarkup = noteEntries.length > 0
    ? `
      <section class="master-section">
        <h3>Detalhes Extras</h3>
        <div class="master-notes-grid">
          ${noteEntries
            .map((entry) => `
              <article class="master-note-card">
                <h4>${escapeHtml(entry.label)}</h4>
                <p>${escapeHtml(entry.value)}</p>
              </article>
            `)
            .join("")}
        </div>
      </section>
    `
    : "";
  const linkedSessions = getLinkedDiarySessionsForCharacter(snapshot.id);
  const linkedSessionsMarkup = linkedSessions.length > 0
    ? `
      <section class="master-section">
        <h3>Sessões Ligadas</h3>
        <div class="master-notes-grid">
          ${linkedSessions
            .map((session) => `
              <article class="master-note-card">
                <h4>${escapeHtml(session.title || "Sessão")}</h4>
                <p>${escapeHtml(session.summary || "Sem resumo rápido.")}</p>
              </article>
            `)
            .join("")}
        </div>
      </section>
    `
    : "";
  const secretNote = getMasterSecretNote(record);
  const secretNotesMarkup = `
    <section class="master-section">
      <h3>Notas Secretas do Mestre</h3>
      <div class="master-secret-note-card">
        <textarea
          data-master-secret-note="${escapeHtml(getMasterSecretNoteStorageKey(record))}"
          rows="5"
          placeholder="Pistas, corrupção, segredos, gatilhos, paranoia..."
        >${escapeHtml(secretNote)}</textarea>
        <p class="hint">Essas observações não aparecem para os jogadores.</p>
      </div>
    </section>
  `;

  elements.masterCharacterDetail.innerHTML = `
    <div class="master-detail-shell">
      <section class="master-detail-hero">
        <img class="master-detail-avatar" style="--image-fit:${escapeHtml(normalizeImageFit(snapshot.profileImageFit))}" src="${escapeHtml(snapshot.profileImage || defaultAvatar)}" alt="Avatar de ${escapeHtml(snapshot.name || "Personagem")}">
        <div class="master-detail-copy">
          <p class="master-detail-case">${escapeHtml(archiveCode)}</p>
          <p class="master-detail-updated">${escapeHtml(formatMasterUpdatedAt(record.updatedAt))}</p>
          <h3>${escapeHtml(snapshot.name || "Personagem")}</h3>
          <p class="master-detail-role">${escapeHtml(snapshot.class || "-")} • ${escapeHtml(snapshot.trail || "-")}</p>
          <p class="master-detail-origin">Origem: ${escapeHtml(snapshot.origin || "-")}</p>
          <p class="master-detail-origin">Medidas: ${escapeHtml(formatCharacterPhysicalLine(snapshot))}</p>
          <p class="master-detail-signal">${escapeHtml(masterSignalLine)}</p>
          <p class="master-detail-trail">${escapeHtml(trailDescription || "Sem descrição de trilha.")}</p>
        </div>
      </section>

      <section class="master-section">
        <h3>Perfil</h3>
        <div class="master-meta-grid">
          <article class="master-meta-card"><span>Nascimento</span><strong>${escapeHtml(birthLabel)}</strong></article>
          <article class="master-meta-card"><span>Altura</span><strong>${escapeHtml(snapshot.height || "-")}</strong></article>
          <article class="master-meta-card"><span>Peso</span><strong>${escapeHtml(snapshot.weight || "-")}</strong></article>
          <article class="master-meta-card"><span>NEX</span><strong>${escapeHtml(resources.nex === null || resources.nex === undefined ? "-" : `${resources.nex}%`)}</strong></article>
          <article class="master-meta-card"><span>Defesa</span><strong>${escapeHtml(masterDefenseLabel)}</strong></article>
          <article class="master-meta-card"><span>Deslocamento</span><strong>${escapeHtml(resources.movement || "-")}</strong></article>
        </div>
      </section>

      <section class="master-section">
        <h3>Recursos</h3>
        <div class="master-resource-grid">
          <article class="master-resource-card pd"><span>PV</span><strong>${escapeHtml(formatTrack(pdInfo))}</strong></article>
          <article class="master-resource-card san"><span>SAN</span><strong>${escapeHtml(masterSanLabel)}</strong></article>
          <article class="master-resource-card pe"><span>PE</span><strong>${escapeHtml(formatTrack(peInfo))}</strong></article>
        </div>
      </section>

      <section class="master-section">
        <h3>Atributos</h3>
        <div class="master-attributes-grid">
          ${attributes
            .map((attribute) => `
              <article class="master-attribute-card">
                <span>${escapeHtml(attribute.label)}</span>
                <strong>${escapeHtml(String(snapshot.attributes?.[attribute.id] ?? 1))}</strong>
              </article>
            `)
            .join("")}
        </div>
      </section>

      <section class="master-section">
        <h3>Perícias</h3>
        <div class="master-skills-grid">${skillsMarkup}</div>
      </section>

      <section class="master-section">
        <h3>Arsenal e Ataques</h3>
        ${attacksMarkup}
      </section>

      <section class="master-section">
        <h3>Habilidades</h3>
        ${abilitiesMarkup}
      </section>

      <section class="master-section">
        <h3>Condições</h3>
        ${conditionsMarkup}
      </section>

      <section class="master-section">
        <h3>Iniciativa</h3>
        <p class="hint">Rodada atual: ${escapeHtml(String(snapshot.combat?.initiativeRound || 1))}</p>
        ${initiativeMarkup}
      </section>

      <section class="master-section">
        <h3>Histórico de Rolagens</h3>
        ${rollHistoryMarkup}
      </section>

      <section class="master-section">
        <h3>Inventário</h3>
        <div class="master-inventory-grid">${inventoryMarkup}</div>
      </section>

      ${notesMarkup}
      ${linkedSessionsMarkup}
      ${secretNotesMarkup}
    </div>
  `;
}

function handleMasterSecretNotesInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLTextAreaElement) || !target.matches("[data-master-secret-note]")) {
    return;
  }

  const record = masterShares.find((item) => item.shareId === selectedMasterShareId) || null;
  if (!record) {
    return;
  }

  setMasterSecretNote(record, target.value);
}

function applyCharacterDataToForm(character) {
  const safeUiStep = (action) => {
    try {
      action();
    } catch (error) {
      console.error(error);
    }
  };

  elements.characterId.value = character.id || "";
  elements.name.value = character.name || "";
  elements.birthdate.value = character.birthdate || "";
  elements.origin.value = character.origin || "";
  if (elements.characterHeight) {
    elements.characterHeight.value = character.height || "";
  }
  if (elements.characterWeight) {
    elements.characterWeight.value = character.weight || "";
  }
  if (elements.wounds) {
    elements.wounds.value = character.wounds || "";
  }

  elements.classSelect.value = character.class || "";
  populateTrailOptions(character.class, character.trail);

  elements.appearance.value = character.appearance || "";
  elements.personality.value = character.personality || "";
  elements.internalConflict.value = character.internalConflict || "";
  elements.motivation.value = character.motivation || "";

  const resources = character.resources || {};
  elements.nex.value = resources.nex ?? "";
  elements.defense.value = resources.defense ?? "";
  elements.movement.value = resources.movement || "";
  elements.pdMax.value = resources.pdMax ?? "";
  elements.pdLost.value = resources.pdLost ?? "";
  elements.sanMax.value = resources.sanMax ?? "";
  elements.sanLost.value = resources.sanLost ?? "";
  elements.peMax.value = resources.peMax ?? "";
  elements.peLost.value = resources.peLost ?? "";

  const combat = character.combat || {};
  elements.attacks.value = combat.attacks || "";
  elements.items.value = combat.items || "";
  elements.battleNotes.value = combat.battleNotes || "";
  if (elements.encounterTitle) {
    elements.encounterTitle.value = combat.encounterTitle || "";
  }
  if (elements.encounterNotes) {
    elements.encounterNotes.value = combat.encounterNotes || "";
  }
  attackEntries = deriveAttackEntries(character);
  deriveInitiativeState(character);
  deriveConditionStates(character);
  deriveRollHistoryEntries(character);
  deriveChangeHistoryEntries(character);
  autoDerivedEnabled = false;
  combatAbilities = deriveCombatAbilities(character);
  selectedInventoryIndex = -1;
  selectedAbilityId = null;
  safeUiStep(renderAbilities);
  safeUiStep(renderAttacks);
  safeUiStep(renderInitiativeTracker);
  safeUiStep(renderEncounterPanel);
  safeUiStep(renderConditions);
  safeUiStep(renderRollHistory);

  safeUiStep(() => renderAttributes(character.attributes || {}));
  skillRanks = deriveSkillRanks(character);
  safeUiStep(renderSkills);
  inventoryItems = deriveInventoryItems(character);
  safeUiStep(renderInventory);

  elements.profileImageData.value = character.profileImage || "";
  elements.profileImageFile.value = "";
  if (elements.profileImageFit) {
    elements.profileImageFit.value = normalizeImageFit(character.profileImageFit);
  }
  setProfileImageSettings({
    x: character.profileImagePositionX ?? 50,
    y: character.profileImagePositionY ?? 50,
    zoom: character.profileImageZoom ?? 1,
    shape: character.profileFrameShape || "square",
  });
  safeUiStep(() => setProfilePreview(character.profileImage || "", character.profileImageFit));

  safeUiStep(normalizeNexValue);
  safeUiStep(updateAgePreview);
  safeUiStep(updateProfileIdentity);
  safeUiStep(updateResourceBars);
  safeUiStep(updateDerivedSummary);
  safeUiStep(() => setInAction(Boolean(character.ui?.inAction)));
  safeUiStep(() => setReadMode(Boolean(character.ui?.readMode)));
  safeUiStep(applyWoundState);
  lastSavedAt = character.updatedAt || "";
  setAutoSavePendingState(false);
  safeUiStep(renderSheetMetaPanels);
  safeUiStep(renderRoomsView);
}

function loadMasterShareIntoEditor(shareId) {
  const record = masterShares.find((item) => item.shareId === shareId);
  if (!record) {
    return;
  }

  try {
    setEditorMode("master");
  } catch (error) {
    console.error(error);
  }
  editingMasterShareId = record.shareId;
  selectedMasterShareId = record.shareId;
  editingId = null;
  applyCharacterDataToForm(record.snapshot || {});
  renderMasterSheetSwitcher();
  updateMasterEditorStatus();
}

function loadCharacter(id) {
  const rawCharacter = characters.find((item) => item.id === id);
  const character = migrateCharacter(rawCharacter);
  if (!character) {
    return;
  }

  try {
    editingMasterShareId = null;
    editingId = character.id;
    setPreferredOnlineCharacterId(character.id);
    try {
      setEditorMode("character");
    } catch (error) {
      console.error(error);
    }
    try {
      applyCharacterDataToForm(character);
    } catch (error) {
      console.error(error);
    }
    inventoryPanelOpen = false;
    try {
      setCharacterSheetMode("viewer");
    } catch (error) {
      console.error(error);
    }
    try {
      highlightCurrentCard();
    } catch (error) {
      console.error(error);
    }
    try {
      if (!currentRoomId || character.id === onlineCharacterId) {
        void syncCurrentRoomParticipant(character);
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    const detail = error instanceof Error ? error.message : String(error);
    alert(`Não foi possível abrir esse personagem salvo.\n\nErro: ${detail}`);
  }
}

function deriveSkillRanks(character) {
  const mapped = {};

  if (character && character.skillRanks && typeof character.skillRanks === "object") {
    Object.entries(character.skillRanks).forEach(([skill, rank]) => {
      if (SKILL_NAME_SET.has(skill) && SKILL_RANKS.includes(rank) && rank !== "Destreinado") {
        mapped[skill] = rank;
      }
    });
  }

  if (Object.keys(mapped).length === 0 && Array.isArray(character?.skills)) {
    character.skills.forEach((skill) => {
      if (SKILL_NAME_SET.has(skill)) {
        mapped[skill] = "Treinado";
      }
    });
  }

  return mapped;
}

function updateSkillsCount() {
  if (!elements.skillsCount) {
    return;
  }
  const trained = Object.keys(skillRanks).filter((skillName) => SKILL_NAME_SET.has(skillName)).length;
  elements.skillsCount.textContent = trained === 1 ? "1 treinada" : `${trained} treinadas`;
}

function updateSkillGuidance() {
  if (!elements.skillsHint || !elements.classSelect) {
    return;
  }
  const selectedClass = elements.classSelect.value;
  const intellect = readAttributeValue("intelecto");
  const trained = Object.keys(skillRanks).filter((skillName) => SKILL_NAME_SET.has(skillName)).length;

  if (!selectedClass) {
    elements.skillsHint.textContent =
      "Selecione a classe para ver a base sugerida de perícias treinadas.";
    return;
  }

  const target = selectedClass === "Combatente" ? 6 + intellect : 7 + intellect;
  const diff = target - trained;

  if (diff > 0) {
    elements.skillsHint.textContent =
      `Base sugerida (${target}) para ${selectedClass}: faltam ${diff} perícias treinadas.`;
  } else if (diff < 0) {
    elements.skillsHint.textContent =
      `Base sugerida (${target}) para ${selectedClass}: você está ${Math.abs(diff)} acima.`;
  } else {
    elements.skillsHint.textContent =
      `Base sugerida (${target}) para ${selectedClass}: você está no ponto.`;
  }
}

function getInventorySlotsForTrail(trailName) {
  return normalize(trailName) === "tecnico" ? 19 : 7;
}

function getInventoryWeightLimit() {
  const forca = readAttributeValue("forca");
  const vigor = readAttributeValue("vigor");
  return Math.max(20, 10 + ((forca || 0) + (vigor || 0)) * 5);
}

function getInventoryItemStatus(item) {
  const rawStatus = typeof item?.status === "string" ? item.status : "";
  if (INVENTORY_ITEM_STATUSES.includes(rawStatus)) {
    return rawStatus;
  }
  if (item?.equipped) {
    return "Equipado";
  }
  return "Guardado";
}

function isInventoryItemFilled(item) {
  const normalized = normalizeInventoryItem(item);
  return Boolean(
    normalized.name
    || normalized.description
    || normalized.image
    || normalized.note
    || normalized.linkedAttack
    || normalized.attackBonus
    || normalized.damageBonus
    || normalized.defenseBonus
    || normalized.sanPenalty
    || normalized.weight
    || normalized.chargesCurrent
    || normalized.chargesMax
    || getInventoryItemStatus(normalized) !== "Guardado"
    || normalized.type !== "Outro"
    || normalized.rarity !== "Comum"
  );
}

function getInventoryWeightUsed(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((item) => normalizeInventoryItem(item))
    .filter((item) => isInventoryItemFilled(item) && !["Perdido", "Gasto"].includes(getInventoryItemStatus(item)))
    .reduce((sum, item) => sum + Math.max(0, item.weight || 0), 0);
}

function buildInventoryCategorySummary(items = []) {
  const summary = new Map();
  (Array.isArray(items) ? items : [])
    .map((item) => normalizeInventoryItem(item))
    .filter((item) => isInventoryItemFilled(item))
    .forEach((item) => {
      const key = item.type || "Outro";
      summary.set(key, (summary.get(key) || 0) + 1);
    });
  return Array.from(summary.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
}

function getInventoryStatusCounts(items = []) {
  const counts = { Equipado: 0, Guardado: 0, Perdido: 0, Gasto: 0 };
  (Array.isArray(items) ? items : [])
    .map((item) => normalizeInventoryItem(item))
    .filter((item) => isInventoryItemFilled(item))
    .forEach((item) => {
      counts[getInventoryItemStatus(item)] += 1;
    });
  return counts;
}

function createEmptyInventoryItem() {
  return {
    image: "",
    imageFit: "cover",
    name: "",
    description: "",
    type: "Outro",
    status: "Guardado",
    rarity: "Comum",
    equipped: false,
    weight: 0,
    chargesCurrent: 0,
    chargesMax: 0,
    note: "",
    linkedAttack: "",
    defenseBonus: 0,
    attackBonus: 0,
    damageBonus: 0,
    sanPenalty: 0,
  };
}

function normalizeInventoryItem(item) {
  const parseSignedNumber = (value) => {
    const parsed = Number.parseInt(String(value ?? "0"), 10);
    return Number.isNaN(parsed) ? 0 : clamp(parsed, -99, 99);
  };
  const parsePositiveNumber = (value) => {
    const parsed = Number.parseInt(String(value ?? "0"), 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  return {
    image: typeof item?.image === "string" ? item.image : "",
    imageFit: normalizeImageFit(item?.imageFit),
    name: typeof item?.name === "string" ? item.name : "",
    description: typeof item?.description === "string" ? item.description : "",
    type: typeof item?.type === "string" && INVENTORY_ITEM_TYPES.includes(item.type) ? item.type : "Outro",
    status: getInventoryItemStatus(item),
    rarity: typeof item?.rarity === "string" && INVENTORY_ITEM_RARITIES.includes(item.rarity) ? item.rarity : "Comum",
    equipped: getInventoryItemStatus(item) === "Equipado",
    weight: clamp(Math.max(0, parsePositiveNumber(item?.weight)), 0, 999),
    chargesCurrent: clamp(Math.max(0, parsePositiveNumber(item?.chargesCurrent)), 0, 999),
    chargesMax: clamp(Math.max(0, parsePositiveNumber(item?.chargesMax)), 0, 999),
    note: typeof item?.note === "string" ? item.note : "",
    linkedAttack: typeof item?.linkedAttack === "string" ? item.linkedAttack : "",
    defenseBonus: parseSignedNumber(item?.defenseBonus),
    attackBonus: parseSignedNumber(item?.attackBonus),
    damageBonus: parseSignedNumber(item?.damageBonus),
    sanPenalty: clamp(Math.max(0, parsePositiveNumber(item?.sanPenalty)), 0, 99),
  };
}

function deriveInventoryItems(character) {
  if (Array.isArray(character?.inventory)) {
    return character.inventory
      .slice(0, MAX_INVENTORY_SLOTS)
      .map((item) => normalizeInventoryItem(item));
  }

  return [];
}

function readInventoryData() {
  const slots = getInventorySlotsForTrail(elements.trail.value);
  const cloned = inventoryItems
    .slice(0, slots)
    .map((item) => normalizeInventoryItem(item));

  while (cloned.length < slots) {
    cloned.push(createEmptyInventoryItem());
  }

  return cloned;
}

function ensureInventoryStateSize() {
  if (!Array.isArray(inventoryItems)) {
    inventoryItems = [];
  }

  inventoryItems = inventoryItems
    .slice(0, MAX_INVENTORY_SLOTS)
    .map((item) => normalizeInventoryItem(item));

  while (inventoryItems.length < MAX_INVENTORY_SLOTS) {
    inventoryItems.push(createEmptyInventoryItem());
  }
}

function renderInventory() {
  if (!elements.inventoryGrid || !elements.inventoryHint) {
    return;
  }

  ensureInventoryStateSize();

  const slotCount = getInventorySlotsForTrail(elements.trail.value);
  const visibleItems = inventoryItems.slice(0, slotCount).map((item) => normalizeInventoryItem(item));
  const filledItems = visibleItems.filter((item) => isInventoryItemFilled(item));
  const weightLimit = getInventoryWeightLimit();
  const weightUsed = getInventoryWeightUsed(visibleItems);
  const statusCounts = getInventoryStatusCounts(visibleItems);
  const categorySummary = buildInventoryCategorySummary(visibleItems);
  const slotLabel = slotCount === 19 ? "19 espaços • trilha Técnico" : "7 espaços";

  elements.inventoryHint.textContent = `${slotLabel} • carga ${weightUsed}/${weightLimit}`;

  if (elements.inventoryMetrics) {
    const weightRatio = weightLimit > 0 ? Math.min(100, Math.round((weightUsed / weightLimit) * 100)) : 0;
    const overloaded = weightUsed > weightLimit;
    elements.inventoryMetrics.innerHTML = `
      <article class="inventory-metric-card${overloaded ? " warning" : ""}">
        <span>Carga</span>
        <strong>${escapeHtml(String(weightUsed))}/${escapeHtml(String(weightLimit))}</strong>
        <i style="--inventory-fill:${escapeHtml(String(weightRatio))}%"></i>
      </article>
      <article class="inventory-metric-card">
        <span>Arquivados</span>
        <strong>${escapeHtml(String(filledItems.length))}</strong>
        <small>${escapeHtml(String(slotCount - filledItems.length))} vazios</small>
      </article>
      <article class="inventory-metric-card">
        <span>Status</span>
        <strong>${escapeHtml(String(statusCounts.Equipado))} em uso</strong>
        <small>${escapeHtml(String(statusCounts.Guardado))} guardado(s)</small>
      </article>
    `;
  }

  if (elements.inventoryCategoryStrip) {
    if (!categorySummary.length) {
      elements.inventoryCategoryStrip.innerHTML = `<span class="inventory-category-pill muted">sem evidências catalogadas</span>`;
    } else {
      elements.inventoryCategoryStrip.innerHTML = categorySummary
        .map(([type, count]) => `
          <span class="inventory-category-pill" data-type="${escapeHtml(type)}">
            <strong>${escapeHtml(type)}</strong>
            <em>${escapeHtml(String(count))}</em>
          </span>
        `)
        .join("");
    }
  }

  elements.inventoryGrid.innerHTML = "";

  const persistInventoryChanges = ({ rerender = false, recalc = false, historyTitle = "", historyDetail = "" } = {}) => {
    if (historyTitle) {
      recordChangeHistory(historyTitle, historyDetail);
    }
    if (recalc) {
      updateResourceBars();
      updateDerivedSummary();
      renderAttacks();
    }
    renderSessionSummary();
    queueAutoSave();
    if (rerender) {
      renderInventory();
    } else {
      renderSheetMetaPanels();
    }
  };

  const duplicateInventoryItem = (index) => {
    ensureInventoryStateSize();
    const sourceItem = normalizeInventoryItem(inventoryItems[index]);
    if (!isInventoryItemFilled(sourceItem)) {
      return;
    }
    const emptyIndex = inventoryItems
      .slice(0, slotCount)
      .findIndex((candidate, candidateIndex) => candidateIndex !== index && !isInventoryItemFilled(candidate));
    if (emptyIndex === -1) {
      alert("Não há espaço livre para duplicar esse item.");
      return;
    }
    inventoryItems[emptyIndex] = normalizeInventoryItem({
      ...sourceItem,
      equipped: false,
      status: "Guardado",
      name: sourceItem.name ? `${sourceItem.name} (cópia)` : `Item ${emptyIndex + 1}`,
    });
    selectedInventoryIndex = emptyIndex;
    persistInventoryChanges({
      rerender: true,
      historyTitle: "Item duplicado",
      historyDetail: sourceItem.name || `Slot ${index + 1}`,
    });
  };

  const clearInventoryItem = (index) => {
    const item = normalizeInventoryItem(inventoryItems[index]);
    if (!isInventoryItemFilled(item)) {
      return;
    }
    const confirmed = window.confirm(`Descartar "${item.name || `Item ${index + 1}`}" do inventário?`);
    if (!confirmed) {
      return;
    }
    inventoryItems[index] = createEmptyInventoryItem();
    if (selectedInventoryIndex === index) {
      selectedInventoryIndex = -1;
    }
    persistInventoryChanges({
      rerender: true,
      recalc: true,
      historyTitle: "Item descartado",
      historyDetail: item.name || `Slot ${index + 1}`,
    });
  };

  for (let index = 0; index < slotCount; index += 1) {
    const item = normalizeInventoryItem(inventoryItems[index] || createEmptyInventoryItem());
    const isExpanded = selectedInventoryIndex === index;
    const isFilled = isInventoryItemFilled(item);
    const status = getInventoryItemStatus(item);
    const displayName = item.name?.trim() || `Espaço ${index + 1}`;
    const previewText = item.note || item.description || item.linkedAttack || (isFilled ? "Abrir registro do item" : "Espaço livre para catalogar");
    const weightLabel = item.weight > 0 ? `${item.weight} kg` : "sem peso";

    const slot = document.createElement("article");
    slot.className = [
      "inventory-slot",
      isExpanded ? "active" : "",
      isFilled ? "filled" : "empty",
      `status-${normalize(status)}`,
    ].filter(Boolean).join(" ");
    slot.dataset.index = String(index);

    const dragHandle = document.createElement("button");
    dragHandle.type = "button";
    dragHandle.className = "inventory-handle";
    dragHandle.textContent = "≡";
    dragHandle.title = "Arrastar para mover o item";
    dragHandle.draggable = true;
    dragHandle.addEventListener("dragstart", (event) => {
      inventoryDragIndex = index;
      slot.classList.add("dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(index));
      }
    });
    dragHandle.addEventListener("dragend", () => {
      inventoryDragIndex = null;
      Array.from(elements.inventoryGrid.querySelectorAll(".inventory-slot")).forEach((node) => {
        node.classList.remove("drop-target", "dragging");
      });
    });

    slot.addEventListener("dragover", (event) => {
      if (inventoryDragIndex === null || inventoryDragIndex === undefined) {
        return;
      }
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
      slot.classList.add("drop-target");
    });
    slot.addEventListener("dragleave", () => {
      slot.classList.remove("drop-target");
    });
    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      slot.classList.remove("drop-target");

      const rawIndex = event.dataTransfer ? event.dataTransfer.getData("text/plain") : "";
      const source = rawIndex !== ""
        ? rawIndex
        : inventoryDragIndex === null || inventoryDragIndex === undefined
          ? ""
          : String(inventoryDragIndex);
      if (!source) {
        return;
      }

      const fromIndex = Number.parseInt(source, 10);
      const toIndex = index;
      if (Number.isNaN(fromIndex) || fromIndex === toIndex) {
        return;
      }

      ensureInventoryStateSize();
      const fromItem = inventoryItems[fromIndex] || createEmptyInventoryItem();
      const toItem = inventoryItems[toIndex] || createEmptyInventoryItem();
      inventoryItems[fromIndex] = toItem;
      inventoryItems[toIndex] = fromItem;
      inventoryDragIndex = null;
      persistInventoryChanges({
        rerender: true,
        historyTitle: "Item movido",
        historyDetail: `${fromIndex + 1} → ${toIndex + 1}`,
      });
    });

    const summary = document.createElement("div");
    summary.className = "inventory-summary";
    summary.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, button, label")) {
        return;
      }
      selectedInventoryIndex = isExpanded ? -1 : index;
      renderInventory();
    });

    const photoLabel = document.createElement("label");
    photoLabel.className = "inventory-photo";
    photoLabel.title = `Adicionar imagem do item ${index + 1}`;

    const photoImg = document.createElement("img");
    photoImg.alt = `Imagem do item ${index + 1}`;
    photoImg.src = item.image || defaultItemIcon;
    applyImageFitToElement(photoImg, item.imageFit);

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.className = "hidden-file";
    photoInput.addEventListener("change", (event) => {
      const [file] = event.target.files;
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        ensureInventoryStateSize();
        inventoryItems[index].image = String(reader.result || "");
        selectedInventoryIndex = index;
        persistInventoryChanges({
          rerender: true,
          historyTitle: "Imagem de item alterada",
          historyDetail: displayName,
        });
      };
      reader.readAsDataURL(file);
    });

    photoLabel.appendChild(photoImg);
    photoLabel.appendChild(photoInput);

    const summaryMeta = document.createElement("div");
    summaryMeta.className = "inventory-summary-meta";

    const titleDisplay = document.createElement("strong");
    titleDisplay.className = "inventory-title-display";
    titleDisplay.textContent = displayName;

    const chipRow = document.createElement("div");
    chipRow.className = "inventory-summary-chips";
    [item.type || "Outro", status, item.rarity || "Comum", weightLabel].forEach((label, chipIndex) => {
      const chip = document.createElement("span");
      chip.className = chipIndex === 1 ? "inventory-summary-chip status" : "inventory-summary-chip";
      chip.textContent = label;
      chipRow.appendChild(chip);
    });

    const subtitle = document.createElement("p");
    subtitle.className = "inventory-summary-subtitle";
    subtitle.textContent = previewText;

    const summaryActions = document.createElement("div");
    summaryActions.className = "inventory-summary-actions";

    const detailsToggle = document.createElement("button");
    detailsToggle.type = "button";
    detailsToggle.className = "inventory-open";
    detailsToggle.textContent = isExpanded ? "Fechar" : "Detalhes";
    detailsToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectedInventoryIndex = isExpanded ? -1 : index;
      renderInventory();
    });
    summaryActions.appendChild(detailsToggle);

    const duplicateButton = document.createElement("button");
    duplicateButton.type = "button";
    duplicateButton.className = "inventory-mini-action";
    duplicateButton.textContent = "Duplicar";
    duplicateButton.disabled = !isFilled;
    duplicateButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      duplicateInventoryItem(index);
    });
    summaryActions.appendChild(duplicateButton);

    const discardButton = document.createElement("button");
    discardButton.type = "button";
    discardButton.className = "inventory-mini-action danger";
    discardButton.textContent = "Descartar";
    discardButton.disabled = !isFilled;
    discardButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clearInventoryItem(index);
    });
    summaryActions.appendChild(discardButton);

    summaryMeta.appendChild(titleDisplay);
    summaryMeta.appendChild(chipRow);
    summaryMeta.appendChild(subtitle);
    summaryMeta.appendChild(summaryActions);

    summary.appendChild(photoLabel);
    summary.appendChild(summaryMeta);

    slot.appendChild(dragHandle);
    slot.appendChild(summary);

    if (isExpanded) {
      const meta = document.createElement("div");
      meta.className = "inventory-meta";

      const identityGrid = document.createElement("div");
      identityGrid.className = "inventory-identity-grid";

      const nameField = document.createElement("label");
      nameField.innerHTML = "<span>Nome</span>";
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "Nome do item";
      nameInput.value = item.name || "";
      nameInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        inventoryItems[index].name = nameInput.value;
        titleDisplay.textContent = nameInput.value.trim() || `Espaço ${index + 1}`;
        renderSessionSummary();
        queueAutoSave();
      });
      nameField.appendChild(nameInput);
      identityGrid.appendChild(nameField);

      const typeField = document.createElement("label");
      typeField.innerHTML = "<span>Categoria</span>";
      const typeSelect = document.createElement("select");
      INVENTORY_ITEM_TYPES.forEach((type) => {
        const option = new Option(type, type);
        option.selected = item.type === type;
        typeSelect.add(option);
      });
      typeSelect.addEventListener("change", () => {
        ensureInventoryStateSize();
        inventoryItems[index].type = typeSelect.value;
        persistInventoryChanges({ rerender: true });
      });
      typeField.appendChild(typeSelect);
      identityGrid.appendChild(typeField);

      const statusField = document.createElement("label");
      statusField.innerHTML = "<span>Status</span>";
      const statusSelect = document.createElement("select");
      INVENTORY_ITEM_STATUSES.forEach((statusOption) => {
        const option = new Option(statusOption, statusOption);
        option.selected = statusOption === status;
        statusSelect.add(option);
      });
      statusSelect.addEventListener("change", () => {
        ensureInventoryStateSize();
        inventoryItems[index].status = statusSelect.value;
        inventoryItems[index].equipped = statusSelect.value === "Equipado";
        persistInventoryChanges({
          rerender: true,
          recalc: true,
          historyTitle: "Status de item alterado",
          historyDetail: `${displayName} • ${statusSelect.value}`,
        });
      });
      statusField.appendChild(statusSelect);
      identityGrid.appendChild(statusField);

      const rarityField = document.createElement("label");
      rarityField.innerHTML = "<span>Risco</span>";
      const raritySelect = document.createElement("select");
      INVENTORY_ITEM_RARITIES.forEach((rarity) => {
        const option = new Option(rarity, rarity);
        option.selected = item.rarity === rarity;
        raritySelect.add(option);
      });
      raritySelect.addEventListener("change", () => {
        ensureInventoryStateSize();
        inventoryItems[index].rarity = raritySelect.value;
        persistInventoryChanges({ rerender: true });
      });
      rarityField.appendChild(raritySelect);
      identityGrid.appendChild(rarityField);

      const imageFitField = document.createElement("label");
      imageFitField.innerHTML = "<span>Imagem</span>";
      const imageFitSelect = document.createElement("select");
      [
        ["cover", "Preencher quadro"],
        ["contain", "Mostrar inteira"],
      ].forEach(([value, label]) => {
        const option = new Option(label, value);
        option.selected = normalizeImageFit(item.imageFit) === value;
        imageFitSelect.add(option);
      });
      imageFitSelect.addEventListener("change", () => {
        ensureInventoryStateSize();
        inventoryItems[index].imageFit = normalizeImageFit(imageFitSelect.value);
        persistInventoryChanges({ rerender: true });
      });
      imageFitField.appendChild(imageFitSelect);
      identityGrid.appendChild(imageFitField);

      const descInput = document.createElement("textarea");
      descInput.rows = 3;
      descInput.placeholder = "Descrição do item";
      descInput.value = item.description || "";
      descInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        inventoryItems[index].description = descInput.value;
        subtitle.textContent = descInput.value.trim() || item.note || item.linkedAttack || "Abrir registro do item";
        queueAutoSave();
      });

      const noteInput = document.createElement("textarea");
      noteInput.rows = 2;
      noteInput.placeholder = "Observação curta, cheiro, marca, pista...";
      noteInput.value = item.note || "";
      noteInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        inventoryItems[index].note = noteInput.value;
        queueAutoSave();
      });

      const details = document.createElement("div");
      details.className = "inventory-detail-grid";

      const linkedAttackField = document.createElement("label");
      linkedAttackField.innerHTML = "<span>Vínculo</span>";
      const linkedAttackInput = document.createElement("input");
      linkedAttackInput.type = "text";
      linkedAttackInput.placeholder = "Ataque, uso ou efeito";
      linkedAttackInput.value = item.linkedAttack || "";
      linkedAttackInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        inventoryItems[index].linkedAttack = linkedAttackInput.value;
        queueAutoSave();
      });
      linkedAttackField.appendChild(linkedAttackInput);
      details.appendChild(linkedAttackField);

      const weightField = document.createElement("label");
      weightField.innerHTML = "<span>Peso</span>";
      const weightInput = document.createElement("input");
      weightInput.type = "number";
      weightInput.min = "0";
      weightInput.max = "999";
      weightInput.value = String(item.weight || 0);
      weightInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        const parsed = Number.parseInt(weightInput.value || "0", 10);
        inventoryItems[index].weight = Number.isNaN(parsed) ? 0 : clamp(Math.max(0, parsed), 0, 999);
        queueAutoSave();
      });
      weightInput.addEventListener("change", () => {
        persistInventoryChanges({ rerender: true });
      });
      weightField.appendChild(weightInput);
      details.appendChild(weightField);

      const chargesCurrentField = document.createElement("label");
      chargesCurrentField.innerHTML = "<span>Cargas atuais</span>";
      const chargesCurrentInput = document.createElement("input");
      chargesCurrentInput.type = "number";
      chargesCurrentInput.min = "0";
      chargesCurrentInput.max = "999";
      chargesCurrentInput.value = String(item.chargesCurrent || 0);
      chargesCurrentInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        const parsed = Number.parseInt(chargesCurrentInput.value || "0", 10);
        inventoryItems[index].chargesCurrent = Number.isNaN(parsed) ? 0 : clamp(Math.max(0, parsed), 0, 999);
        queueAutoSave();
      });
      chargesCurrentField.appendChild(chargesCurrentInput);
      details.appendChild(chargesCurrentField);

      const chargesMaxField = document.createElement("label");
      chargesMaxField.innerHTML = "<span>Cargas máximas</span>";
      const chargesMaxInput = document.createElement("input");
      chargesMaxInput.type = "number";
      chargesMaxInput.min = "0";
      chargesMaxInput.max = "999";
      chargesMaxInput.value = String(item.chargesMax || 0);
      chargesMaxInput.addEventListener("input", () => {
        ensureInventoryStateSize();
        const parsed = Number.parseInt(chargesMaxInput.value || "0", 10);
        inventoryItems[index].chargesMax = Number.isNaN(parsed) ? 0 : clamp(Math.max(0, parsed), 0, 999);
        queueAutoSave();
      });
      chargesMaxField.appendChild(chargesMaxInput);
      details.appendChild(chargesMaxField);

      const effectFields = [
        { key: "defenseBonus", label: "DEF", min: -20, max: 20 },
        { key: "attackBonus", label: "AC", min: -20, max: 20 },
        { key: "damageBonus", label: "DMG", min: -99, max: 99 },
        { key: "sanPenalty", label: "SAN-", min: 0, max: 99 },
      ];
      const effectGrid = document.createElement("div");
      effectGrid.className = "inventory-effect-grid";
      effectFields.forEach((config) => {
        const label = document.createElement("label");
        label.textContent = config.label;
        const input = document.createElement("input");
        input.type = "number";
        input.min = String(config.min);
        input.max = String(config.max);
        input.value = String(item[config.key] ?? 0);
        input.addEventListener("input", () => {
          ensureInventoryStateSize();
          const parsed = Number.parseInt(input.value || "0", 10);
          inventoryItems[index][config.key] = Number.isNaN(parsed)
            ? 0
            : clamp(parsed, config.min, config.max);
          queueAutoSave();
        });
        input.addEventListener("change", () => {
          persistInventoryChanges({ recalc: true });
        });
        label.appendChild(input);
        effectGrid.appendChild(label);
      });

      const utilityActions = document.createElement("div");
      utilityActions.className = "inventory-utility-actions";

      const reloadButton = document.createElement("button");
      reloadButton.type = "button";
      reloadButton.className = "secondary compact-action";
      reloadButton.textContent = "Recarregar";
      reloadButton.disabled = (item.chargesMax || 0) <= 0;
      reloadButton.addEventListener("click", () => {
        ensureInventoryStateSize();
        inventoryItems[index].chargesCurrent = Math.max(0, inventoryItems[index].chargesMax || 0);
        persistInventoryChanges({
          rerender: true,
          historyTitle: "Cargas restauradas",
          historyDetail: displayName,
        });
      });
      utilityActions.appendChild(reloadButton);

      const duplicateDetailButton = document.createElement("button");
      duplicateDetailButton.type = "button";
      duplicateDetailButton.className = "secondary compact-action";
      duplicateDetailButton.textContent = "Duplicar item";
      duplicateDetailButton.addEventListener("click", () => duplicateInventoryItem(index));
      utilityActions.appendChild(duplicateDetailButton);

      const discardDetailButton = document.createElement("button");
      discardDetailButton.type = "button";
      discardDetailButton.className = "menu-delete-btn compact-action";
      discardDetailButton.textContent = "Excluir item";
      discardDetailButton.addEventListener("click", () => clearInventoryItem(index));
      utilityActions.appendChild(discardDetailButton);

      meta.appendChild(identityGrid);
      meta.appendChild(descInput);
      meta.appendChild(noteInput);
      meta.appendChild(details);
      meta.appendChild(effectGrid);
      meta.appendChild(utilityActions);
      slot.appendChild(meta);
    }

    elements.inventoryGrid.appendChild(slot);
  }

  renderInventorySection();
  renderSheetMetaPanels();
}
function getEquippedInventoryEffects() {
  const effects = {
    defenseBonus: 0,
    sanPenalty: 0,
    globalAttackBonus: 0,
    globalDamageBonus: 0,
    attackBonuses: {},
    damageBonuses: {},
  };

  (Array.isArray(inventoryItems) ? inventoryItems : [])
    .map((item) => normalizeInventoryItem(item))
    .filter((item) => item.equipped)
    .forEach((item) => {
      effects.defenseBonus += item.defenseBonus;
      effects.sanPenalty += Math.max(0, item.sanPenalty);

      const normalizedAttackName = normalize(item.linkedAttack || "");
      if (normalizedAttackName) {
        effects.attackBonuses[normalizedAttackName] = (effects.attackBonuses[normalizedAttackName] || 0) + item.attackBonus;
        effects.damageBonuses[normalizedAttackName] = (effects.damageBonuses[normalizedAttackName] || 0) + item.damageBonus;
      } else {
        effects.globalAttackBonus += item.attackBonus;
        effects.globalDamageBonus += item.damageBonus;
      }
    });

  return effects;
}

function resolveAttackEquipmentModifiers(attackName) {
  const effects = getEquippedInventoryEffects();
  const key = normalize(attackName || "");
  return {
    attackBonus: effects.globalAttackBonus + (effects.attackBonuses[key] || 0),
    damageBonus: effects.globalDamageBonus + (effects.damageBonuses[key] || 0),
  };
}

function getEffectiveDefenseValue(baseDefense) {
  const parsed = Number(baseDefense);
  const safeBase = Number.isFinite(parsed) ? parsed : 0;
  return safeBase + getEquippedInventoryEffects().defenseBonus;
}

function getEffectiveTrackView(trackName, baseTrack) {
  const base = baseTrack || { max: 0, lost: 0, current: 0 };
  const effects = getEquippedInventoryEffects();
  if (trackName !== "san") {
    return base;
  }

  const effectiveMax = Math.max(0, base.max - effects.sanPenalty);
  const effectiveCurrent = Math.min(base.current, effectiveMax);
  return {
    max: effectiveMax,
    current: effectiveCurrent,
    lost: Math.max(0, effectiveMax - effectiveCurrent),
  };
}

function toggleCombatMode() {
  setCombatMode(false);
}

function setCombatMode(enabled) {
  combatModeEnabled = false;
  document.body.classList.remove("combat-mode");
  selectedAbilityId = null;
  setModeToggleState(
    elements.combatModeToggle,
    false,
    "Combate",
    "Entrar no modo combate"
  );
  renderAbilities();
  renderAttacks();
  renderEncounterPanel();
  renderSheetMetaPanels();
}

function createEmptyAbility() {
  return {
    id: generateId(),
    name: "",
    peCost: 0,
    description: "",
    special: false,
    skill: "Pontaria",
    bonus: 0,
    damage: "",
    chargesCurrent: 0,
    chargesMax: 0,
    macroLabel: "Ativar",
  };
}

function normalizeAbility(ability) {
  const parsedCost = Number.parseInt(String(ability?.peCost ?? "0"), 10);
  const parsedBonus = Number.parseInt(String(ability?.bonus ?? "0"), 10);
  const parsedChargesCurrent = Number.parseInt(String(ability?.chargesCurrent ?? "0"), 10);
  const parsedChargesMax = Number.parseInt(String(ability?.chargesMax ?? "0"), 10);
  return {
    id: typeof ability?.id === "string" && ability.id ? ability.id : generateId(),
    name: typeof ability?.name === "string" ? ability.name : "",
    peCost: Number.isNaN(parsedCost) ? 0 : clamp(parsedCost, 0, 999),
    description: typeof ability?.description === "string" ? ability.description : "",
    special: Boolean(ability?.special),
    skill: typeof ability?.skill === "string" && ability.skill ? ability.skill : "Pontaria",
    bonus: Number.isNaN(parsedBonus) ? 0 : clamp(parsedBonus, -99, 99),
    damage: typeof ability?.damage === "string" ? ability.damage : "",
    chargesCurrent: Number.isNaN(parsedChargesCurrent) ? 0 : clamp(parsedChargesCurrent, 0, 999),
    chargesMax: Number.isNaN(parsedChargesMax) ? 0 : clamp(parsedChargesMax, 0, 999),
    macroLabel: typeof ability?.macroLabel === "string" && ability.macroLabel ? ability.macroLabel : "Ativar",
  };
}

function deriveCombatAbilities(character) {
  const list = character?.combat?.abilities;
  if (!Array.isArray(list)) {
    return [];
  }

  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => normalizeAbility(item));
}

function readAbilitiesData() {
  if (!Array.isArray(combatAbilities)) {
    return [];
  }

  return combatAbilities
    .map((item) => normalizeAbility(item))
    .filter((item) =>
      item.name.trim()
      || item.description.trim()
      || item.peCost > 0
      || item.damage.trim()
      || item.bonus !== 0
      || item.chargesMax > 0
    );
}

function handleAddAbility() {
  if (combatModeEnabled) {
    return;
  }

  if (!Array.isArray(combatAbilities)) {
    combatAbilities = [];
  }

  combatAbilities = [...combatAbilities, createEmptyAbility()];
  recordChangeHistory("Habilidade adicionada", `Total ${combatAbilities.length}`);
  renderAbilities();
  queueAutoSave();
}

function selectAbility(abilityId) {
  if (!combatModeEnabled) {
    return;
  }

  const id = String(abilityId || "");
  if (!id) {
    return;
  }

  if (selectedAbilityId === id) {
    selectedAbilityId = "";
    updateAbilitySelectionUI();
    window.requestAnimationFrame(() => {
      selectedAbilityId = id;
      updateAbilitySelectionUI(true);
    });
    return;
  }

  selectedAbilityId = id;
  updateAbilitySelectionUI(true);
}

function updateAbilitySelectionUI(retrigger = false) {
  if (!elements.abilitiesList) {
    return;
  }

  const cards = elements.abilitiesList.querySelectorAll(".ability-card");
  cards.forEach((card) => {
    const shouldSelect = card.dataset.id === selectedAbilityId;
    card.classList.toggle("selected", shouldSelect);

    if (retrigger && shouldSelect) {
      card.style.animation = "none";
      void card.offsetHeight;
      card.style.animation = "";
    }
  });
}

async function useAbilityMacro(abilityId) {
  const index = combatAbilities.findIndex((item) => item.id === abilityId);
  if (index === -1) {
    return;
  }

  if (!canCurrentUserActInRoomTurn()) {
    alert(getRoomTurnLockMessage("usar habilidades"));
    return;
  }

  const ability = normalizeAbility(combatAbilities[index]);
  const peTrack = readTrackValues(elements.peMax.value, elements.peLost.value);
  if (ability.peCost > 0 && peTrack.current < ability.peCost) {
    alert(`PE insuficiente para usar ${ability.name || "essa habilidade"}.`);
    return;
  }
  if (ability.chargesMax > 0 && ability.chargesCurrent <= 0) {
    alert(`Sem cargas para ${ability.name || "essa habilidade"}.`);
    return;
  }

  if (ability.peCost > 0) {
    spendTrackPoints("pe", ability.peCost);
  }
  if (ability.chargesMax > 0) {
    combatAbilities[index].chargesCurrent = Math.max(0, ability.chargesCurrent - 1);
  }

  const rank = getSkillRank(ability.skill);
  const bonus = (SKILL_RANK_BONUS[rank] ?? 0) + ability.bonus;
  const rolls = rollDicePool(clampRollDiceCount(rollDiceCount));
  const highest = Math.max(...rolls);
  const total = highest + bonus;
  const sum = rolls.reduce((accumulator, value) => accumulator + value, 0);
  const damageRoll = rollExpression(ability.damage);
  const damageTotal = damageRoll.total;

  renderAbilities();
  queueAutoSave();

  setRollResult(
    rolls.length > 1
      ? `${ability.name || "Habilidade"}: ${rolls.length}d20 -> maior ${highest}${bonus ? ` + ${bonus} = ${total}` : ""} | soma ${sum}${ability.damage ? ` • dano ${damageTotal}` : ""}`
      : `${ability.name || "Habilidade"}: ${highest}${bonus ? ` + ${bonus} = ${total}` : ""}${ability.damage ? ` • dano ${damageTotal}` : ""}`
  );

  recordRollHistory({
    kind: "Habilidade",
    label: ability.name || "Habilidade",
    total,
    detail: `${ability.skill}${ability.damage ? ` • dano ${damageTotal}` : ""}${ability.peCost > 0 ? ` • PE -${ability.peCost}` : ""}`,
    rolls,
  });
  void pushRoomLog(
    "Habilidade",
    `${elements.name.value.trim() || "Personagem"} usou ${ability.name || "uma habilidade"}: resultado ${total}${ability.damage ? ` • dano ${damageTotal}` : ""}.`
  );

  await showRollModal({
    title: ability.name || "Habilidade",
    rolls,
    highest,
    bonus,
    total,
    subtitle: ability.damage ? `Dano ${damageTotal} • ${formatDamageSummary(damageRoll, 0)}` : "",
    animateRoll: true,
  });
}

function renderAbilities() {
  if (!elements.abilitiesList) {
    return;
  }

  const combatView = combatModeEnabled || readModeEnabled;
  elements.abilitiesList.innerHTML = "";

  const list = Array.isArray(combatAbilities) ? combatAbilities.map((item) => normalizeAbility(item)) : [];
  combatAbilities = list;

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = combatView
      ? "Nenhuma habilidade cadastrada."
      : "Nenhuma habilidade ainda. Use o botão acima para adicionar.";
    elements.abilitiesList.appendChild(empty);
    renderSheetMetaPanels();
    return;
  }

  list.forEach((ability, index) => {
    const card = document.createElement("article");
    card.className = "ability-card";
    if (!combatView) {
      card.classList.add("editing");
    }
    if (ability.special) {
      card.classList.add("special");
    }
    card.dataset.id = ability.id;

    const badge = document.createElement("div");
    badge.className = "ability-badge";
    badge.textContent = ability.special ? "Especial" : "Habilidade";

    if (!combatView) {
      badge.title = "Clique para alternar Especial";
      badge.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        combatAbilities[index].special = !combatAbilities[index].special;
        renderAbilities();
        queueAutoSave();
      });
    }

    const main = document.createElement("div");
    main.className = "ability-main";

    const header = document.createElement("div");
    header.className = "ability-header";

    const descBox = document.createElement("div");
    descBox.className = "ability-desc";

    if (combatView) {
      const name = document.createElement("span");
      name.className = "ability-name";
      name.textContent = ability.name || "Habilidade";

      const cost = document.createElement("span");
      cost.className = "ability-cost";
      cost.textContent = `PE ${ability.peCost}`;

      header.appendChild(name);
      header.appendChild(cost);

      const desc = document.createElement("p");
      desc.textContent = ability.description || "-";
      descBox.appendChild(desc);

      const meta = document.createElement("div");
      meta.className = "ability-meta";
      meta.innerHTML = `
        <span>${escapeHtml(ability.skill || "-")}${ability.bonus ? ` ${ability.bonus >= 0 ? "+" : ""}${ability.bonus}` : ""}</span>
        <span>${escapeHtml(ability.damage || "Sem dano")}</span>
        <span>${ability.chargesMax > 0 ? `Cargas ${escapeHtml(String(ability.chargesCurrent))}/${escapeHtml(String(ability.chargesMax))}` : "Sem cargas"}</span>
      `;
      descBox.appendChild(meta);

      if (combatModeEnabled) {
        const actions = document.createElement("div");
        actions.className = "inline-actions ability-actions";
        const macroButton = document.createElement("button");
        const roomTurnLocked = currentRoomId && !isCurrentUserRoomHost() && !canCurrentUserActInRoomTurn();
        macroButton.type = "button";
        macroButton.className = "secondary";
        macroButton.textContent = ability.macroLabel || "Ativar";
        macroButton.disabled = roomTurnLocked;
        if (roomTurnLocked) {
          macroButton.title = getRoomTurnLockMessage("usar habilidades");
        }
        macroButton.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          void useAbilityMacro(ability.id);
        });
        actions.appendChild(macroButton);
        descBox.appendChild(actions);
      }

      if (combatModeEnabled) {
        card.addEventListener("click", () => selectAbility(ability.id));
      }
    } else {
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "Nome da habilidade";
      nameInput.value = ability.name;
      nameInput.className = "ability-name";
      nameInput.addEventListener("input", () => {
        combatAbilities[index].name = nameInput.value;
        queueAutoSave();
      });

      const costWrap = document.createElement("div");
      costWrap.className = "ability-cost";
      const costLabel = document.createElement("span");
      costLabel.textContent = "PE ";

      const costInput = document.createElement("input");
      costInput.type = "number";
      costInput.min = "0";
      costInput.max = "999";
      costInput.step = "1";
      costInput.value = String(ability.peCost);
      costInput.title = "Custo em PE";
      costInput.addEventListener("input", () => {
        const parsed = Number.parseInt(costInput.value, 10);
        combatAbilities[index].peCost = Number.isNaN(parsed) ? 0 : clamp(parsed, 0, 999);
        queueAutoSave();
      });

      costWrap.appendChild(costLabel);
      costWrap.appendChild(costInput);

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "ability-remove";
      removeButton.textContent = "X";
      removeButton.title = "Remover habilidade";
      removeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        combatAbilities = combatAbilities.filter((_, itemIndex) => itemIndex !== index);
        renderAbilities();
        queueAutoSave();
      });

      header.appendChild(nameInput);
      header.appendChild(costWrap);
      header.appendChild(removeButton);

      const descInput = document.createElement("textarea");
      descInput.rows = 2;
      descInput.placeholder = "Descricao da habilidade";
      descInput.value = ability.description;
      descInput.addEventListener("input", () => {
        combatAbilities[index].description = descInput.value;
        queueAutoSave();
      });
      descBox.appendChild(descInput);

      const configGrid = document.createElement("div");
      configGrid.className = "ability-config-grid";
      configGrid.innerHTML = `
        <label>Perícia
          <select data-ability-field="skill">
            <option value="Pontaria" ${ability.skill === "Pontaria" ? "selected" : ""}>Pontaria</option>
            <option value="Luta" ${ability.skill === "Luta" ? "selected" : ""}>Luta</option>
            <option value="Tática" ${ability.skill === "Tática" ? "selected" : ""}>Tática</option>
            <option value="Tecnologias" ${ability.skill === "Tecnologias" ? "selected" : ""}>Tecnologias</option>
          </select>
        </label>
        <label>Bônus
          <input data-ability-field="bonus" type="number" min="-99" max="99" value="${escapeHtml(String(ability.bonus))}">
        </label>
        <label>Dano
          <input data-ability-field="damage" type="text" value="${escapeHtml(ability.damage)}" placeholder="2d6+3">
        </label>
        <label>Cargas atuais
          <input data-ability-field="chargesCurrent" type="number" min="0" max="999" value="${escapeHtml(String(ability.chargesCurrent))}">
        </label>
        <label>Cargas máximas
          <input data-ability-field="chargesMax" type="number" min="0" max="999" value="${escapeHtml(String(ability.chargesMax))}">
        </label>
        <label>Macro
          <input data-ability-field="macroLabel" type="text" value="${escapeHtml(ability.macroLabel || "Ativar")}" placeholder="Usar Rajada">
        </label>
      `;
      configGrid.querySelectorAll("[data-ability-field]").forEach((field) => {
        field.addEventListener("input", () => {
          const fieldName = field.dataset.abilityField;
          if (!fieldName) {
            return;
          }
          combatAbilities[index][fieldName] = field instanceof HTMLInputElement && field.type === "number"
            ? Number.parseInt(field.value || "0", 10) || 0
            : field.value;
          queueAutoSave();
        });
        field.addEventListener("change", () => {
          const fieldName = field.dataset.abilityField;
          if (!fieldName) {
            return;
          }
          combatAbilities[index][fieldName] = field instanceof HTMLInputElement && field.type === "number"
            ? Number.parseInt(field.value || "0", 10) || 0
            : field.value;
          queueAutoSave();
        });
      });
      descBox.appendChild(configGrid);
    }

    main.appendChild(header);
    main.appendChild(descBox);

    card.appendChild(badge);
    card.appendChild(main);
    elements.abilitiesList.appendChild(card);
  });

  updateAbilitySelectionUI();
  renderSheetMetaPanels();
}

function isCharacterInAction(character) {
  return Boolean(character?.ui?.inAction);
}

function toggleInAction() {
  if (editorMode === "master") {
    return;
  }

  const nextState = !inActionEnabled;
  if (nextState) {
    const previewCharacter = readFormData({ validateRequired: false });
    if (!previewCharacter) {
      alert("Finalize nome, classe e trilha antes de ativar EM AÇÃO.");
      return;
    }
  }

  recordChangeHistory("EM AÇÃO", nextState ? "Ativado" : "Desativado");
  setInAction(nextState);

  const character = readFormData({ validateRequired: false });
  if (character) {
    persistEditorData(character, false);
    return;
  }

  renderRoomsView();
}

function setInAction(enabled) {
  inActionEnabled = Boolean(enabled);
  document.body.classList.toggle("character-in-action", inActionEnabled);
  updateInActionToggle();
  renderSheetMetaPanels();
}

function setModeToggleState(button, active, label, title) {
  if (!button) {
    return;
  }

  button.classList.toggle("active", active);
  button.setAttribute("aria-pressed", active ? "true" : "false");
  button.title = title;
  const labelEl = button.querySelector(".mode-toggle-label");
  if (labelEl) {
    labelEl.textContent = label;
  }
  button.setAttribute("aria-label", title || label);
}

function updateInActionToggle() {
  if (!elements.inActionToggle) {
    return;
  }

  elements.inActionToggle.classList.add("hidden");
  elements.inActionToggle.classList.toggle("is-active", inActionEnabled);
  setModeToggleState(
    elements.inActionToggle,
    inActionEnabled,
    inActionEnabled ? "Ativo" : "Ação",
    inActionEnabled
      ? "Esta ficha está conectada a uma sessão online."
      : "Esta ficha ainda não está conectada a uma sessão online."
  );
}

function toggleReadMode() {
  const nextState = !readModeEnabled;
  recordChangeHistory("Modo de leitura", nextState ? "Ativado" : "Desativado");
  setReadMode(nextState);
}

function setReadMode(enabled) {
  readModeEnabled = Boolean(enabled);
  if (readModeEnabled && combatModeEnabled) {
    combatModeEnabled = false;
    document.body.classList.remove("combat-mode");
    selectedAbilityId = null;
    setModeToggleState(
      elements.combatModeToggle,
      false,
      "Combate",
      "Entrar no modo combate"
    );
  }
  document.body.classList.toggle("read-mode", readModeEnabled);

  setModeToggleState(
    elements.readModeToggle,
    readModeEnabled,
    readModeEnabled ? "Lendo" : "Leitura",
    readModeEnabled ? "Sair do modo leitura" : "Entrar no modo leitura"
  );

  renderAbilities();
  renderAttacks();
  renderSheetMetaPanels();
}

function getAttributeSnapshot() {
  const snapshot = {};
  attributes.forEach((attribute) => {
    snapshot[attribute.id] = readAttributeValue(attribute.id);
  });
  return snapshot;
}

function getTrailDerivedModifiers(trailName) {
  switch (normalize(trailName)) {
    case "colosso":
      return { pv: 8, pe: 0, san: 0, defense: 2, movement: -1 };
    case "devastador":
      return { pv: 2, pe: 1, san: 0, defense: 0, movement: 0 };
    case "ceifador":
      return { pv: 0, pe: 2, san: 0, defense: 0, movement: 0 };
    case "medico de campo":
      return { pv: 2, pe: 2, san: 6, defense: 0, movement: 0 };
    case "tecnico":
      return { pv: 0, pe: 4, san: 0, defense: 1, movement: 0 };
    case "atirador de elite":
      return { pv: 0, pe: 1, san: 0, defense: 1, movement: 1 };
    default:
      return { pv: 0, pe: 0, san: 0, defense: 0, movement: 0 };
  }
}

function getDerivedValues() {
  const attrs = getAttributeSnapshot();
  const selectedClass = elements.classSelect.value;
  const trail = elements.trail.value;
  const nexValue = clamp(readNumber(elements.nex?.value) ?? 0, 0, 100);
  const meleeBonus = (attrs.forca || 0) + (SKILL_RANK_BONUS[getSkillRank("Luta")] ?? 0);
  const rangedBonus = (attrs.agilidade || 0) + (SKILL_RANK_BONUS[getSkillRank("Pontaria")] ?? 0);

  if (!selectedClass || !trail) {
    return {
      defense: 0,
      movement: "0m",
      pdMax: 0,
      peMax: 0,
      sanMax: 0,
      meleeBonus,
      rangedBonus,
      ready: false,
    };
  }

  const classBase = selectedClass === "Combatente"
    ? { pv: 20, pe: 8, san: 18, defense: 1 }
    : { pv: 16, pe: 12, san: 22, defense: 0 };
  const trailMods = getTrailDerivedModifiers(trail);
  const tierBonus = Math.floor(nexValue / 20);
  const vigor = attrs.vigor || 0;
  const agility = attrs.agilidade || 0;
  const intellect = attrs.intelecto || 0;
  const presence = attrs.presenca || 0;
  const rangedBonusComputed = agility + (SKILL_RANK_BONUS[getSkillRank("Pontaria")] ?? 0);
  const defense = 10 + agility + classBase.defense + trailMods.defense + Math.floor(nexValue / 30);
  const movement = Math.max(6, 9 + agility + trailMods.movement);

  return {
    defense,
    movement: `${movement}m`,
    pdMax: classBase.pv + trailMods.pv + vigor * 5 + tierBonus * 2,
    peMax: classBase.pe + trailMods.pe + presence * 2 + intellect + tierBonus,
    sanMax: classBase.san + trailMods.san + presence * 3 + intellect * 2 + vigor,
    meleeBonus,
    rangedBonus: rangedBonusComputed,
    ready: true,
  };
}

function applyDerivedCalculations(options = {}) {
  const { force = false } = options;
  const derived = getDerivedValues();

  if (!derived.ready) {
    updateDerivedSummary();
    if (force) {
      alert("Selecione classe e trilha antes de gerar os valores automáticos.");
    }
    return false;
  }

  if (force) {
    if (elements.defense) {
      elements.defense.value = String(derived.defense);
    }
    if (elements.movement) {
      elements.movement.value = derived.movement;
    }
    if (elements.pdMax) {
      elements.pdMax.value = String(derived.pdMax);
    }
    if (elements.pdLost) {
      elements.pdLost.value = "0";
    }
    if (elements.peMax) {
      elements.peMax.value = String(derived.peMax);
    }
    if (elements.peLost) {
      elements.peLost.value = "0";
    }
    if (elements.sanMax) {
      elements.sanMax.value = String(derived.sanMax);
    }
    if (elements.sanLost) {
      elements.sanLost.value = "0";
    }
    updateResourceBars();
  }

  updateDerivedSummary();
  return true;
}

function updateDerivedSummary() {
  if (!elements.derivedSummary) {
    return;
  }

  const derived = getDerivedValues();
  const equippedEffects = getEquippedInventoryEffects();
  const defenseSource = readNumber(elements.defense?.value) ?? 0;
  const effectiveDefense = getEffectiveDefenseValue(defenseSource);
  const equipmentNote = [
    equippedEffects.defenseBonus ? `Defesa equipada ${effectiveDefense}` : "",
    equippedEffects.sanPenalty ? `SAN amaldiçoada -${equippedEffects.sanPenalty}` : "",
  ]
    .filter(Boolean)
    .join(" • ");
  elements.derivedSummary.textContent = derived.ready
    ? `Manual. Sugestão automática: Defesa ${derived.defense} • Deslocamento ${derived.movement} • PV ${derived.pdMax} • PE ${derived.peMax} • SAN ${derived.sanMax} • Corpo a corpo +${derived.meleeBonus} • Distância +${derived.rangedBonus}${equipmentNote ? ` • ${equipmentNote}` : ""}`
    : `Valores manuais. Escolha classe e trilha para liberar a sugestão automática.${equipmentNote ? ` ${equipmentNote}.` : ""}`;
}

function createEmptyAttackEntry() {
  return {
    id: generateId(),
    name: "",
    category: "Arma",
    skill: "Pontaria",
    bonus: 0,
    damage: "",
    critical: "20/x2",
    range: "",
    ammo: "",
    ammoCurrent: 0,
    ammoMax: 0,
    chargesCurrent: 0,
    chargesMax: 0,
    peCost: 0,
    macroLabel: "Usar",
    notes: "",
  };
}

function normalizeAttackEntry(entry) {
  const parsedBonus = Number.parseInt(String(entry?.bonus ?? "0"), 10);
  const parsedPeCost = Number.parseInt(String(entry?.peCost ?? "0"), 10);
  const parsedAmmoCurrent = Number.parseInt(String(entry?.ammoCurrent ?? "0"), 10);
  const parsedAmmoMax = Number.parseInt(String(entry?.ammoMax ?? "0"), 10);
  const parsedChargesCurrent = Number.parseInt(String(entry?.chargesCurrent ?? "0"), 10);
  const parsedChargesMax = Number.parseInt(String(entry?.chargesMax ?? "0"), 10);
  return {
    id: typeof entry?.id === "string" && entry.id ? entry.id : generateId(),
    name: typeof entry?.name === "string" ? entry.name : "",
    category: typeof entry?.category === "string" && entry.category ? entry.category : "Arma",
    skill: typeof entry?.skill === "string" && entry.skill ? entry.skill : "Pontaria",
    bonus: Number.isNaN(parsedBonus) ? 0 : clamp(parsedBonus, -99, 99),
    damage: typeof entry?.damage === "string" ? entry.damage : "",
    critical: typeof entry?.critical === "string" ? entry.critical : "20/x2",
    range: typeof entry?.range === "string" ? entry.range : "",
    ammo: typeof entry?.ammo === "string" ? entry.ammo : "",
    ammoCurrent: Number.isNaN(parsedAmmoCurrent) ? 0 : clamp(parsedAmmoCurrent, 0, 999),
    ammoMax: Number.isNaN(parsedAmmoMax) ? 0 : clamp(parsedAmmoMax, 0, 999),
    chargesCurrent: Number.isNaN(parsedChargesCurrent) ? 0 : clamp(parsedChargesCurrent, 0, 999),
    chargesMax: Number.isNaN(parsedChargesMax) ? 0 : clamp(parsedChargesMax, 0, 999),
    peCost: Number.isNaN(parsedPeCost) ? 0 : clamp(parsedPeCost, 0, 999),
    macroLabel: typeof entry?.macroLabel === "string" && entry.macroLabel ? entry.macroLabel : "Usar",
    notes: typeof entry?.notes === "string" ? entry.notes : "",
  };
}

function deriveAttackEntries(character) {
  const list = character?.combat?.attackEntries;
  if (Array.isArray(list)) {
    return list.map((entry) => normalizeAttackEntry(entry));
  }

  if (typeof character?.combat?.attacks === "string" && character.combat.attacks.trim()) {
    return character.combat.attacks
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => normalizeAttackEntry({ name: line }));
  }

  return [];
}

function readAttackEntriesData() {
  return (Array.isArray(attackEntries) ? attackEntries : [])
    .map((entry) => normalizeAttackEntry(entry))
    .filter((entry) =>
      entry.name.trim()
      || entry.damage.trim()
      || entry.range.trim()
      || entry.notes.trim()
      || entry.ammoMax > 0
      || entry.chargesMax > 0
      || entry.bonus !== 0
      || entry.peCost > 0
    );
}

function getAttackResourceSummary(entry) {
  const parts = [];
  if (entry.ammoMax > 0 || entry.ammoCurrent > 0) {
    parts.push(`${entry.ammo || "Munição"} ${entry.ammoCurrent}/${entry.ammoMax}`);
  }
  if (entry.chargesMax > 0 || entry.chargesCurrent > 0) {
    parts.push(`Cargas ${entry.chargesCurrent}/${entry.chargesMax}`);
  }
  return parts.length ? parts.join(" • ") : "-";
}

function renderAttacks() {
  if (!elements.attacksList) {
    return;
  }

  const compactView = combatModeEnabled || readModeEnabled;
  const roomTurnLocked = currentRoomId && !isCurrentUserRoomHost() && !canCurrentUserActInRoomTurn();
  const roomTurnLockTitle = roomTurnLocked
    ? escapeHtml(getRoomTurnLockMessage("usar ataques"))
    : "";
  attackEntries = (Array.isArray(attackEntries) ? attackEntries : []).map((entry) => normalizeAttackEntry(entry));
  elements.attacksList.innerHTML = "";

  if (attackEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = compactView
      ? "Nenhum ataque cadastrado."
      : "Nenhum ataque ainda. Use o botão acima para adicionar.";
    elements.attacksList.appendChild(empty);
    renderSheetMetaPanels();
    return;
  }

  attackEntries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = compactView ? "attack-card compact" : "attack-card";
    card.dataset.attackId = entry.id;

    if (compactView) {
      card.innerHTML = `
        <div class="attack-compact-top">
          <div>
            <h4>${escapeHtml(entry.name || "Ataque sem nome")}</h4>
            <p>${escapeHtml(entry.category)} • ${escapeHtml(entry.skill)} • Alcance ${escapeHtml(entry.range || "-")}</p>
          </div>
          <div class="inline-actions">
            <button type="button" class="secondary" data-attack-action="roll">Rolar</button>
            <button type="button" class="primary" data-attack-action="use" ${roomTurnLocked ? "disabled" : ""} ${roomTurnLocked ? `title="${roomTurnLockTitle}"` : ""}>${escapeHtml(entry.macroLabel || "Usar")}</button>
          </div>
        </div>
        <div class="attack-meta-grid">
          <span>Dano ${escapeHtml(entry.damage || "-")}</span>
          <span>Crítico ${escapeHtml(entry.critical || "-")}</span>
          <span>PE ${escapeHtml(String(entry.peCost || 0))}</span>
          <span>${escapeHtml(getAttackResourceSummary(entry))}</span>
        </div>
        <p class="attack-notes">${escapeHtml(entry.notes || "Sem observações.")}</p>
      `;
    } else {
      card.innerHTML = `
        <div class="attack-edit-grid">
          <label>Nome<input data-attack-field="name" type="text" value="${escapeHtml(entry.name)}" placeholder="Ex.: Rifle de caça"></label>
          <label>Categoria<input data-attack-field="category" type="text" value="${escapeHtml(entry.category)}" placeholder="Arma, ritual, manobra..."></label>
          <label>
            Perícia
            <select data-attack-field="skill">
              <option value="Pontaria" ${entry.skill === "Pontaria" ? "selected" : ""}>Pontaria</option>
              <option value="Luta" ${entry.skill === "Luta" ? "selected" : ""}>Luta</option>
              <option value="Tática" ${entry.skill === "Tática" ? "selected" : ""}>Tática</option>
            </select>
          </label>
          <label>Bônus<input data-attack-field="bonus" type="number" min="-99" max="99" value="${escapeHtml(String(entry.bonus))}"></label>
          <label>Dano<input data-attack-field="damage" type="text" value="${escapeHtml(entry.damage)}" placeholder="2d10+5"></label>
          <label>Crítico<input data-attack-field="critical" type="text" value="${escapeHtml(entry.critical)}" placeholder="20/x2"></label>
          <label>Alcance<input data-attack-field="range" type="text" value="${escapeHtml(entry.range)}" placeholder="Curto, médio, 12m..."></label>
          <label>Rótulo munição<input data-attack-field="ammo" type="text" value="${escapeHtml(entry.ammo)}" placeholder="Balas, setas, bateria..."></label>
          <label>Munição atual<input data-attack-field="ammoCurrent" type="number" min="0" max="999" value="${escapeHtml(String(entry.ammoCurrent))}"></label>
          <label>Munição máxima<input data-attack-field="ammoMax" type="number" min="0" max="999" value="${escapeHtml(String(entry.ammoMax))}"></label>
          <label>Cargas atuais<input data-attack-field="chargesCurrent" type="number" min="0" max="999" value="${escapeHtml(String(entry.chargesCurrent))}"></label>
          <label>Cargas máximas<input data-attack-field="chargesMax" type="number" min="0" max="999" value="${escapeHtml(String(entry.chargesMax))}"></label>
          <label>Custo de PE<input data-attack-field="peCost" type="number" min="0" max="999" value="${escapeHtml(String(entry.peCost))}"></label>
          <label>Macro<input data-attack-field="macroLabel" type="text" value="${escapeHtml(entry.macroLabel || "Usar")}" placeholder="Usar Rajada"></label>
          <label class="attack-edit-full">Observações<textarea data-attack-field="notes" rows="2" placeholder="Recuo, condição especial, efeito extra...">${escapeHtml(entry.notes)}</textarea></label>
        </div>
        <div class="inline-actions attack-actions">
          <button type="button" class="secondary" data-attack-action="roll">Testar rolagem</button>
          <button type="button" class="primary" data-attack-action="use" ${roomTurnLocked ? "disabled" : ""} ${roomTurnLocked ? `title="${roomTurnLockTitle}"` : ""}>${escapeHtml(entry.macroLabel || "Usar")}</button>
          <button type="button" class="menu-delete-btn" data-attack-action="delete">Excluir</button>
        </div>
      `;
    }

    elements.attacksList.appendChild(card);
  });
  renderSheetMetaPanels();
}

function handleAddAttack() {
  attackEntries = [...(Array.isArray(attackEntries) ? attackEntries : []), createEmptyAttackEntry()];
  recordChangeHistory("Ataque adicionado", `Total ${attackEntries.length}`);
  renderAttacks();
  queueAutoSave();
}

function handleAttackListInput(event) {
  const field = event.target instanceof Element ? event.target.closest("[data-attack-field]") : null;
  const card = event.target instanceof Element ? event.target.closest("[data-attack-id]") : null;
  if (!field || !card) {
    return;
  }

  const attack = attackEntries.find((entry) => entry.id === card.dataset.attackId);
  if (!attack) {
    return;
  }

  const fieldName = field.dataset.attackField;
  if (!fieldName) {
    return;
  }

  attack[fieldName] = field instanceof HTMLInputElement && field.type === "number"
    ? Number.parseInt(field.value || "0", 10) || 0
    : field.value;

  queueAutoSave();
}

function handleAttackListClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-attack-action]") : null;
  const card = event.target instanceof Element ? event.target.closest("[data-attack-id]") : null;
  if (!trigger || !card) {
    return;
  }

  const attackId = card.dataset.attackId || "";
  const action = trigger.dataset.attackAction;

  if (action === "delete") {
    attackEntries = attackEntries.filter((entry) => entry.id !== attackId);
    recordChangeHistory("Ataque removido", "Entrada excluída");
    renderAttacks();
    queueAutoSave();
    return;
  }

  void rollAttackEntry(attackId, action === "use");
}

function rollExpression(expression) {
  const source = String(expression || "").replace(/\s+/g, "");
  if (!source) {
    return { total: 0, parts: [], label: "-" };
  }

  const tokens = source.match(/[+-]?[^+-]+/g) || [];
  const parts = [];
  let total = 0;

  tokens.forEach((token) => {
    const sign = token.startsWith("-") ? -1 : 1;
    const body = token.replace(/^[+-]/, "");
    const diceMatch = body.match(/^(\d*)d(\d+)$/i);

    if (diceMatch) {
      const amount = clamp(Number.parseInt(diceMatch[1] || "1", 10) || 1, 1, 20);
      const faces = clamp(Number.parseInt(diceMatch[2] || "20", 10) || 20, 2, 100);
      const rolls = Array.from({ length: amount }, () => Math.floor(Math.random() * faces) + 1);
      const subtotal = rolls.reduce((sum, value) => sum + value, 0) * sign;
      total += subtotal;
      parts.push({
        type: "dice",
        sign,
        label: `${sign < 0 ? "-" : "+"}${amount}d${faces}`,
        rolls,
        subtotal,
      });
      return;
    }

    const parsedNumber = Number.parseInt(body, 10);
    if (!Number.isNaN(parsedNumber)) {
      const subtotal = parsedNumber * sign;
      total += subtotal;
      parts.push({
        type: "flat",
        sign,
        label: `${sign < 0 ? "-" : "+"}${parsedNumber}`,
        rolls: [],
        subtotal,
      });
    }
  });

  const pretty = parts
    .map((part, index) => `${index === 0 && part.sign > 0 ? "" : part.sign < 0 ? "- " : "+ "}${part.label.replace(/^[+-]/, "")}`)
    .join(" ");

  return {
    total,
    parts,
    label: pretty || source,
  };
}

function formatDamageSummary(damageRoll, extraBonus = 0) {
  const breakdown = damageRoll.parts
    .map((part) => {
      if (part.type === "dice") {
        return `${part.label.replace(/^[+]/, "")} [${part.rolls.join(", ")}]`;
      }
      return part.label.replace(/^[+]/, "");
    })
    .join(" • ");

  if (extraBonus) {
    return `${breakdown || "-"} • equip. ${extraBonus >= 0 ? "+" : ""}${extraBonus}`;
  }
  return breakdown || "-";
}

async function rollAttackEntry(attackId, consumeCost = false) {
  const attack = attackEntries.find((entry) => entry.id === attackId);
  if (!attack) {
    return;
  }

  if (consumeCost && !canCurrentUserActInRoomTurn()) {
    alert(getRoomTurnLockMessage("usar ataques"));
    return;
  }

  const rank = getSkillRank(attack.skill);
  const skillBonus = SKILL_RANK_BONUS[rank] ?? 0;
  const customBonus = Number.parseInt(String(attack.bonus ?? 0), 10) || 0;
  const equipmentMods = resolveAttackEquipmentModifiers(attack.name);
  const bonus = skillBonus + customBonus + equipmentMods.attackBonus;
  const diceCount = clampRollDiceCount(rollDiceCount);
  const rolls = rollDicePool(diceCount);
  const highest = Math.max(...rolls);
  const sum = rolls.reduce((accumulator, value) => accumulator + value, 0);
  const total = highest + bonus;
  const cost = Number.parseInt(String(attack.peCost ?? 0), 10) || 0;
  const damageRoll = rollExpression(attack.damage);
  const damageTotal = damageRoll.total + equipmentMods.damageBonus;

  if (consumeCost && attack.ammoMax > 0) {
    if (attack.ammoCurrent <= 0) {
      alert(`Sem ${attack.ammo || "munição"} para ${attack.name || "este ataque"}.`);
      return;
    }
  }

  if (consumeCost && attack.chargesMax > 0) {
    if (attack.chargesCurrent <= 0) {
      alert(`Sem cargas para ${attack.name || "este ataque"}.`);
      return;
    }
  }

  if (consumeCost && cost > 0) {
    const peTrack = readTrackValues(elements.peMax.value, elements.peLost.value);
    if (peTrack.current < cost) {
      alert(`PE insuficiente para usar ${attack.name || "este ataque"}.`);
      return;
    }
    spendTrackPoints("pe", cost);
  }

  if (consumeCost && attack.ammoMax > 0) {
    attack.ammoCurrent = Math.max(0, attack.ammoCurrent - 1);
  }

  if (consumeCost && attack.chargesMax > 0) {
    attack.chargesCurrent = Math.max(0, attack.chargesCurrent - 1);
  }

  if (consumeCost) {
    renderAttacks();
    queueAutoSave();
  }

  setRollResult(
    diceCount > 1
      ? `${attack.name || "Ataque"}: ${diceCount}d20 -> maior ${highest}${bonus ? ` + ${bonus} = ${total}` : ""} | soma ${sum} • dano ${damageTotal}${attack.damage ? ` (${attack.damage})` : ""}`
      : `${attack.name || "Ataque"}: ${highest}${bonus ? ` + ${bonus} = ${total}` : ""} • dano ${damageTotal}${attack.damage ? ` (${attack.damage})` : ""}`
  );

  recordRollHistory({
    kind: "Ataque",
    label: attack.name || "Ataque",
    total,
    detail: `${attack.skill}${attack.damage ? ` • dano ${damageTotal}` : ""}${cost > 0 && consumeCost ? ` • PE -${cost}` : ""}`,
    rolls,
  });
  if (consumeCost) {
    void pushRoomLog(
      "Ataque",
      `${elements.name.value.trim() || "Personagem"} usou ${attack.name || "um ataque"}: acerto ${total}${attack.damage ? ` • dano ${damageTotal}` : ""}.`
    );
  }

  await showRollModal({
    title: attack.name || "Ataque",
    rolls,
    highest,
    bonus,
    total,
    subtitle: `Dano ${damageTotal} • ${formatDamageSummary(damageRoll, equipmentMods.damageBonus)}`,
    animateRoll: true,
  });
}

function createEmptyInitiativeEntry(partial = {}) {
  return {
    id: partial.id || generateId(),
    name: partial.name || "",
    initiative: Number.parseInt(String(partial.initiative ?? "0"), 10) || 0,
    tag: partial.tag || "",
  };
}

function normalizeInitiativeEntry(entry) {
  return createEmptyInitiativeEntry(entry);
}

function deriveInitiativeState(character) {
  initiativeEntries = Array.isArray(character?.combat?.initiativeEntries)
    ? character.combat.initiativeEntries.map((entry) => normalizeInitiativeEntry(entry))
    : [];
  initiativeRound = Number.parseInt(String(character?.combat?.initiativeRound ?? "1"), 10) || 1;
  activeInitiativeId = typeof character?.combat?.activeInitiativeId === "string"
    ? character.combat.activeInitiativeId
    : "";
}

function readInitiativeData() {
  return {
    entries: initiativeEntries.map((entry) => normalizeInitiativeEntry(entry)).filter((entry) => entry.name.trim()),
    round: initiativeRound,
    activeId: activeInitiativeId,
  };
}

function renderInitiativeTracker() {
  if (!elements.initiativeList || !elements.initiativeRound) {
    return;
  }

  elements.initiativeRound.textContent = `Rodada ${initiativeRound}`;
  elements.initiativeList.innerHTML = "";

  if (!initiativeEntries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum combatente na iniciativa.";
    elements.initiativeList.appendChild(empty);
    renderEncounterPanel();
    return;
  }

  initiativeEntries.forEach((entry) => {
    const row = document.createElement("div");
    row.className = entry.id === activeInitiativeId ? "initiative-row active" : "initiative-row";
    row.dataset.initiativeId = entry.id;
    row.innerHTML = `
      <input data-initiative-field="name" type="text" value="${escapeHtml(entry.name)}" placeholder="Nome do combatente">
      <input data-initiative-field="initiative" type="number" value="${escapeHtml(String(entry.initiative))}" placeholder="0">
      <input data-initiative-field="tag" type="text" value="${escapeHtml(entry.tag)}" placeholder="Aliado, NPC, boss...">
      <div class="inline-actions">
        <button type="button" class="secondary" data-initiative-action="active">Atual</button>
        <button type="button" class="menu-delete-btn" data-initiative-action="delete">X</button>
      </div>
    `;
    elements.initiativeList.appendChild(row);
  });

  renderEncounterPanel();
}

function buildEncounterSnapshot() {
  return {
    title: elements.encounterTitle?.value.trim() || "",
    notes: elements.encounterNotes?.value.trim() || "",
    round: initiativeRound,
    activeId: activeInitiativeId,
    entries: [...initiativeEntries]
      .map((entry) => normalizeInitiativeEntry(entry))
      .filter((entry) => entry.name.trim())
      .sort((a, b) => b.initiative - a.initiative),
    updatedAt: new Date().toISOString(),
  };
}

function renderEncounterPanel() {
  if (!elements.encounterSummary) {
    return;
  }

  const encounter = buildEncounterSnapshot();
  const activeEntry = encounter.entries.find((entry) => entry.id === encounter.activeId) || encounter.entries[0] || null;
  const roomEncounter = currentRoomData?.encounter || null;

  const localMarkup = encounter.entries.length > 0
    ? `
      <div class="encounter-summary-block">
        <div class="encounter-summary-top">
          <strong>${escapeHtml(encounter.title || "Cena sem nome")}</strong>
          <span>Rodada ${escapeHtml(String(encounter.round || 1))}</span>
        </div>
        <p>${escapeHtml(encounter.notes || "Sem resumo da cena ainda.")}</p>
        <div class="encounter-participant-pills">
          ${encounter.entries
            .map((entry) => `<span class="encounter-pill ${entry.id === encounter.activeId ? "active" : ""}">${escapeHtml(entry.name)} • ${escapeHtml(String(entry.initiative))}</span>`)
            .join("")}
        </div>
        <p class="hint">Turno atual: ${escapeHtml(activeEntry?.name || "Nenhum")}</p>
      </div>
    `
    : '<p class="empty-state">Adicione combatentes na iniciativa para montar o encontro atual.</p>';

  const roomMarkup = roomEncounter && Array.isArray(roomEncounter.entries) && roomEncounter.entries.length > 0
    ? `
      <div class="encounter-summary-block remote">
        <div class="encounter-summary-top">
          <strong>Sala Online</strong>
          <span>Rodada ${escapeHtml(String(roomEncounter.round || 1))}</span>
        </div>
        <p>${escapeHtml(roomEncounter.title || "Encontro compartilhado")}</p>
        <div class="encounter-participant-pills">
          ${roomEncounter.entries
            .map((entry) => `<span class="encounter-pill ${entry.id === roomEncounter.activeId ? "active" : ""}">${escapeHtml(entry.name || "Participante")}</span>`)
            .join("")}
        </div>
      </div>
    `
    : "";

  elements.encounterSummary.innerHTML = `${localMarkup}${roomMarkup}`;
  renderCombatHud();
}

async function syncRoomEncounterState() {
  if (!currentRoomId || !firebaseReady || !firebaseDatabaseRef) {
    renderEncounterPanel();
    return;
  }

  if (!isCurrentUserRoomHost()) {
    renderEncounterPanel();
    return;
  }

  try {
    await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/encounter`).set(buildEncounterSnapshot());
  } catch {
    // Ignore room encounter sync failures and keep the local summary.
  }

  renderEncounterPanel();
}

function handleInitiativeAddSelf() {
  initiativeEntries = [
    ...initiativeEntries,
    createEmptyInitiativeEntry({ name: elements.name.value.trim() || "Personagem", tag: "Jogador" }),
  ];
  renderInitiativeTracker();
  queueAutoSave();
}

function handleInitiativeAdd() {
  initiativeEntries = [...initiativeEntries, createEmptyInitiativeEntry({ name: "Novo combatente" })];
  renderInitiativeTracker();
  queueAutoSave();
}

function sortInitiativeEntries() {
  initiativeEntries = [...initiativeEntries].sort((a, b) => b.initiative - a.initiative);
  if (!initiativeEntries.some((entry) => entry.id === activeInitiativeId)) {
    activeInitiativeId = initiativeEntries[0]?.id || "";
  }
  renderInitiativeTracker();
  queueAutoSave();
}

function advanceInitiativeTurn() {
  if (!initiativeEntries.length) {
    return;
  }

  const expiredConditions = [];
  combatConditions = combatConditions.map((condition) => {
    if (!condition.active || condition.turns <= 0) {
      return condition;
    }

    const nextTurns = Math.max(0, condition.turns - 1);
    if (nextTurns === 0) {
      expiredConditions.push(condition.name);
      return {
        ...condition,
        active: false,
        turns: 0,
      };
    }

    return {
      ...condition,
      turns: nextTurns,
    };
  });

  const ordered = [...initiativeEntries].sort((a, b) => b.initiative - a.initiative);
  const currentIndex = Math.max(0, ordered.findIndex((entry) => entry.id === activeInitiativeId));
  const nextIndex = (currentIndex + 1) % ordered.length;
  if (nextIndex === 0) {
    initiativeRound += 1;
  }
  activeInitiativeId = ordered[nextIndex].id;
  initiativeEntries = ordered;
  renderInitiativeTracker();
  renderConditions();
  void syncRoomEncounterState();
  void pushRoomLog("Turno", `Turno atual: ${ordered[nextIndex]?.name || "Combatente"}. Rodada ${initiativeRound}.`);
  if (expiredConditions.length > 0) {
    alert(`Condições encerradas: ${expiredConditions.join(", ")}.`);
  }
  queueAutoSave();
}

function handleInitiativeListInput(event) {
  const field = event.target instanceof Element ? event.target.closest("[data-initiative-field]") : null;
  const row = event.target instanceof Element ? event.target.closest("[data-initiative-id]") : null;
  if (!field || !row) {
    return;
  }

  const entry = initiativeEntries.find((item) => item.id === row.dataset.initiativeId);
  if (!entry) {
    return;
  }

  const fieldName = field.dataset.initiativeField;
  if (!fieldName) {
    return;
  }

  entry[fieldName] = field instanceof HTMLInputElement && field.type === "number"
    ? Number.parseInt(field.value || "0", 10) || 0
    : field.value;

  queueAutoSave();
}

function handleInitiativeListClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-initiative-action]") : null;
  const row = event.target instanceof Element ? event.target.closest("[data-initiative-id]") : null;
  if (!trigger || !row) {
    return;
  }

  const entryId = row.dataset.initiativeId || "";

  if (trigger.dataset.initiativeAction === "delete") {
    initiativeEntries = initiativeEntries.filter((entry) => entry.id !== entryId);
    if (activeInitiativeId === entryId) {
      activeInitiativeId = initiativeEntries[0]?.id || "";
    }
    renderInitiativeTracker();
    queueAutoSave();
    return;
  }

  activeInitiativeId = entryId;
  renderInitiativeTracker();
  queueAutoSave();
}

function createConditionState(name) {
  return {
    id: generateId(),
    name,
    active: false,
    turns: 0,
  };
}

function normalizeConditionState(condition) {
  const parsedTurns = Number.parseInt(String(condition?.turns ?? "0"), 10);
  return {
    id: typeof condition?.id === "string" && condition.id ? condition.id : generateId(),
    name: typeof condition?.name === "string" && condition.name ? condition.name : "Condição",
    active: Boolean(condition?.active),
    turns: Number.isNaN(parsedTurns) ? 0 : clamp(parsedTurns, 0, 99),
  };
}

function deriveConditionStates(character) {
  const stored = Array.isArray(character?.combat?.conditions)
    ? character.combat.conditions.map((condition) => normalizeConditionState(condition))
    : [];

  combatConditions = CONDITION_PRESETS.map((name) => {
    const existing = stored.find((condition) => normalize(condition.name) === normalize(name));
    return existing || createConditionState(name);
  });
}

function readConditionStatesData() {
  return (Array.isArray(combatConditions) ? combatConditions : [])
    .map((condition) => normalizeConditionState(condition));
}

function renderConditions() {
  if (!elements.conditionsList) {
    return;
  }

  elements.conditionsList.innerHTML = "";
  combatConditions = (Array.isArray(combatConditions) ? combatConditions : [])
    .map((condition) => normalizeConditionState(condition));

  if (!combatConditions.length) {
    combatConditions = CONDITION_PRESETS.map((name) => createConditionState(name));
  }

  combatConditions.forEach((condition) => {
    const shortLabel = CONDITION_SHORT_LABELS[condition.name] || condition.name.slice(0, 2).toUpperCase();
    const card = document.createElement("div");
    card.className = condition.active ? "condition-chip active" : "condition-chip";
    card.dataset.conditionId = condition.id;
    card.innerHTML = `
      <button type="button" class="condition-toggle" data-condition-action="toggle" title="${escapeHtml(condition.name)}">
        <span class="condition-mark">${escapeHtml(shortLabel)}</span>
        <span class="condition-name">${escapeHtml(condition.name)}</span>
      </button>
    `;
    elements.conditionsList.appendChild(card);
  });

  renderProfileStatusIcons();
  renderSheetMetaPanels();
}

function handleConditionListClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-condition-action]") : null;
  const card = event.target instanceof Element ? event.target.closest("[data-condition-id]") : null;
  if (!trigger || !card) {
    return;
  }

  const condition = combatConditions.find((item) => item.id === card.dataset.conditionId);
  if (!condition) {
    return;
  }

  condition.active = !condition.active;
  recordChangeHistory("Condição alterada", `${condition.name} • ${condition.active ? "ativa" : "removida"}`);
  renderConditions();
  queueAutoSave();
}

function handleConditionListInput(event) {
  const field = event.target instanceof Element ? event.target.closest("[data-condition-field]") : null;
  const card = event.target instanceof Element ? event.target.closest("[data-condition-id]") : null;
  if (!field || !card) {
    return;
  }

  const condition = combatConditions.find((item) => item.id === card.dataset.conditionId);
  if (!condition) {
    return;
  }

  condition.turns = Number.parseInt(field.value || "0", 10) || 0;
  queueAutoSave();
}

function renderProfileStatusIcons() {
  if (!elements.profileStatusIcons) {
    return;
  }

  const icons = [];
  if (elements.wounds?.value) {
    icons.push({ label: elements.wounds.value, kind: "wound" });
  }

  if (!icons.length) {
    elements.profileStatusIcons.innerHTML = "";
    return;
  }

  elements.profileStatusIcons.innerHTML = icons
    .map((icon) => `<span class="profile-status-icon ${icon.kind}">${escapeHtml(icon.label)}</span>`)
    .join("");
}

function deriveRollHistoryEntries(character) {
  rollHistoryEntries = Array.isArray(character?.combat?.rollHistory)
    ? character.combat.rollHistory
      .filter((entry) => entry && typeof entry === "object")
      .slice(0, 24)
      .map((entry) => ({
        id: typeof entry.id === "string" && entry.id ? entry.id : generateId(),
        kind: typeof entry.kind === "string" ? entry.kind : "Rolagem",
        label: typeof entry.label === "string" ? entry.label : "Teste",
        total: Number.parseInt(String(entry.total ?? "0"), 10) || 0,
        detail: typeof entry.detail === "string" ? entry.detail : "",
        dice: Array.isArray(entry.dice) ? entry.dice.map((value) => Number(value) || 0) : [],
        at: typeof entry.at === "string" ? entry.at : new Date().toISOString(),
      }))
    : [];
}

function readRollHistoryData() {
  return (Array.isArray(rollHistoryEntries) ? rollHistoryEntries : []).slice(0, 24);
}

function recordRollHistory(entry) {
  rollHistoryEntries = [{
    id: generateId(),
    kind: entry.kind || "Rolagem",
    label: entry.label || "Teste",
    total: Number.parseInt(String(entry.total ?? "0"), 10) || 0,
    detail: entry.detail || "",
    dice: Array.isArray(entry.rolls) ? entry.rolls : [],
    at: new Date().toISOString(),
  }, ...rollHistoryEntries].slice(0, 24);

  renderRollHistory();
  queueAutoSave();
}

function renderRollHistory() {
  if (!elements.rollHistoryList) {
    return;
  }

  elements.rollHistoryList.innerHTML = "";

  if (!rollHistoryEntries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhuma rolagem registrada nesta sessão.";
    elements.rollHistoryList.appendChild(empty);
    return;
  }

  rollHistoryEntries.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "roll-history-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(entry.kind)} • ${escapeHtml(entry.label)}</strong>
        <p>${escapeHtml(entry.detail || "Sem detalhe extra")} • ${escapeHtml(formatDateTime(entry.at))}</p>
      </div>
      <div class="roll-history-value">
        <span>${escapeHtml(String(entry.total))}</span>
        <small>${escapeHtml(entry.dice.join(", ") || "-")}</small>
      </div>
    `;
    elements.rollHistoryList.appendChild(item);
  });
}

function clearRollHistory() {
  rollHistoryEntries = [];
  renderRollHistory();
  queueAutoSave();
}

function normalizeChangeHistoryEntry(entry) {
  return {
    id: typeof entry?.id === "string" && entry.id ? entry.id : generateId(),
    label: typeof entry?.label === "string" && entry.label ? entry.label : "Alteração",
    detail: typeof entry?.detail === "string" ? entry.detail : "",
    at: typeof entry?.at === "string" && entry.at ? entry.at : new Date().toISOString(),
  };
}

function deriveChangeHistoryEntries(character) {
  changeHistoryEntries = Array.isArray(character?.ui?.changeHistory)
    ? character.ui.changeHistory
        .filter((entry) => entry && typeof entry === "object")
        .slice(0, MAX_CHANGE_HISTORY_ENTRIES)
        .map((entry) => normalizeChangeHistoryEntry(entry))
    : [];
}

function readChangeHistoryData() {
  return (Array.isArray(changeHistoryEntries) ? changeHistoryEntries : [])
    .slice(0, MAX_CHANGE_HISTORY_ENTRIES);
}

function recordChangeHistory(label, detail = "") {
  const normalized = normalizeChangeHistoryEntry({
    label,
    detail,
    at: new Date().toISOString(),
  });
  const latest = changeHistoryEntries[0];
  if (
    latest
    && latest.label === normalized.label
    && latest.detail === normalized.detail
    && Math.abs(new Date(normalized.at).getTime() - new Date(latest.at).getTime()) < 1200
  ) {
    latest.at = normalized.at;
  } else {
    changeHistoryEntries = [normalized, ...changeHistoryEntries].slice(0, MAX_CHANGE_HISTORY_ENTRIES);
  }

  renderChangeHistory();
  renderSessionSummary();
  pushUiToast(detail ? `${label}: ${detail}` : label, "history");
}

function clearChangeHistory() {
  changeHistoryEntries = [];
  renderChangeHistory();
  queueAutoSave();
}

function pushUiToast(message, kind = "info", duration = 2400) {
  if (!elements.uiToastStack || !message) {
    return;
  }

  const existingToasts = Array.from(elements.uiToastStack.querySelectorAll(".ui-toast"));
  if (existingToasts.length >= 3) {
    existingToasts.slice(0, existingToasts.length - 2).forEach((toast) => toast.remove());
  }

  const toast = document.createElement("div");
  toast.className = `ui-toast ${kind}`.trim();
  toast.textContent = message;
  elements.uiToastStack.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("visible");
  });

  const leaveDelay = Math.max(400, duration - 260);
  window.setTimeout(() => {
    toast.classList.remove("visible");
    toast.classList.add("leaving");
  }, leaveDelay);

  window.setTimeout(() => {
    toast.remove();
  }, duration);
}

function notifySheetSaved(message = "Registro salvo") {
  const now = Date.now();
  if (now - lastSaveToastAt < 1800) {
    return;
  }

  lastSaveToastAt = now;
  pushUiToast(message, "status", 1800);
}

function getCurrentSheetSnapshotPreview() {
  if (editorMode === "master") {
    return getActiveMasterRecord()?.snapshot || null;
  }

  return readFormData({ validateRequired: false })
    || characters.find((item) => item.id === editingId)
    || null;
}

function getCurrentSheetStatusItems(snapshot = null) {
  const activeSnapshot = snapshot || getCurrentSheetSnapshotPreview();
  const missionLabel = currentRoomId
    ? `${currentRoomId} • conectado`
    : "Offline";
  const masterLabel = activeSnapshot?.masterShareId
    ? "Sincronizado"
    : "Local";
  const modeParts = [];
  if (combatModeEnabled) {
    modeParts.push("Combate");
  }
  if (readModeEnabled) {
    modeParts.push("Leitura");
  }

  return [
    { label: "Auto save", value: autoSavePending ? "Salvando..." : "Estável" },
    { label: "Mestre", value: masterLabel },
    { label: "Sessão", value: missionLabel },
    { label: "Modos", value: modeParts.length ? modeParts.join(" • ") : "Normal" },
    { label: "Último save", value: lastSavedAt ? formatDateTime(lastSavedAt) : "-" },
  ];
}

function renderSheetStatusCenter() {
  if (!elements.sheetStatusList || !elements.sheetStatusBadge) {
    return;
  }

  const snapshot = getCurrentSheetSnapshotPreview();
  const statusItems = getCurrentSheetStatusItems(snapshot);
  elements.sheetStatusList.innerHTML = statusItems
    .map((item) => `
      <article class="status-center-item">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </article>
    `)
    .join("");

  elements.sheetStatusBadge.textContent = autoSavePending ? "Atualizando" : "Pronto";
  elements.sheetStatusBadge.classList.toggle("pending", autoSavePending);
}

function renderTopModeIndicator() {
  if (!elements.topModeIndicator) {
    return;
  }

  const labels = [];
  if (combatModeEnabled) {
    labels.push("Combate");
  } else if (readModeEnabled) {
    labels.push("Leitura");
  }

  if (inActionEnabled) {
    labels.push("Ativo");
  }

  if (!labels.length) {
    elements.topModeIndicator.textContent = "";
    elements.topModeIndicator.classList.add("hidden");
    return;
  }

  elements.topModeIndicator.textContent = labels.join(" • ");
  elements.topModeIndicator.classList.remove("hidden");
}

function renderSessionSummary() {
  if (!elements.sessionSummaryContent) {
    return;
  }

  const snapshot = getCurrentSheetSnapshotPreview();
  if (!snapshot) {
    elements.sessionSummaryContent.innerHTML = '<p class="empty-state">Abra um registro para montar o resumo da sessão.</p>';
    return;
  }

  const resources = snapshot.resources || {};
  const pd = deriveTrack(resources.pdMax, resources.pdLost);
  const san = getEffectiveTrackView("san", deriveTrack(resources.sanMax, resources.sanLost));
  const pe = deriveTrack(resources.peMax, resources.peLost);
  const trainedSkills = skillsCatalog
    .filter((skill) => (SKILL_RANK_BONUS[snapshot.skillRanks?.[skill.name] || "Destreinado"] || 0) > 0)
    .slice(0, 5)
    .map((skill) => skill.name);
  const filledInventory = readInventoryData().filter((item) => item.name || item.description || item.image);
  const attacksCount = readAttackEntriesData().length;
  const abilitiesCount = readAbilitiesData().length;

  elements.sessionSummaryContent.innerHTML = `
    <article class="session-summary-item">
      <span>Identificação</span>
      <strong>${escapeHtml(snapshot.name || "Registro sem nome")}</strong>
      <p>${escapeHtml(snapshot.class || "-")} • ${escapeHtml(snapshot.trail || "-")}</p>
    </article>
    <article class="session-summary-item">
      <span>Recursos</span>
      <strong>PV ${escapeHtml(formatTrack(pd))}</strong>
      <p>SAN ${escapeHtml(formatTrack(san))} • PE ${escapeHtml(formatTrack(pe))} • NEX ${escapeHtml(String(resources.nex ?? 0))}%</p>
    </article>
    <article class="session-summary-item">
      <span>Treinadas</span>
      <strong>${escapeHtml(String(trainedSkills.length))} perícia(s)</strong>
      <p>${escapeHtml(trainedSkills.join(", ") || "Nenhuma treinada")}</p>
    </article>
    <article class="session-summary-item">
      <span>Arsenal</span>
      <strong>${escapeHtml(String(attacksCount))} ataque(s) • ${escapeHtml(String(abilitiesCount))} habilidade(s)</strong>
      <p>${attacksCount + abilitiesCount > 0 ? "Recursos prontos para a sessão." : "Sem ações especiais cadastradas."}</p>
    </article>
    <article class="session-summary-item">
      <span>Inventário</span>
      <strong>${escapeHtml(String(filledInventory.length))} item(ns)</strong>
      <p>${currentRoomId ? `Sessão ${escapeHtml(currentRoomId)}` : "Uso local"}</p>
    </article>
  `;
}

function renderChangeHistory() {
  if (!elements.changeHistoryList) {
    return;
  }

  elements.changeHistoryList.innerHTML = "";

  if (!changeHistoryEntries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "As últimas alterações da ficha aparecem aqui.";
    elements.changeHistoryList.appendChild(empty);
    return;
  }

  changeHistoryEntries.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "change-history-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(entry.label)}</strong>
        <p>${escapeHtml(entry.detail || "Atualização manual")}</p>
      </div>
      <span>${escapeHtml(formatDateTime(entry.at))}</span>
    `;
    elements.changeHistoryList.appendChild(item);
  });
}

function renderSheetMetaPanels() {
  renderTopModeIndicator();
  renderSheetStatusCenter();
  renderChangeHistory();
  renderSessionSummary();
  renderCombatHud();
}

function describeFieldChange(target) {
  if (!(target instanceof HTMLElement)) {
    return null;
  }

  const directMap = {
    name: "Nome alterado",
    birthdate: "Data de nascimento alterada",
    origin: "Origem/profissão alterada",
    "character-height": "Altura alterada",
    "character-weight": "Peso alterado",
    class: "Classe alterada",
    trail: "Trilha alterada",
    defense: "Defesa alterada",
    movement: "Deslocamento alterado",
    wounds: "Ferimentos alterados",
    nex: "NEX alterado",
  };

  if (target.id && directMap[target.id]) {
    return { label: directMap[target.id], detail: "" };
  }

  const customLabel = target.dataset.changeLabel || "";
  if (customLabel) {
    return { label: customLabel, detail: "" };
  }

  return null;
}

function handleCombatQuickActionsClick(event) {
  const button = event.target instanceof Element ? event.target.closest("[data-quick-track]") : null;
  if (!button) {
    return;
  }

  const trackName = button.getAttribute("data-quick-track") || "";
  const delta = Number.parseInt(button.getAttribute("data-quick-delta") || "0", 10) || 0;
  if (!trackName || !delta) {
    return;
  }

  adjustTrack(trackName, delta);
  triggerMenuButtonAnimation(button);
}

function renderCombatHud() {
  if (
    !elements.combatCurrentTurn
    || !elements.combatRoundDisplay
    || !elements.combatDefenseDisplay
    || !elements.combatMovementDisplay
    || !elements.combatWoundsDisplay
    || !elements.combatPressureDisplay
    || !elements.combatActionState
    || !elements.combatActionHint
    || !elements.combatHudChips
  ) {
    return;
  }

  const pd = safeRead(() => readTrackValues(elements.pdMax.value, elements.pdLost.value), { max: 0, lost: 0, current: 0 });
  const pe = safeRead(() => readTrackValues(elements.peMax.value, elements.peLost.value), { max: 0, lost: 0, current: 0 });
  const san = safeRead(() => getEffectiveTrackView("san", readTrackValues(elements.sanMax.value, elements.sanLost.value)), { max: 0, lost: 0, current: 0 });
  const nex = safeRead(() => readTrackValues(elements.nexMax.value, elements.nexLost.value), { max: 100, lost: 95, current: 5 });
  const effectiveDefense = getEffectiveDefenseValue(readNumber(elements.defense?.value) ?? 0);
  const movement = String(elements.movement?.value || "").trim() || "0m";
  const wounds = String(elements.wounds?.value || "").trim() || "Estável";
  const orderedInitiative = [...(Array.isArray(initiativeEntries) ? initiativeEntries : [])]
    .map((entry) => normalizeInitiativeEntry(entry))
    .filter((entry) => entry.name.trim())
    .sort((a, b) => b.initiative - a.initiative);
  const activeEntry = orderedInitiative.find((entry) => entry.id === activeInitiativeId) || orderedInitiative[0] || null;
  const activeConditions = (Array.isArray(combatConditions) ? combatConditions : [])
    .map((condition) => normalizeConditionState(condition))
    .filter((condition) => condition.active);
  const abilitiesReady = (Array.isArray(combatAbilities) ? combatAbilities : [])
    .map((ability) => normalizeAbility(ability))
    .filter((ability) => ability.name || ability.description);
  const attacksReady = (Array.isArray(attackEntries) ? attackEntries : [])
    .map((entry) => normalizeAttackEntry(entry))
    .filter((entry) => entry.name || entry.damage || entry.notes);

  let pressure = "Sem pressão imediata";
  if (wounds === "Morto") {
    pressure = "Registro encerrado";
  } else if (pd.max > 0 && pd.current / pd.max <= 0.25) {
    pressure = "Vida crítica";
  } else if (san.max > 0 && san.current / Math.max(1, san.max) <= 0.25) {
    pressure = "Mente instável";
  } else if (activeConditions.length > 0) {
    pressure = `${activeConditions.length} efeito${activeConditions.length > 1 ? "s" : ""} ativo${activeConditions.length > 1 ? "s" : ""}`;
  } else if (wounds !== "Estável") {
    pressure = `Estado ${wounds.toLowerCase()}`;
  }

  let actionState = "Sem arsenal";
  let actionHint = "Cadastre ataques ou habilidades para agir.";
  if (attacksReady.length > 0 && abilitiesReady.length > 0) {
    actionState = `${attacksReady.length} ataques`;
    actionHint = `${abilitiesReady.length} habilidade${abilitiesReady.length > 1 ? "s" : ""} pronta${abilitiesReady.length > 1 ? "s" : ""}.`;
  } else if (attacksReady.length > 0) {
    actionState = `${attacksReady.length} ataques`;
    actionHint = "Use o arsenal para acerto, dano e consumo.";
  } else if (abilitiesReady.length > 0) {
    actionState = `${abilitiesReady.length} habilidade${abilitiesReady.length > 1 ? "s" : ""}`;
    actionHint = "Sem ataque pronto, mas há habilidade para usar.";
  }

  elements.combatCurrentTurn.textContent = activeEntry?.name || "Sem ordem";
  elements.combatRoundDisplay.textContent = `Rodada ${initiativeRound || 1}`;
  elements.combatDefenseDisplay.textContent = String(effectiveDefense);
  elements.combatMovementDisplay.textContent = `Deslocamento ${movement}`;
  elements.combatWoundsDisplay.textContent = wounds;
  elements.combatPressureDisplay.textContent = pressure;
  elements.combatActionState.textContent = actionState;
  elements.combatActionHint.textContent = actionHint;

  elements.combatHudChips.innerHTML = [
    { label: "PV", value: `${pd.current}/${pd.max}` },
    { label: "PE", value: `${pe.current}/${pe.max}` },
    { label: "SAN", value: `${san.current}/${san.max}` },
    { label: "NEX", value: `${nex.current}%` },
    { label: "Condições", value: activeConditions.length ? String(activeConditions.length) : "0" },
    { label: "Turno", value: activeEntry ? String(activeEntry.initiative) : "-" },
  ]
    .map((item) => `
      <span class="combat-hud-chip">
        <small>${escapeHtml(item.label)}</small>
        <strong>${escapeHtml(item.value)}</strong>
      </span>
    `)
    .join("");
}

function downloadJsonFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 200);
}

function handleExportCharacter() {
  const existingCharacter = editorMode === "master"
    ? getActiveMasterRecord()?.snapshot || null
    : characters.find((item) => item.id === editingId) || null;
  const payload = readFormData({ validateRequired: false }) || existingCharacter;

  if (!payload) {
    alert("Nenhum registro aberto para exportar.");
    return;
  }

  downloadJsonFile(
    `${slugify(payload.name || "registro") || "registro"}.json`,
    payload
  );
}

function handleImportCharacterFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const migrated = migrateCharacter({
        ...parsed,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (!migrated) {
        throw new Error("Arquivo inválido.");
      }

      characters.push(migrated);
      saveCharacters(characters);
      renderCharacterList();
      loadCharacter(migrated.id);
      closeModeMenu(true);
      alert(`Registro "${migrated.name || "Personagem"}" importado.`);
    } catch {
      alert("Não foi possível importar esse arquivo JSON.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function buildFullBackupPayload() {
  return {
    version: 4,
    exportedAt: new Date().toISOString(),
    rollDiceCount: clampRollDiceCount(rollDiceCount),
    rollDieType: clampRollDieType(rollDieType),
    characters: loadCharacters(),
    masterShares: loadMasterShares(),
    masterNpcs: loadMasterNpcs(),
    masterInventoryTemplates: loadMasterInventoryTemplates(),
    campaignDiary: loadCampaignDiary(),
    masterSecretNotes: loadMasterSecretNotes(),
    menuEventSettings: loadMenuEventSettings(),
  };
}

function loadSafetyBackups() {
  try {
    const raw = localStorage.getItem(SAFETY_BACKUP_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function recoverCharactersFromSafetyBackup() {
  const snapshots = loadSafetyBackups();

  for (const snapshot of snapshots) {
    const collection = parseStoredCharacterCollection(snapshot?.payload?.characters);
    const migrated = collection
      .map((character) => migrateCharacter(character))
      .filter((character) => character !== null);

    if (migrated.length > 0) {
      return migrated;
    }
  }

  return [];
}

function recordSafetyBackup(reason = "autosave") {
  try {
    const snapshots = loadSafetyBackups();
    snapshots.unshift({
      id: generateId(),
      at: new Date().toISOString(),
      reason,
      payload: buildFullBackupPayload(),
    });
    localStorage.setItem(SAFETY_BACKUP_STORAGE_KEY, JSON.stringify(snapshots.slice(0, 8)));
  } catch {
    // Ignore private mode / quota issues.
  }
}

function exportFullBackup() {
  downloadJsonFile(
    `nemesis-backup-${new Date().toISOString().slice(0, 10)}.json`,
    buildFullBackupPayload()
  );
}

function handleImportBackupFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      importBackupPayload(parsed);
      alert("Backup restaurado com sucesso.");
    } catch {
      alert("Não foi possível restaurar esse backup.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function importBackupPayload(payload) {
  const importedCharacters = Array.isArray(payload?.characters)
    ? payload.characters.map((character) => migrateCharacter(character)).filter((character) => character)
    : [];
  const importedShares = Array.isArray(payload?.masterShares)
    ? payload.masterShares.map((record) => migrateMasterShareRecord(record)).filter((record) => record)
    : [];
  const importedNpcs = Array.isArray(payload?.masterNpcs)
    ? payload.masterNpcs.map((npc) => normalizeMasterNpc(npc)).filter((npc) => npc)
    : [];
  const importedMasterInventoryTemplates = Array.isArray(payload?.masterInventoryTemplates)
    ? payload.masterInventoryTemplates
      .map((template, index) => normalizeMasterInventoryTemplate(template, index))
      .filter((template) => template)
    : [];
  const importedDiary = payload?.campaignDiary && typeof payload.campaignDiary === "object"
    ? {
      sessions: Array.isArray(payload.campaignDiary.sessions)
        ? payload.campaignDiary.sessions.map((session) => normalizeDiarySession(session))
        : [],
      updatedAt: typeof payload.campaignDiary.updatedAt === "string"
        ? payload.campaignDiary.updatedAt
        : new Date().toISOString(),
    }
    : { sessions: [], updatedAt: new Date().toISOString() };
  const importedSecretNotes = payload?.masterSecretNotes && typeof payload.masterSecretNotes === "object"
    ? payload.masterSecretNotes
    : {};
  const importedMenuEventSettings = normalizeMenuEventSettings(
    payload?.menuEventSettings || DEFAULT_MENU_EVENT_SETTINGS
  );

  characters = importedCharacters;
  masterShares = importedShares;
  masterNpcs = importedNpcs;
  masterInventoryTemplates = importedMasterInventoryTemplates;
  campaignDiary = importedDiary;
  masterSecretNotes = importedSecretNotes;
  menuEventSettings = importedMenuEventSettings;
  rollDiceCount = clampRollDiceCount(Number(payload?.rollDiceCount) || 1);
  rollDieType = clampRollDieType(Number(payload?.rollDieType) || 20);

  saveCharacters(characters);
  saveMasterShares(masterShares);
  saveMasterNpcs(masterNpcs);
  saveMasterInventoryTemplates(masterInventoryTemplates);
  saveCampaignDiary(campaignDiary);
  saveMasterSecretNotes(masterSecretNotes);
  saveMenuEventSettings(menuEventSettings);
  saveRollDiceCount(rollDiceCount);
  saveRollDieType(rollDieType);
  renderMenuEventSettingsControls();
  refreshMenuAmbientEffects(true);
  syncRollDiceControls();
  renderCharacterList();
  renderMasterCharacterList();
  renderMasterInventoryScreen();
  renderMasterNpcList();
  renderMasterNpcEditor();
  renderCampaignDiary();
  if (characters.length > 0) {
    loadCharacter(characters[0].id);
  } else {
    resetForm();
  }
}

function updateInstallAppAvailability() {
  if (!elements.installAppButton) {
    return;
  }

  elements.installAppButton.classList.toggle("hidden", !installPromptEvent);
}

function handleBeforeInstallPrompt(event) {
  event.preventDefault();
  installPromptEvent = event;
  updateInstallAppAvailability();
}

function handleAppInstalled() {
  installPromptEvent = null;
  updateInstallAppAvailability();
}

async function handleInstallApp() {
  if (!installPromptEvent) {
    return;
  }

  installPromptEvent.prompt();
  try {
    await installPromptEvent.userChoice;
  } catch {
    // Ignore dismissed prompt.
  }
  installPromptEvent = null;
  updateInstallAppAvailability();
}

function registerPwaShell() {
  updateInstallAppAvailability();
  if (!("serviceWorker" in navigator)) {
    return;
  }

    navigator.serviceWorker.register("./service-worker.js?v=20260413-1", { updateViaCache: "none" }).then((registration) => {
    registration.update().catch(() => undefined);
  }).catch(() => {
    // Ignore service worker registration failures.
  });
}

function loadRuntimeFirebaseConfig() {
  try {
    const raw = localStorage.getItem(FIREBASE_RUNTIME_CONFIG_KEY);
    const parsed = JSON.parse(raw || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function setFirebaseConfigFeedback(message, isError = false) {
  if (!elements.firebaseConfigFeedback) {
    return;
  }

  elements.firebaseConfigFeedback.textContent = message || "";
  elements.firebaseConfigFeedback.classList.toggle("error", Boolean(message) && isError);
  elements.firebaseConfigFeedback.classList.toggle("success", Boolean(message) && !isError);
}

function hydrateRuntimeFirebaseConfigUI() {
  if (!elements.firebaseConfigJson) {
    return;
  }

  const runtimeConfig = loadRuntimeFirebaseConfig();
  const fallbackConfig = window.NEMESIS_FIREBASE_CONFIG && typeof window.NEMESIS_FIREBASE_CONFIG === "object"
    ? window.NEMESIS_FIREBASE_CONFIG
    : null;
  const activeConfig = runtimeConfig || fallbackConfig;

  elements.firebaseConfigJson.value = activeConfig
    ? JSON.stringify(activeConfig, null, 2)
    : "";
  setFirebaseConfigFeedback(
    runtimeConfig
      ? "Configuração local do Firebase pronta para uso."
      : fallbackConfig
        ? "Usando a configuração vinda do arquivo firebase-config.js."
        : "Você pode colar o JSON do Firebase aqui ou manter o arquivo local."
  );
}

function validateFirebaseConfig(config) {
  if (!config || typeof config !== "object") {
    return false;
  }

  const required = ["apiKey", "authDomain", "databaseURL", "projectId", "appId"];
  return required.every((key) => typeof config[key] === "string" && config[key].trim());
}

function saveRuntimeFirebaseConfig() {
  const raw = elements.firebaseConfigJson?.value.trim() || "";
  if (!raw) {
    setFirebaseConfigFeedback("Cole um JSON válido antes de salvar.", true);
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!validateFirebaseConfig(parsed)) {
      throw new Error("Campos obrigatórios ausentes.");
    }
    localStorage.setItem(FIREBASE_RUNTIME_CONFIG_KEY, JSON.stringify(parsed));
    setFirebaseConfigFeedback("Firebase salvo. Recarregando o app para conectar as salas.");
    window.setTimeout(() => window.location.reload(), 500);
  } catch {
    setFirebaseConfigFeedback("Não foi possível ler esse JSON do Firebase.", true);
  }
}

function clearRuntimeFirebaseConfig() {
  localStorage.removeItem(FIREBASE_RUNTIME_CONFIG_KEY);
  if (elements.firebaseConfigJson) {
    elements.firebaseConfigJson.value = "";
  }
  setFirebaseConfigFeedback("Configuração local removida. Recarregando o app.");
  window.setTimeout(() => window.location.reload(), 350);
}

function getFirebaseConfig() {
  const runtimeConfig = loadRuntimeFirebaseConfig();
  if (runtimeConfig) {
    return runtimeConfig;
  }

  return window.NEMESIS_FIREBASE_CONFIG && typeof window.NEMESIS_FIREBASE_CONFIG === "object"
    ? window.NEMESIS_FIREBASE_CONFIG
    : null;
}

function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < 6; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function normalizeSessionCode(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 12);
}

function isValidSessionCode(value) {
  return /^[A-Z0-9]{4,12}$/.test(String(value || ""));
}

function isCurrentUserRoomHost() {
  return Boolean(currentRoomId && firebaseUser?.uid && currentRoomData?.hostUid === firebaseUser.uid);
}

function getRoomLogEntries() {
  const rawLog = currentRoomData?.log;
  if (!rawLog || typeof rawLog !== "object") {
    return [];
  }

  return Object.values(rawLog)
    .filter((entry) => entry && typeof entry === "object")
    .sort((a, b) => {
      const timeA = new Date(a.at || 0).getTime();
      const timeB = new Date(b.at || 0).getTime();
      return timeA < timeB ? 1 : -1;
    })
    .slice(0, 20);
}

function renderRoomLog() {
  if (!elements.roomLogList) {
    return;
  }

  const entries = getRoomLogEntries();
  if (!entries.length) {
    elements.roomLogList.innerHTML = '<p class="empty-state">Nenhuma ação registrada ainda.</p>';
    return;
  }

  elements.roomLogList.innerHTML = entries
    .map((entry) => `
      <article class="room-log-entry">
        <div>
          <strong>${escapeHtml(entry.kind || "Sala")}</strong>
          <p>${escapeHtml(entry.message || "Sem detalhe.")}</p>
        </div>
        <span>${escapeHtml(formatDateTime(entry.at || ""))}</span>
      </article>
    `)
    .join("");
}

async function pushRoomLog(kind, message) {
  if (!currentRoomId || !firebaseReady || !firebaseDatabaseRef) {
    return;
  }

  try {
    const user = await ensureFirebaseAuth();
    const entry = {
      id: generateId(),
      kind,
      message,
      actorUid: user.uid,
      at: new Date().toISOString(),
    };
    await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/log/${entry.id}`).set(entry);
  } catch {
    // Ignore remote log failures to avoid blocking the UI.
  }
}

function getRoomNpcs() {
  const rawNpcs = currentRoomData?.npcs;
  if (!rawNpcs || typeof rawNpcs !== "object") {
    return [];
  }

  return Object.values(rawNpcs)
    .filter((npc) => npc && typeof npc === "object")
    .map((npc) => normalizeMasterNpc(npc))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

function getRoomStatusLabel(status = "") {
  return status === "active" ? "Sessao em andamento" : "Lobby";
}

function getCurrentRoomParticipantData() {
  if (!firebaseUser?.uid) {
    return null;
  }

  return currentRoomData?.participants?.[firebaseUser.uid] || null;
}

function getSortedRoomParticipants() {
  const participants = currentRoomData?.participants && typeof currentRoomData.participants === "object"
    ? Object.entries(currentRoomData.participants)
    : [];

  return participants.sort((entryA, entryB) => {
    const participantA = entryA[1] || {};
    const participantB = entryB[1] || {};

    if (Boolean(participantA.isHost) !== Boolean(participantB.isHost)) {
      return participantA.isHost ? -1 : 1;
    }
    if (Boolean(participantA.ready) !== Boolean(participantB.ready)) {
      return participantA.ready ? -1 : 1;
    }

    return String(participantA.name || "").localeCompare(String(participantB.name || ""), "pt-BR");
  });
}

function renderRoomNpcs() {
  if (!elements.roomNpcsList) {
    return;
  }

  const npcs = getRoomNpcs();
  if (!npcs.length) {
    elements.roomNpcsList.innerHTML = '<p class="empty-state">Nenhum NPC sincronizado na sala.</p>';
    return;
  }

  elements.roomNpcsList.innerHTML = npcs
    .map((npc) => `
      <article class="room-npc-card" data-room-npc-id="${escapeHtml(npc.id)}">
        <div>
          <strong>${escapeHtml(npc.name || "NPC")}</strong>
          <p>${escapeHtml(npc.role || "Sem função")} • PV ${escapeHtml(String(npc.pv))} • DEF ${escapeHtml(String(npc.defense))}</p>
        </div>
        <div class="inline-actions">
          <button type="button" class="secondary" data-room-npc-action="encounter" ${isCurrentUserRoomHost() ? "" : "disabled"}>Entrar no encontro</button>
        </div>
      </article>
    `)
    .join("");
}

function getCurrentRoomActiveEntry() {
  const encounter = currentRoomData?.encounter;
  if (!encounter || !Array.isArray(encounter.entries) || !encounter.entries.length) {
    return null;
  }

  return encounter.entries.find((entry) => entry.id === encounter.activeId) || encounter.entries[0] || null;
}

function canCurrentUserActInRoomTurn() {
  if (!currentRoomId || isCurrentUserRoomHost()) {
    return true;
  }

  const activeEntry = getCurrentRoomActiveEntry();
  if (!activeEntry) {
    return true;
  }

  const currentName = elements.name.value.trim()
    || characters.find((item) => item.id === editingId)?.name
    || "";
  return normalize(currentName) === normalize(activeEntry.name || "");
}

function getRoomTurnLockMessage(actionLabel) {
  const activeEntry = getCurrentRoomActiveEntry();
  if (!currentRoomId || isCurrentUserRoomHost() || !activeEntry) {
    return "";
  }

  return `Só o personagem do turno atual pode ${actionLabel}. Agora é a vez de ${activeEntry.name || "outro participante"}.`;
}

async function sendRoomChatMessage() {
  const message = elements.roomChatMessage?.value.trim() || "";
  if (!currentRoomId) {
    alert("Entre em uma sala antes de enviar mensagens.");
    return;
  }
  if (!message) {
    return;
  }

  const author = elements.name.value.trim()
    || currentRoomData?.participants?.[firebaseUser?.uid || ""]?.name
    || "Participante";
  await pushRoomLog("Chat", `${author}: ${message}`);
  if (elements.roomChatMessage) {
    elements.roomChatMessage.value = "";
  }
}

async function toggleCurrentRoomReady() {
  if (!currentRoomId || !firebaseReady || !firebaseDatabaseRef) {
    alert("Entre em uma sala antes de mudar seu status.");
    return;
  }

  if ((currentRoomData?.status || "lobby") === "active") {
    alert("A sessao ja esta em andamento.");
    return;
  }

  const character = getActiveCharacterForOnline();
  if (!character) {
    alert("Escolha uma ficha salva antes de mudar seu status.");
    return;
  }

  const user = await ensureFirebaseAuth();
  const currentParticipant = currentRoomData?.participants?.[user.uid] || {};
  const nextReady = !Boolean(currentParticipant.ready);
  const isHost = currentRoomData?.hostUid === user.uid;
  const nextTeam = currentParticipant.team || (isHost ? "Host" : "Jogador");

  await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/participants/${user.uid}`).update(
    buildRoomParticipantPayload(character, {
      ready: nextReady,
      team: nextTeam,
      isHost,
    })
  );

  await pushRoomLog(
    "Lobby",
    `${character.name || "Participante"} ${nextReady ? "ficou pronto para a sessao" : "voltou para espera"}.`
  );
}

async function toggleRoomSessionState() {
  if (!currentRoomId || !firebaseReady || !firebaseDatabaseRef) {
    alert("Entre em uma sala antes de mudar o estado da sessao.");
    return;
  }

  if (!isCurrentUserRoomHost()) {
    alert("Somente o host pode iniciar ou encerrar a sessao.");
    return;
  }

  const currentStatus = currentRoomData?.status || "lobby";
  const participants = getSortedRoomParticipants();
  const readyCount = participants.filter(([, participant]) => Boolean(participant?.ready)).length;

  if (currentStatus !== "active" && participants.length > 0 && readyCount < participants.length) {
    alert("Ainda ha participantes sem o status de pronto.");
    return;
  }

  const nextStatus = currentStatus === "active" ? "lobby" : "active";
  await firebaseDatabaseRef.ref(`rooms/${currentRoomId}`).update({
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  });

  await pushRoomLog(
    "Sala",
    nextStatus === "active"
      ? "O host iniciou a sessao."
      : "O host voltou a sala para o lobby."
  );
}

async function syncMasterNpcsToRoom() {
  if (!currentRoomId) {
    alert("Entre em uma sala antes de sincronizar NPCs.");
    return;
  }
  if (!isCurrentUserRoomHost()) {
    alert("Somente o host da sala pode sincronizar NPCs.");
    return;
  }
  if (!firebaseReady || !firebaseDatabaseRef) {
    alert("Firebase indisponível.");
    return;
  }

  const payload = {};
  masterNpcs.forEach((npc) => {
    payload[npc.id] = normalizeMasterNpc(npc);
  });

  await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/npcs`).set(payload);
  await pushRoomLog("NPC", `${Object.keys(payload).length} NPC(s) do mestre foram sincronizados.`);
}

function handleRoomNpcListClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-room-npc-action]") : null;
  const card = event.target instanceof Element ? event.target.closest("[data-room-npc-id]") : null;
  if (!trigger || !card) {
    return;
  }

  if (!isCurrentUserRoomHost()) {
    alert("Somente o host adiciona NPCs ao encontro.");
    return;
  }

  const npc = getRoomNpcs().find((item) => item.id === card.dataset.roomNpcId);
  if (!npc) {
    return;
  }

  initiativeEntries = [
    ...initiativeEntries,
    createEmptyInitiativeEntry({
      name: npc.name || "NPC",
      tag: npc.role || "NPC",
    }),
  ];
  renderInitiativeTracker();
  queueAutoSave();
  void syncRoomEncounterState();
  void pushRoomLog("NPC", `${npc.name || "NPC"} entrou no encontro atual.`);
}

function updateFirebaseStatusPill() {
  if (!elements.roomsFirebaseStatus) {
    return;
  }

  elements.roomsFirebaseStatus.textContent = firebaseReady
    ? (selectedMissionId || currentRoomId)
      ? `Firebase pronto • sessão ${selectedMissionId || currentRoomId}`
      : "Firebase pronto"
    : firebaseUnavailableReason;
  elements.roomsFirebaseStatus.classList.toggle("ready", firebaseReady);
}

function getMissionStatusLabel(status = "") {
  return status === "active" ? "Sessão em andamento" : "Lobby";
}

function getActiveMissionParticipants(mission = null) {
  const rawParticipants = mission?.participants && typeof mission.participants === "object"
    ? Object.entries(mission.participants)
    : [];

  return rawParticipants.filter(([, participant]) => (
    participant
    && typeof participant === "object"
    && participant.snapshot
  ));
}

function getSelectedMissionRecord() {
  return hostMissionRecords.find((item) => item.id === selectedMissionId)
    || selectedMissionData
    || null;
}

function countFilledInventoryItems(snapshot = {}) {
  if (!Array.isArray(snapshot.inventory)) {
    return 0;
  }

  return snapshot.inventory.filter((item) => isInventoryItemFilled(item)).length;
}

function getMissionPanelCharacterRecords() {
  const participants = getActiveMissionParticipants(selectedMissionData);

  const participantRecords = participants
    .sort((entryA, entryB) => {
      const participantA = entryA[1] || {};
      const participantB = entryB[1] || {};

      if (Boolean(participantA.isHost) !== Boolean(participantB.isHost)) {
        return participantA.isHost ? -1 : 1;
      }
      if (Boolean(participantA.ready) !== Boolean(participantB.ready)) {
        return participantA.ready ? -1 : 1;
      }

      return String(participantA.name || "").localeCompare(String(participantB.name || ""), "pt-BR");
    })
    .map(([participantId, participant]) => ({
      id: participant.snapshot?.id || participantId,
      key: `mission-${participantId}`,
      source: "participant",
      live: true,
      participant,
      snapshot: participant.snapshot || {},
    }));

  if (participantRecords.length > 0) {
    return {
      records: participantRecords,
      sourceLabel: `${participantRecords.length} ficha(s) conectada(s) nesta sessão em tempo real.`,
    };
  }

  return {
    records: [],
    sourceLabel: "As fichas aparecem aqui assim que cada jogador conecta o registro pelo código da sessão.",
  };
}

function getMissionParticipantIdentitySets(mission = null) {
  const participants = getActiveMissionParticipants(mission);
  const shareIds = new Set();
  const characterIds = new Set();
  const ownerUids = new Set();

  participants.forEach(([participantId, participant]) => {
    const snapshot = participant?.snapshot || {};
    const shareId = String(snapshot.masterShareId || "").trim();
    const characterId = String(snapshot.id || "").trim();
    const ownerUid = String(participant?.uid || participantId || "").trim();

    if (shareId) {
      shareIds.add(shareId);
    }
    if (characterId) {
      characterIds.add(characterId);
    }
    if (ownerUid) {
      ownerUids.add(ownerUid);
    }
  });

  return { shareIds, characterIds, ownerUids };
}

function getMissionAvailableShareRecords() {
  const mission = getSelectedMissionRecord();
  if (!mission) {
    return [];
  }

  const participantSets = getMissionParticipantIdentitySets(mission);

  return masterShares
    .map((record) => migrateMasterShareRecord(record))
    .filter((record) => record?.shareId && record.snapshot)
    .filter((record) => {
      const snapshot = record.snapshot || {};
      const shareId = String(record.shareId || "").trim();
      const characterId = String(snapshot.id || record.sourceCharacterId || "").trim();
      const ownerUid = String(record.ownerUid || "").trim();

      return !participantSets.shareIds.has(shareId)
        && !participantSets.characterIds.has(characterId)
        && (!ownerUid || !participantSets.ownerUids.has(ownerUid));
    })
    .sort((recordA, recordB) => (String(recordA.updatedAt || "") < String(recordB.updatedAt || "") ? 1 : -1));
}

function buildMissionAvailableShareCards(records = []) {
  if (!records.length) {
    return '<div class="empty-state">Todas as fichas compartilhadas já estão nesta sessão, ou ainda não houve nenhum registro sincronizado pelo jogador.</div>';
  }

  return records
    .map((record) => {
      const snapshot = record.snapshot || {};
      const ownerUid = String(record.ownerUid || "").trim();
      const assignedRoomId = String(record.assignedRoomId || "").trim();
      const assignedElsewhere = Boolean(assignedRoomId && assignedRoomId !== selectedMissionId);
      const statusLabel = ownerUid
        ? assignedElsewhere
          ? `Designada em ${assignedRoomId}`
          : "Disponível"
        : "Sem vínculo online";
      const actionLabel = ownerUid
        ? assignedElsewhere
          ? "Mover para esta sessão"
          : "Adicionar à sessão"
        : "Aguardando vínculo";

      return `
        <article class="mission-assign-card" data-share-id="${escapeHtml(record.shareId || "")}">
          <img class="mission-assign-avatar" style="--image-fit:${escapeHtml(normalizeImageFit(snapshot.profileImageFit))}" src="${escapeHtml(snapshot.profileImage || defaultAvatar)}" alt="Avatar de ${escapeHtml(snapshot.name || "Personagem")}">
          <div class="mission-assign-copy">
            <strong>${escapeHtml(snapshot.name || "Registro sem nome")}</strong>
            <p>${escapeHtml(snapshot.class || "-")} • ${escapeHtml(snapshot.trail || "-")}</p>
            <span>${escapeHtml(statusLabel)}</span>
          </div>
          <button type="button" class="secondary" data-mission-assign-share="${escapeHtml(record.shareId || "")}" ${ownerUid ? "" : "disabled"}>
            ${escapeHtml(actionLabel)}
          </button>
        </article>
      `;
    })
    .join("");
}

function getAssignedMissionForCharacter(character = null) {
  if (!character) {
    return null;
  }

  const shareId = String(character.masterShareId || "").trim();
  const matchingRecord = masterShares.find((record) => {
    if (!record || typeof record !== "object") {
      return false;
    }
    if (shareId && record.shareId === shareId) {
      return true;
    }
    return String(record.sourceCharacterId || "").trim() === String(character.id || "").trim();
  });

  if (!matchingRecord?.assignedRoomId) {
    return null;
  }

  if (matchingRecord.ownerUid && firebaseUser?.uid && matchingRecord.ownerUid !== firebaseUser.uid) {
    return null;
  }

  return {
    roomId: String(matchingRecord.assignedRoomId || "").trim(),
    title: String(matchingRecord.assignedRoomTitle || "").trim(),
    shareId: matchingRecord.shareId,
  };
}

function getMissionCardTab(recordKey) {
  return missionCardTabState[recordKey] || "primary";
}

function getMissionBirthLabel(snapshot = {}) {
  if (!snapshot.birthdate) {
    return "-";
  }

  const age = calculateAge(snapshot.birthdate);
  return `${formatDisplayDate(snapshot.birthdate)}${age !== null ? ` • ${age} anos` : ""}`;
}

function buildMissionTrackMarkup(label, track, toneClass) {
  const percentage = !track?.max ? 0 : clamp((track.current / track.max) * 100, 0, 100);
  return `
    <div class="mission-track-block ${toneClass}">
      <div class="mission-track-copy">
        <span>${escapeHtml(label)}</span>
        <strong>${track?.max !== null && track?.max !== undefined ? `${escapeHtml(String(track.current ?? 0))}/${escapeHtml(String(track.max ?? 0))}` : "-"}</strong>
      </div>
      <div class="mission-track-bar">
        <span style="width:${percentage}%"></span>
      </div>
    </div>
  `;
}

function buildMissionSkillsMarkup(snapshot = {}) {
  const trainedSkills = skillsCatalog
    .slice()
    .filter((skill) => {
      const rank = snapshot.skillRanks?.[skill.name] || "Destreinado";
      return (SKILL_RANK_BONUS[rank] || 0) > 0;
    })
    .sort((skillA, skillB) => {
      const rankA = snapshot.skillRanks?.[skillA.name] || "Destreinado";
      const rankB = snapshot.skillRanks?.[skillB.name] || "Destreinado";
      const bonusA = SKILL_RANK_BONUS[rankA] || 0;
      const bonusB = SKILL_RANK_BONUS[rankB] || 0;
      if (bonusA !== bonusB) {
        return bonusB - bonusA;
      }
      return skillA.name.localeCompare(skillB.name, "pt-BR");
    });

  if (!trainedSkills.length) {
    return '<p class="mission-card-empty">Nenhuma perícia treinada nesta ficha.</p>';
  }

  return trainedSkills
    .map((skill) => {
      const rank = snapshot.skillRanks?.[skill.name] || "Destreinado";
      const bonus = SKILL_RANK_BONUS[rank] || 0;
      const activeClass = bonus > 0 ? " trained" : "";
      return `
        <article class="mission-skill-chip${activeClass}">
          <strong>${escapeHtml(skill.name)}</strong>
          <span>${escapeHtml(skill.attribute)} • ${escapeHtml(SKILL_RANK_SHORT_LABELS[rank] || rank)}${bonus > 0 ? ` (+${bonus})` : ""}</span>
        </article>
      `;
    })
    .join("");
}

function buildMissionRollHistoryMarkup(snapshot = {}) {
  const history = Array.isArray(snapshot.combat?.rollHistory)
    ? snapshot.combat.rollHistory.slice(0, 6)
    : [];

  if (!history.length) {
    return '<p class="mission-card-empty">Nenhuma rolagem recente salva.</p>';
  }

  return history
    .map((entry) => {
      const total = Number.parseInt(String(entry.total ?? "0"), 10) || 0;
      return `
        <article class="mission-history-entry">
          <div class="mission-history-top">
            <strong>${escapeHtml(entry.label || entry.kind || "Rolagem")}</strong>
            <span>${escapeHtml(formatDateTime(entry.at || ""))}</span>
          </div>
          <p>${escapeHtml(entry.detail || entry.kind || "Sem detalhe.")}</p>
          <div class="mission-history-total">
            <span>Total</span>
            <strong>${escapeHtml(String(total))}</strong>
          </div>
        </article>
      `;
    })
    .join("");
}

function buildMissionRollFeedMarkup(records = []) {
  const entries = records
    .flatMap((record) => {
      const snapshot = record.snapshot || {};
      const history = Array.isArray(snapshot.combat?.rollHistory)
        ? snapshot.combat.rollHistory.slice(0, 6)
        : [];
      return history.map((entry) => ({
        id: `${record.key}-${entry.id || generateId()}`,
        actor: snapshot.name || "Personagem",
        label: entry.label || entry.kind || "Rolagem",
        total: Number.parseInt(String(entry.total ?? "0"), 10) || 0,
        detail: entry.detail || "",
        at: entry.at || "",
      }));
    })
    .sort((entryA, entryB) => {
      const timeA = new Date(entryA.at || 0).getTime();
      const timeB = new Date(entryB.at || 0).getTime();
      return timeA < timeB ? 1 : -1;
    })
    .slice(0, 8);

  if (!entries.length) {
    return '<p class="empty-state">As rolagens recentes dos jogadores aparecem aqui assim que acontecerem.</p>';
  }

  return entries
    .map((entry) => `
      <article class="mission-roll-feed-entry">
        <div>
          <strong>${escapeHtml(entry.actor)}</strong>
          <p>${escapeHtml(entry.label)}${entry.detail ? ` • ${escapeHtml(entry.detail)}` : ""}</p>
        </div>
        <div class="mission-roll-feed-total">
          <span>${escapeHtml(formatDateTime(entry.at))}</span>
          <strong>${escapeHtml(String(entry.total))}</strong>
        </div>
      </article>
    `)
    .join("");
}

function buildMissionSheetCardMarkup(record) {
  const snapshot = record.snapshot || {};
  const resources = snapshot.resources || {};
  const pvTrack = deriveTrack(resources.pdMax, resources.pdLost);
  const sanTrack = deriveTrack(resources.sanMax, resources.sanLost);
  const peTrack = deriveTrack(resources.peMax, resources.peLost);
  const inventoryCount = countFilledInventoryItems(snapshot);
  const activeTab = getMissionCardTab(record.key);
  const liveLabel = record.participant?.isHost ? "Host" : "Conectado";

  const primaryMarkup = `
    <div class="mission-card-panel section-primary">
      ${buildMissionTrackMarkup("PV", pvTrack, "pv")}
      ${buildMissionTrackMarkup("SAN", sanTrack, "san")}
      ${buildMissionTrackMarkup("PE", peTrack, "pe")}
      <div class="mission-card-inventory-count">
        <span>Inventário</span>
        <strong>${escapeHtml(String(inventoryCount))} item(ns)</strong>
      </div>
    </div>
  `;

  const detailsMarkup = `
    <div class="mission-card-panel mission-meta-grid">
      <article><span>Idade</span><strong>${escapeHtml(getMissionBirthLabel(snapshot))}</strong></article>
      <article><span>Origem</span><strong>${escapeHtml(snapshot.origin || "-")}</strong></article>
      <article><span>Altura</span><strong>${escapeHtml(snapshot.height || "-")}</strong></article>
      <article><span>Peso</span><strong>${escapeHtml(snapshot.weight || "-")}</strong></article>
      <article><span>Classe</span><strong>${escapeHtml(snapshot.class || "-")}</strong></article>
      <article><span>Trilha</span><strong>${escapeHtml(snapshot.trail || "-")}</strong></article>
      <article><span>NEX</span><strong>${escapeHtml(String(resources.nex ?? 0))}</strong></article>
      <article><span>Defesa</span><strong>${escapeHtml(String(resources.defense ?? 0))}</strong></article>
    </div>
  `;

  const attributesMarkup = `
    <div class="mission-card-panel mission-attributes-grid">
      ${attributes.map((attribute) => `
        <article class="mission-attribute-chip">
          <span>${escapeHtml(ATTRIBUTE_META[attribute.id]?.short || attribute.label)}</span>
          <strong>${escapeHtml(String(snapshot.attributes?.[attribute.id] ?? 1))}</strong>
        </article>
      `).join("")}
    </div>
  `;

  const skillsMarkup = `
    <div class="mission-card-panel mission-skills-grid">
      ${buildMissionSkillsMarkup(snapshot)}
    </div>
  `;

  const historyMarkup = `
    <div class="mission-card-panel mission-history-list">
      ${buildMissionRollHistoryMarkup(snapshot)}
    </div>
  `;

  const panelMarkup = {
    primary: primaryMarkup,
    details: detailsMarkup,
    attributes: attributesMarkup,
    skills: skillsMarkup,
    history: historyMarkup,
  }[activeTab] || primaryMarkup;

  return `
    <article class="mission-sheet-card" data-record-key="${escapeHtml(record.key)}" data-source="${escapeHtml(record.source)}">
      <div class="mission-sheet-card-head">
        <img class="mission-sheet-avatar" style="--image-fit:${escapeHtml(normalizeImageFit(snapshot.profileImageFit))}" src="${escapeHtml(snapshot.profileImage || defaultAvatar)}" alt="Avatar de ${escapeHtml(snapshot.name || "Personagem")}">
        <div class="mission-sheet-copy">
          <h4>${escapeHtml(snapshot.name || "Personagem")}</h4>
          <p>${escapeHtml(snapshot.class || "-")} • ${escapeHtml(snapshot.trail || "-")}</p>
        </div>
        <div class="mission-sheet-badges">
          <span class="mission-sheet-badge">${escapeHtml(liveLabel)}</span>
          ${record.participant?.isHost ? '<span class="mission-sheet-badge host">Mestre</span>' : ""}
        </div>
      </div>
      <div class="mission-sheet-tabs" role="tablist" aria-label="Abas da ficha compacta">
        <button type="button" class="${activeTab === "primary" ? "active" : ""}" data-mission-tab="primary" data-record-key="${escapeHtml(record.key)}">Principal</button>
        <button type="button" class="${activeTab === "details" ? "active" : ""}" data-mission-tab="details" data-record-key="${escapeHtml(record.key)}">Detalhes</button>
        <button type="button" class="${activeTab === "attributes" ? "active" : ""}" data-mission-tab="attributes" data-record-key="${escapeHtml(record.key)}">Dados</button>
        <button type="button" class="${activeTab === "skills" ? "active" : ""}" data-mission-tab="skills" data-record-key="${escapeHtml(record.key)}">Perícias</button>
        <button type="button" class="${activeTab === "history" ? "active" : ""}" data-mission-tab="history" data-record-key="${escapeHtml(record.key)}">Histórico</button>
      </div>
      ${panelMarkup}
    </article>
  `;
}

function buildMissionPlayerCurrentCharacterMarkup(character) {
  if (!character) {
    return '<div class="empty-state">Abra uma ficha salva para usar esta área da sessão.</div>';
  }

  const resources = character.resources || {};
  const pvTrack = deriveTrack(resources.pdMax, resources.pdLost);
  const sanTrack = deriveTrack(resources.sanMax, resources.sanLost);
  const peTrack = deriveTrack(resources.peMax, resources.peLost);

  const isConnected = Boolean(currentRoomId && character.id === onlineCharacterId);
  return `
    <article class="mission-player-character-card">
      <div class="mission-player-character-head">
        <div>
          <h4>${escapeHtml(character.name || "Registro sem nome")}</h4>
          <p>${escapeHtml(character.class || "-")} • ${escapeHtml(character.trail || "-")}</p>
        </div>
        <span class="mission-sheet-badge ${isConnected ? "host" : ""}">
          ${escapeHtml(isConnected ? "Conectada" : "Disponível")}
        </span>
      </div>
      <div class="mission-player-mini-tracks">
        ${buildMissionTrackMarkup("PV", pvTrack, "pv")}
        ${buildMissionTrackMarkup("SAN", sanTrack, "san")}
        ${buildMissionTrackMarkup("PE", peTrack, "pe")}
      </div>
    </article>
  `;
}

function buildMissionPlayerParticipantMarkup(participant) {
  const snapshot = participant?.snapshot || {};
  const resources = snapshot.resources || {};
  const pvTrack = deriveTrack(resources.pdMax, resources.pdLost);
  const sanTrack = deriveTrack(resources.sanMax, resources.sanLost);
  const peTrack = deriveTrack(resources.peMax, resources.peLost);

  return `
    <article class="mission-player-participant-card">
      <div class="mission-player-participant-head">
        <div>
          <h4>${escapeHtml(snapshot.name || participant?.name || "Participante")}</h4>
          <p>${escapeHtml(snapshot.class || "-")} • ${escapeHtml(snapshot.trail || "-")}</p>
        </div>
        <span class="mission-sheet-badge ${participant?.isHost ? "host" : ""}">
          ${escapeHtml(participant?.isHost ? "Host" : "Conectado")}
        </span>
      </div>
      <div class="mission-player-mini-tracks">
        ${buildMissionTrackMarkup("PV", pvTrack, "pv")}
        ${buildMissionTrackMarkup("SAN", sanTrack, "san")}
        ${buildMissionTrackMarkup("PE", peTrack, "pe")}
      </div>
    </article>
  `;
}

function renderRoomsView() {
  updateFirebaseStatusPill();

  const activeCharacter = ensureOnlineCharacterSelection();
  const assignedMission = getAssignedMissionForCharacter(activeCharacter);
  const selectedMission = getSelectedMissionRecord();
  const panelRecords = getMissionPanelCharacterRecords();
  const availableShareRecords = getMissionAvailableShareRecords();
  const missionCards = [...hostMissionRecords]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  const currentMission = currentRoomData || null;
  const activeParticipants = getActiveMissionParticipants(currentMission)
    .map(([, participant]) => participant)
    .sort((participantA, participantB) => {
      if (Boolean(participantA?.isHost) !== Boolean(participantB?.isHost)) {
        return participantA?.isHost ? -1 : 1;
      }
      return String(participantA?.name || "").localeCompare(String(participantB?.name || ""), "pt-BR");
    });

  if (elements.menuRoomsView) {
    elements.menuRoomsView.dataset.roomState = selectedMissionId || currentRoomId ? "connected" : "disconnected";
  }

  const roomsMasterMode = Boolean(masterUnlocked);
  [elements.roomLeave, elements.roomCopyCode, elements.roomSendCharacter, elements.roomsCurrentCharacter, elements.roomParticipants]
    .forEach((node) => node?.classList.toggle("hidden", !roomsMasterMode));

  if (elements.roomJoin) {
    elements.roomJoin.disabled = !firebaseReady || !activeCharacter || Boolean(currentRoomId);
    elements.roomJoin.textContent = assignedMission?.roomId && !currentRoomId
      ? "Entrar na sessão"
      : "Conectar ficha";
  }
  if (elements.roomLeave) {
    elements.roomLeave.disabled = !currentRoomId;
  }
  if (elements.roomCopyCode) {
    elements.roomCopyCode.disabled = !currentRoomId;
  }
  if (elements.roomSendCharacter) {
    elements.roomSendCharacter.disabled = !currentRoomId || !activeCharacter || activeCharacter.id !== onlineCharacterId;
  }
  if (elements.roomCode) {
    if (currentRoomId) {
      elements.roomCode.value = currentRoomId;
      lastSuggestedMissionCode = currentRoomId;
    } else {
      const suggestedMissionCode = assignedMission?.roomId || "";
      const currentValue = String(elements.roomCode.value || "").trim().toUpperCase();
      const shouldApplySuggestion = !currentValue || currentValue === lastSuggestedMissionCode;
      if (shouldApplySuggestion) {
        elements.roomCode.value = suggestedMissionCode;
        lastSuggestedMissionCode = suggestedMissionCode;
      }
    }
  }
  if (elements.roomsCurrentCharacter) {
    elements.roomsCurrentCharacter.innerHTML = roomsMasterMode
      ? buildMissionPlayerCurrentCharacterMarkup(activeCharacter)
      : "";
  }
  if (elements.roomCurrentTitle) {
    elements.roomCurrentTitle.textContent = currentMission?.missionTitle || currentMission?.name || "Nenhuma sessão conectada";
  }
  if (elements.roomCurrentMeta) {
    if (currentMission) {
      elements.roomCurrentMeta.textContent = roomsMasterMode
        ? (currentMission.missionIntro
            || currentMission.intro
            || "Sessão conectada. Tudo que você salvar nesta ficha sincroniza automaticamente para o mestre.")
        : "Sessão conectada.";
    } else if (assignedMission?.roomId) {
      elements.roomCurrentMeta.textContent = `Sessão designada: ${assignedMission.title || assignedMission.roomId}. Clique em conectar e entre sem digitar código.`;
    } else {
      elements.roomCurrentMeta.textContent = roomsMasterMode
        ? "Abra uma ficha salva, informe o código e conecte o registro para sincronizar automaticamente."
        : "Digite o código da sessão e conecte a ficha.";
    }
  }
  if (elements.roomLobbyStatus) {
    if (currentMission) {
      const connectedLabel = activeCharacter && activeCharacter.id === onlineCharacterId
        ? "Sua ficha conectada está sincronizando em tempo real."
        : "Abra a ficha conectada para editar e salvar normalmente.";
      elements.roomLobbyStatus.textContent = `Código ${currentRoomId || "-"} • ${getMissionStatusLabel(currentMission.status || "lobby")} • ${activeParticipants.length} ficha(s) conectada(s) • ${connectedLabel}`;
    } else {
      elements.roomLobbyStatus.textContent = firebaseReady
        ? assignedMission?.roomId
          ? `Sessão designada ${assignedMission.roomId} pronta para conexão.`
          : "Pronto para entrar em uma sessão."
        : firebaseUnavailableReason;
    }
  }
  if (elements.roomParticipants) {
    elements.roomParticipants.innerHTML = roomsMasterMode
      ? (activeParticipants.length
          ? activeParticipants.map((participant) => buildMissionPlayerParticipantMarkup(participant)).join("")
          : '<div class="empty-state">Nenhuma ficha conectada nesta sessão agora.</div>')
      : "";
  }

  if (elements.missionsMasterGate) {
    elements.missionsMasterGate.classList.add("hidden");
  }

  if (elements.missionsShell) {
    elements.missionsShell.classList.toggle("hidden", !roomsMasterMode);
  }

  if (elements.missionCreateForm) {
    elements.missionCreateForm.classList.toggle("hidden", !missionCreatorExpanded);
  }
  if (elements.missionCreateStart) {
    elements.missionCreateStart.disabled = !firebaseReady || !masterUnlocked;
  }
  if (elements.missionCreateConfirm) {
    const missionCode = normalizeSessionCode(elements.missionCode?.value || "");
    const hasTitle = Boolean(elements.missionTitle?.value.trim());
    const hasIntro = Boolean(elements.missionIntro?.value.trim());
    const hasValidCode = isValidSessionCode(missionCode);
    elements.missionCreateConfirm.disabled = !firebaseReady || !roomsMasterMode || !hasValidCode || !hasTitle || !hasIntro;
  }

  if (elements.missionsList) {
    if (!firebaseReady) {
      elements.missionsList.innerHTML = '<div class="empty-state">Assim que o Firebase estiver pronto, as sessões criadas pelo mestre vão aparecer aqui.</div>';
    } else if (!missionCards.length) {
      elements.missionsList.innerHTML = '<div class="empty-state">Nenhuma sessão criada ainda. Use o bloco acima para abrir a primeira agora.</div>';
    } else {
      elements.missionsList.innerHTML = missionCards
        .map((mission) => {
          const participants = getActiveMissionParticipants(mission).map(([, participant]) => participant);
          const intro = mission.missionIntro || mission.intro || "Sem introdução registrada.";
          const updatedAt = formatDateTime(mission.updatedAt || mission.createdAt || "");
          return `
            <article class="mission-list-card ${mission.id === selectedMissionId ? "active" : ""}" data-mission-id="${escapeHtml(mission.id || "")}">
              <div class="mission-list-card-copy">
                <div class="mission-list-card-top">
                  <div>
                    <h3>${escapeHtml(mission.missionTitle || mission.name || "Sessão sem título")}</h3>
                    <p class="mission-list-card-meta">Código ${escapeHtml(mission.id || "-")} • ${escapeHtml(getMissionStatusLabel(mission.status || "lobby"))} • ${participants.length} ficha(s) conectada(s)</p>
                  </div>
                </div>
                <p class="mission-list-card-intro">${escapeHtml(intro)}</p>
                <p class="mission-list-card-updated">Atualizado ${escapeHtml(updatedAt)}</p>
              </div>
              <button type="button" class="primary" data-mission-action="open" data-mission-id="${escapeHtml(mission.id || "")}">Acessar Painel</button>
            </article>
          `;
        })
        .join("");
    }
  }

  if (elements.missionPanel) {
    elements.missionPanel.classList.toggle("hidden", !selectedMission);
  }

  if (elements.missionCopyCode) {
    elements.missionCopyCode.disabled = !selectedMissionId;
  }

  if (!selectedMission) {
    if (elements.missionPanelTitle) {
      elements.missionPanelTitle.textContent = "Nenhuma sessão selecionada";
    }
    if (elements.missionPanelIntro) {
      elements.missionPanelIntro.textContent = "Escolha uma sessão criada para ver todas as fichas conectadas.";
    }
    if (elements.missionPanelMeta) {
      elements.missionPanelMeta.textContent = "As fichas dos jogadores conectados aparecem aqui em tempo real.";
    }
    if (elements.missionPanelSource) {
      elements.missionPanelSource.textContent = "";
    }
    if (elements.missionRollFeed) {
      elements.missionRollFeed.innerHTML = "";
    }
    if (elements.missionAssignmentMeta) {
      elements.missionAssignmentMeta.textContent = "";
    }
    if (elements.missionAvailableShares) {
      elements.missionAvailableShares.innerHTML = "";
    }
    if (elements.missionSheetGrid) {
      elements.missionSheetGrid.innerHTML = "";
    }
    return;
  }

  const missionParticipants = getActiveMissionParticipants(selectedMission).map(([, participant]) => participant);

  if (elements.missionPanelTitle) {
    elements.missionPanelTitle.textContent = selectedMission.missionTitle || selectedMission.name || "Sessão sem título";
  }
  if (elements.missionPanelIntro) {
    elements.missionPanelIntro.textContent = selectedMission.missionIntro || selectedMission.intro || "Sem introdução registrada.";
  }
  if (elements.missionPanelMeta) {
    elements.missionPanelMeta.textContent = `Código ${selectedMission.id || "-"} • ${getMissionStatusLabel(selectedMission.status || "lobby")} • ${missionParticipants.length} ficha(s) conectada(s)`;
  }
  if (elements.missionPanelSource) {
    elements.missionPanelSource.textContent = panelRecords.sourceLabel;
  }
  if (elements.missionAssignmentMeta) {
    elements.missionAssignmentMeta.textContent = availableShareRecords.length
      ? `${availableShareRecords.length} ficha(s) compartilhada(s) disponíveis para entrar nesta sessão sem o jogador digitar código.`
      : "Nenhuma ficha extra disponível agora. Assim que um jogador salvar a ficha, ela pode ser puxada daqui.";
  }
  if (elements.missionAvailableShares) {
    elements.missionAvailableShares.innerHTML = buildMissionAvailableShareCards(availableShareRecords);
  }
  if (elements.missionRollFeed) {
    elements.missionRollFeed.innerHTML = buildMissionRollFeedMarkup(panelRecords.records);
  }
  if (elements.missionSheetGrid) {
    elements.missionSheetGrid.innerHTML = panelRecords.records.length
      ? panelRecords.records.map((record) => buildMissionSheetCardMarkup(record)).join("")
      : '<div class="empty-state">Ainda não há fichas para exibir nesta sessão.</div>';
  }
}

async function initFirebasePresence() {
  const config = getFirebaseConfig();
  if (!config || typeof window.firebase !== "object" || typeof firebase.initializeApp !== "function") {
    firebaseReady = false;
    firebaseUnavailableReason = "Firebase não configurado";
    refreshMenuEventSettingsSubscription();
    renderRoomsView();
    return;
  }

  try {
    const app = firebase.apps && firebase.apps.length > 0
      ? firebase.app()
      : firebase.initializeApp(config);
    firebaseDatabaseRef = app.database();
    firebaseAuthRef = app.auth();
    firebaseReady = true;
    firebaseUnavailableReason = "Firebase pronto";
    firebaseAuthRef.onAuthStateChanged((user) => {
      firebaseUser = user || null;
      refreshMissionSubscriptions();
      refreshRemoteMasterSharesSubscription();
      refreshMenuEventSettingsSubscription();
      if (!firebaseUser?.uid) {
        autoMasterShareBootstrapUid = "";
      }
      renderRoomsView();
    });
    await ensureFirebaseAuth();
    refreshMissionSubscriptions();
    refreshRemoteMasterSharesSubscription();
    refreshMenuEventSettingsSubscription();
    bootstrapAutomaticMasterShares();
  } catch (error) {
    firebaseReady = false;
    firebaseUnavailableReason = error instanceof Error ? error.message : "Falha no Firebase";
    refreshMissionSubscriptions();
    refreshRemoteMasterSharesSubscription();
    refreshMenuEventSettingsSubscription();
  }

  renderRoomsView();
}

async function ensureFirebaseAuth() {
  if (!firebaseReady || !firebaseAuthRef) {
    throw new Error("Firebase indisponível.");
  }

  if (firebaseAuthRef.currentUser) {
    firebaseUser = firebaseAuthRef.currentUser;
    return firebaseUser;
  }

  await firebaseAuthRef.signInAnonymously();
  firebaseUser = firebaseAuthRef.currentUser;
  if (firebaseUser) {
    return firebaseUser;
  }

  return new Promise((resolve) => {
    const unsubscribe = firebaseAuthRef.onAuthStateChanged((user) => {
      if (user) {
        firebaseUser = user;
        unsubscribe();
        resolve(user);
      }
    });
  });
}

function detachRoomListener() {
  if (roomValueListenerRef) {
    roomValueListenerRef.off();
    roomValueListenerRef = null;
  }
}

function detachRemoteMasterShareListener() {
  if (masterShareListenerRef) {
    masterShareListenerRef.off();
    masterShareListenerRef = null;
  }
  remoteMasterShareIds = new Set();
}

function applyRemoteMasterShares(remoteRecords) {
  const normalizedRecords = remoteRecords
    .map((record) => migrateMasterShareRecord(record))
    .filter((record) => record !== null);
  const nextRemoteIds = new Set(normalizedRecords.map((record) => record.shareId));
  const preservedLocal = masterShares.filter((record) => (
    !remoteMasterShareIds.has(record.shareId)
    && !nextRemoteIds.has(record.shareId)
  ));
  const merged = [...preservedLocal];

  normalizedRecords.forEach((record) => {
    const existingIndex = merged.findIndex((item) => item.shareId === record.shareId);
    if (existingIndex === -1) {
      merged.push(record);
    } else {
      merged[existingIndex] = mergeMasterShareRecords(merged[existingIndex], record);
    }
  });

  remoteMasterShareIds = nextRemoteIds;
  masterShares = merged.sort((recordA, recordB) => (recordA.updatedAt < recordB.updatedAt ? 1 : -1));
  saveMasterShares(masterShares);
  normalizedRecords.forEach((record) => {
    syncLocalCharacterFromMasterRecord(record);
  });
  bootstrapAutomaticMasterShares();
  refreshMasterViews();
  renderRoomsView();
}

function subscribeToRemoteMasterShares() {
  if (!firebaseReady || !firebaseDatabaseRef || !firebaseUser) {
    detachRemoteMasterShareListener();
    return;
  }

  if (masterShareListenerRef) {
    return;
  }

  masterShareListenerRef = firebaseDatabaseRef.ref("masterShares");
  masterShareListenerRef.on("value", (snapshot) => {
    const rawRecords = snapshot.val() || {};
    applyRemoteMasterShares(Object.values(rawRecords));
  });
}

function refreshRemoteMasterSharesSubscription() {
  if (!firebaseReady || !firebaseDatabaseRef || !firebaseUser) {
    detachRemoteMasterShareListener();
    return;
  }

  subscribeToRemoteMasterShares();
}

async function syncMasterShareRecordToFirebase(record) {
  if (!record?.shareId || !firebaseReady || !firebaseDatabaseRef) {
    return;
  }

  try {
    await ensureFirebaseAuth();
    await firebaseDatabaseRef.ref(`masterShares/${record.shareId}`).set(record);
  } catch {
    // Keep local master share data even if remote sync fails.
  }
}

async function removeMasterShareFromFirebase(shareId) {
  if (!shareId || !firebaseReady || !firebaseDatabaseRef) {
    return;
  }

  try {
    await ensureFirebaseAuth();
    await firebaseDatabaseRef.ref(`masterShares/${shareId}`).remove();
  } catch {
    // Ignore remote delete failures and keep local cleanup.
  }
}

function detachMissionListListener() {
  if (missionListListenerRef) {
    missionListListenerRef.off();
    missionListListenerRef = null;
  }
  missionListOwnerUid = "";
  hostMissionRecords = [];
}

function detachMissionPanelListener() {
  if (missionValueListenerRef) {
    missionValueListenerRef.off();
    missionValueListenerRef = null;
  }
}

function closeSelectedMissionPanel(shouldRender = false) {
  selectedMissionId = "";
  selectedMissionData = null;
  detachMissionPanelListener();
  window.refreshTabletopRemoteState?.();
  if (shouldRender) {
    renderRoomsView();
  }
}

function subscribeToHostMissions() {
  if (!firebaseDatabaseRef || !firebaseUser) {
    detachMissionListListener();
    renderRoomsView();
    return;
  }

  if (missionListListenerRef && missionListOwnerUid === firebaseUser.uid) {
    return;
  }

  const nextRef = firebaseDatabaseRef.ref("rooms").orderByChild("hostUid").equalTo(firebaseUser.uid);
  detachMissionListListener();
  missionListListenerRef = nextRef;
  missionListOwnerUid = firebaseUser.uid;
  missionListListenerRef.on("value", (snapshot) => {
    const rooms = snapshot.val() || {};
    hostMissionRecords = Object.entries(rooms)
      .filter(([, room]) => room && typeof room === "object")
      .map(([roomId, room]) => ({
        ...room,
        id: room.id || roomId,
      }))
      .sort((roomA, roomB) => {
        const timeA = new Date(roomA.updatedAt || roomA.createdAt || 0).getTime();
        const timeB = new Date(roomB.updatedAt || roomB.createdAt || 0).getTime();
        return timeA < timeB ? 1 : -1;
      });

    if (selectedMissionId && !hostMissionRecords.some((mission) => mission.id === selectedMissionId)) {
      closeSelectedMissionPanel(false);
    }

    renderRoomsView();
  });
}

function subscribeToMissionPanel(missionId) {
  if (!firebaseDatabaseRef || !missionId) {
    closeSelectedMissionPanel(true);
    return;
  }

  selectedMissionId = missionId;
  selectedMissionData = hostMissionRecords.find((mission) => mission.id === missionId) || null;
  detachMissionPanelListener();
  missionValueListenerRef = firebaseDatabaseRef.ref(`rooms/${missionId}`);
  missionValueListenerRef.on("value", (snapshot) => {
    selectedMissionData = snapshot.val() || null;
    if (!selectedMissionData) {
      closeSelectedMissionPanel(false);
    }
    window.handleSharedMasterPhoneState?.(selectedMissionData);
    window.refreshTabletopRemoteState?.();
    window.refreshLinkedTabletopTokens?.();
    renderRoomsView();
  });
  window.handleSharedMasterPhoneState?.(selectedMissionData);
  window.refreshTabletopRemoteState?.();
  window.refreshLinkedTabletopTokens?.();
  renderRoomsView();
}

function refreshMissionSubscriptions() {
  if (!masterUnlocked || !firebaseReady || !firebaseDatabaseRef || !firebaseUser) {
    detachMissionListListener();
    if (!masterUnlocked) {
      closeSelectedMissionPanel(false);
    }
    renderRoomsView();
    return;
  }

  subscribeToHostMissions();
}

function subscribeToRoom(roomId) {
  if (!firebaseDatabaseRef || !roomId) {
    return;
  }

  detachRoomListener();
  roomValueListenerRef = firebaseDatabaseRef.ref(`rooms/${roomId}`);
  roomValueListenerRef.on("value", (snapshot) => {
    currentRoomData = snapshot.val() || null;
    if (!currentRoomData) {
      currentRoomId = "";
      currentRoomMode = "";
      detachRoomListener();
    }
    window.handleSharedMasterPhoneState?.(currentRoomData);
    window.refreshTabletopRemoteState?.();
    window.refreshLinkedTabletopTokens?.();
    renderRoomsView();
    renderEncounterPanel();
  });
}

function buildRoomParticipantPayload(character, overrides = {}) {
  const connectedCharacter = withMissionConnectionState(character, true);
  const snapshot = connectedCharacter
    ? buildSharedCharacterSnapshot(connectedCharacter, {
      includeProfileImage: false,
      includeInventoryImages: false,
      compactShare: true,
    })
    : null;
  return {
    uid: overrides.uid || firebaseUser?.uid || "",
    name: snapshot?.name || overrides.name || "Participante",
    role: snapshot ? `${snapshot.class || "-"} • ${snapshot.trail || "-"}` : (overrides.role || "Sem ficha"),
    team: overrides.team || "Neutro",
    ready: overrides.ready ?? true,
    isHost: Boolean(overrides.isHost),
    updatedAt: new Date().toISOString(),
    snapshot,
  };
}

async function syncCurrentRoomParticipant(character = null) {
  if (!currentRoomId || !firebaseReady || !firebaseDatabaseRef) {
    renderRoomsView();
    return;
  }

  const resolvedCharacter = character
    || getActiveCharacterForOnline()
    || readFormData({ validateRequired: false })
    || characters.find((item) => item.id === editingId)
    || null;

  try {
    const user = await ensureFirebaseAuth();
    const participantRef = firebaseDatabaseRef.ref(`rooms/${currentRoomId}/participants/${user.uid}`);
    if (!resolvedCharacter || !onlineCharacterId) {
      await participantRef.remove();
      renderRoomsView();
      return;
    }
    if (resolvedCharacter.id !== onlineCharacterId) {
      renderRoomsView();
      return;
    }

    await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/participants/${user.uid}`).update(
      buildRoomParticipantPayload(resolvedCharacter, {
        ready: currentRoomData?.participants?.[user.uid]?.ready ?? true,
        team: currentRoomData?.participants?.[user.uid]?.team || "Jogador",
        isHost: currentRoomData?.hostUid === user.uid,
      })
    );
  } catch {
    // Keep local room state even if remote sync fails for the moment.
  }

  renderRoomsView();
}

function handleMissionListClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-mission-action]") : null;
  if (!trigger) {
    return;
  }

  const missionId = trigger.getAttribute("data-mission-id") || "";
  if (!missionId) {
    return;
  }

  triggerMenuButtonAnimation(trigger);
  subscribeToMissionPanel(missionId);
  window.setTimeout(() => {
    elements.missionPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

function handleMissionSheetGridClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-mission-tab]") : null;
  if (!trigger) {
    return;
  }

  const recordKey = trigger.getAttribute("data-record-key") || "";
  const tab = trigger.getAttribute("data-mission-tab") || "primary";
  if (!recordKey) {
    return;
  }

  missionCardTabState[recordKey] = tab;
  triggerMenuButtonAnimation(trigger);
  renderRoomsView();
}

async function handleMissionAvailableSharesClick(event) {
  const trigger = event.target instanceof Element ? event.target.closest("[data-mission-assign-share]") : null;
  if (!trigger) {
    return;
  }

  const shareId = trigger.getAttribute("data-mission-assign-share") || "";
  if (!shareId) {
    return;
  }

  triggerMenuButtonAnimation(trigger);
  await assignMasterShareToMission(shareId);
}

async function assignMasterShareToMission(shareId) {
  if (!masterUnlocked) {
    alert("Somente o mestre pode adicionar fichas à sessão.");
    return;
  }
  if (!selectedMissionId || !selectedMissionData) {
    alert("Escolha uma sessão antes de adicionar a ficha.");
    return;
  }
  if (!firebaseReady || !firebaseDatabaseRef) {
    alert("Firebase indisponível no momento.");
    return;
  }

  const record = masterShares.find((item) => item.shareId === shareId) || null;
  if (!record?.snapshot) {
    alert("Ficha compartilhada não encontrada.");
    return;
  }

  const ownerUid = String(record.ownerUid || "").trim();
  if (!ownerUid) {
    alert("Essa ficha ainda não tem um vínculo online. Peça ao jogador para abrir e salvar a ficha uma vez.");
    return;
  }

  const user = await ensureFirebaseAuth();
  if (selectedMissionData.hostUid && selectedMissionData.hostUid !== user.uid) {
    alert("Somente o host desta sessão pode adicionar fichas.");
    return;
  }

  const connectedCharacter = withMissionConnectionState(record.snapshot, true) || record.snapshot;
  const participantRef = firebaseDatabaseRef.ref(`rooms/${selectedMissionId}/participants/${ownerUid}`);
  const previousAssignedRoomId = String(record.assignedRoomId || "").trim();

  if (previousAssignedRoomId && previousAssignedRoomId !== selectedMissionId) {
    try {
      await firebaseDatabaseRef.ref(`rooms/${previousAssignedRoomId}/participants/${ownerUid}`).remove();
    } catch {
      // Keep the reassignment flowing even if the old room is already unavailable.
    }
  }

  await participantRef.set(
    buildRoomParticipantPayload(connectedCharacter, {
      uid: ownerUid,
      ready: true,
      team: "Jogador",
      name: connectedCharacter.name || "Participante",
      role: `${connectedCharacter.class || "-"} • ${connectedCharacter.trail || "-"}`,
    })
  );

  updateMasterShareAssignment(shareId, {
    ownerUid,
    assignedRoomId: selectedMissionId,
    assignedRoomTitle: selectedMissionData.missionTitle || selectedMissionData.name || "",
    assignedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await pushRoomLog("Sessão", `${connectedCharacter.name || "Participante"} foi adicionado pelo mestre.`);
  pushUiToast(`${connectedCharacter.name || "Ficha"} adicionada à sessão.`, "info", 2400);
  renderRoomsView();
}

async function copySelectedMissionCode() {
  if (!selectedMissionId) {
    return;
  }

  const copied = await copyToClipboard(selectedMissionId);
  if (!copied) {
    window.prompt("Copie o código da sessão:", selectedMissionId);
  }
}

async function handleCreateMission() {
  if (!masterUnlocked) {
    alert("Somente o mestre pode criar missões.");
    return;
  }
  if (!firebaseReady || !firebaseDatabaseRef) {
    alert("Firebase indisponível. Verifique a conexão antes de criar a sessão.");
    return;
  }

  const missionCode = normalizeSessionCode(elements.missionCode?.value || "");
  const missionTitle = elements.missionTitle?.value.trim() || "";
  const missionIntro = elements.missionIntro?.value.trim() || "";
  if (!isValidSessionCode(missionCode)) {
    alert("Informe um código válido (4 a 12 letras ou números).");
    return;
  }
  if (!missionTitle || !missionIntro) {
    alert("Preencha o código, o título e a introdução da sessão.");
    return;
  }

  const user = await ensureFirebaseAuth();
  const missionId = missionCode;
  const missionExists = await firebaseDatabaseRef.ref(`rooms/${missionId}`).once("value");
  if (missionExists.exists()) {
    alert("Esse código já está em uso. Escolha outro.");
    return;
  }
  const missionRef = firebaseDatabaseRef.ref(`rooms/${missionId}`);
  await missionRef.set({
    id: missionId,
    kind: "mission",
    hostUid: user.uid,
    name: missionTitle,
    missionTitle,
    missionIntro,
    intro: missionIntro,
    mode: "missao",
    status: "lobby",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  missionCreatorExpanded = false;
  missionCardTabState = {};
  if (elements.missionCode) {
    elements.missionCode.value = "";
  }
  if (elements.missionTitle) {
    elements.missionTitle.value = "";
  }
  if (elements.missionIntro) {
    elements.missionIntro.value = "";
  }

  subscribeToMissionPanel(missionId);
  renderRoomsView();
}

async function handleCreateRoom() {
  if (!firebaseReady || !firebaseDatabaseRef) {
    alert("Configure o Firebase para usar salas online.");
    return;
  }
  if (currentRoomId) {
    alert("Você já está em uma sala. Saia da sala atual antes de criar outra.");
    return;
  }

  const character = getActiveCharacterForOnline();
  if (!character) {
    alert("Escolha uma ficha salva para usar no online antes de criar a sala.");
    return;
  }
  onlineCharacterId = character.id;

  const roomName = elements.roomName?.value.trim() || `Sala ${character.name}`;
  const roomMode = elements.roomMode?.value || "confronto";
  const roomId = generateRoomCode();
  const user = await ensureFirebaseAuth();
  const roomRef = firebaseDatabaseRef.ref(`rooms/${roomId}`);
  await roomRef.set({
    id: roomId,
    name: roomName,
    mode: roomMode,
    hostUid: user.uid,
    status: "lobby",
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: new Date().toISOString(),
  });
  await roomRef.child(`participants/${user.uid}`).set(
    buildRoomParticipantPayload(character, { ready: true, isHost: true, team: "Host" })
  );
  currentRoomId = roomId;
  currentRoomMode = roomMode;
  if (elements.roomCode) {
    elements.roomCode.value = roomId;
  }
  subscribeToRoom(roomId);
  await syncRoomEncounterState();
  await pushRoomLog("Sala", `${character.name || "Host"} criou a sala ${roomId}.`);
  renderRoomsView();
}

async function handleJoinRoom() {
  const assignedMission = getAssignedMissionForCharacter(getActiveCharacterForOnline());
  const roomId = normalizeSessionCode((elements.roomCode?.value || "").trim() || assignedMission?.roomId || "");
  if (!roomId) {
    alert("Informe o código da sessão.");
    return;
  }
  if (!isValidSessionCode(roomId)) {
    alert("Código inválido. Use 4 a 12 letras ou números.");
    return;
  }
  if (!firebaseReady || !firebaseDatabaseRef) {
    alert("Configure o Firebase para usar salas online.");
    return;
  }
  if (currentRoomId) {
    alert("Você já está em uma sessão. Saia dela antes de entrar em outra.");
    return;
  }

  await ensureFirebaseAuth();
  const snapshot = await firebaseDatabaseRef.ref(`rooms/${roomId}`).once("value");
  if (!snapshot.exists()) {
    alert("Sessão não encontrada.");
    return;
  }

  const character = getActiveCharacterForOnline();
  if (!character) {
    alert("Escolha uma ficha salva para usar no online antes de entrar na sala.");
    return;
  }
  onlineCharacterId = character.id;
  currentRoomId = roomId;
  currentRoomMode = snapshot.val()?.mode || "";
  currentRoomData = snapshot.val() || null;
  subscribeToRoom(roomId);
  const user = await ensureFirebaseAuth();
  const connectedCharacter = persistLocalMissionConnectionState(character.id, true)
    || withMissionConnectionState(character, true)
    || character;
  await firebaseDatabaseRef.ref(`rooms/${roomId}/participants/${user.uid}`).set(
    buildRoomParticipantPayload(connectedCharacter, {
      ready: true,
      team: "Jogador",
      name: connectedCharacter.name || `Jogador ${user.uid.slice(0, 4)}`,
      role: `${connectedCharacter.class || "-"} • ${connectedCharacter.trail || "-"}`,
    })
  );
  await pushRoomLog("Entrada", `${connectedCharacter?.name || `Jogador ${user.uid.slice(0, 4)}`} conectou a ficha na sessão.`);
  renderRoomsView();
}

async function leaveCurrentRoom() {
  const linkedCharacterId = onlineCharacterId;
  if (!currentRoomId || !firebaseReady || !firebaseDatabaseRef || !firebaseUser) {
    currentRoomId = "";
    currentRoomData = null;
    currentRoomMode = "";
    detachRoomListener();
    window.refreshTabletopRemoteState?.();
    if (linkedCharacterId) {
      persistLocalMissionConnectionState(linkedCharacterId, false);
    }
    renderRoomsView();
    return;
  }

  const leavingName = currentRoomData?.participants?.[firebaseUser.uid]?.name || "Participante";
  await pushRoomLog("Saída", `${leavingName} saiu da sala.`);
  await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/participants/${firebaseUser.uid}`).remove();
  currentRoomId = "";
  currentRoomData = null;
  currentRoomMode = "";
  detachRoomListener();
  window.refreshTabletopRemoteState?.();
  if (linkedCharacterId) {
    persistLocalMissionConnectionState(linkedCharacterId, false);
  }
  renderRoomsView();
  renderEncounterPanel();
}

async function pushCurrentCharacterToRoom() {
  if (!currentRoomId) {
    alert("Entre em uma sessão antes de atualizar a ficha conectada.");
    return;
  }
  if (!firebaseReady || !firebaseDatabaseRef) {
    alert("Firebase indisponível.");
    return;
  }

  const character = getActiveCharacterForOnline()
    || readFormData({ validateRequired: false })
    || null;
  if (!character) {
    alert("Escolha uma ficha salva antes de sincronizar com a sala.");
    return;
  }
  setPreferredOnlineCharacterId(character.id, { force: true });

  const user = await ensureFirebaseAuth();
  const existingParticipant = currentRoomData?.participants?.[user.uid] || {};
  const connectedCharacter = persistLocalMissionConnectionState(character.id, true)
    || withMissionConnectionState(character, true)
    || character;
  await firebaseDatabaseRef.ref(`rooms/${currentRoomId}/participants/${user.uid}`).update(
    buildRoomParticipantPayload(connectedCharacter, {
      ready: existingParticipant.ready ?? true,
      team: existingParticipant.team || (currentRoomData?.hostUid === user.uid ? "Host" : "Jogador"),
      isHost: currentRoomData?.hostUid === user.uid,
    })
  );
  await pushRoomLog("Registro", `${connectedCharacter.name || "Participante"} atualizou a ficha conectada.`);
  renderRoomsView();
}

async function copyCurrentRoomCode() {
  if (!currentRoomId) {
    return;
  }

  const copied = await copyToClipboard(currentRoomId);
  if (!copied) {
    window.prompt("Copie o código da sessão:", currentRoomId);
    return;
  }
}

function createEmptyMasterNpcAttributes() {
  const values = {};
  attributes.forEach((attribute) => {
    values[attribute.id] = 1;
  });
  return values;
}

function normalizeMasterNpcAttributes(rawAttributes) {
  const values = {};
  attributes.forEach((attribute) => {
    const parsed = Number.parseInt(String(rawAttributes?.[attribute.id] ?? "1"), 10);
    values[attribute.id] = Number.isNaN(parsed) ? 1 : clamp(parsed, 0, 8);
  });
  return values;
}

function normalizeMasterNpcSkillRanks(rawSkillRanks) {
  const normalizedRanks = {};
  if (!rawSkillRanks || typeof rawSkillRanks !== "object") {
    return normalizedRanks;
  }

  Object.entries(rawSkillRanks).forEach(([skillName, rank]) => {
    if (SKILL_NAME_SET.has(skillName) && SKILL_RANKS.includes(rank) && rank !== "Destreinado") {
      normalizedRanks[skillName] = rank;
    }
  });

  return normalizedRanks;
}

function deriveMasterNpcInventoryItems(npc) {
  const items = Array.isArray(npc?.inventory)
    ? npc.inventory.slice(0, MASTER_NPC_INVENTORY_SLOTS).map((item) => normalizeInventoryItem(item))
    : [];

  while (items.length < MASTER_NPC_INVENTORY_SLOTS) {
    items.push(createEmptyInventoryItem());
  }

  return items;
}

function getMasterNpcSkillRank(npc, skillName) {
  return npc?.skillRanks?.[skillName] || "Destreinado";
}

function getMasterNpcAttributeValue(npc, attributeId) {
  return clamp(Number.parseInt(String(npc?.attributes?.[attributeId] ?? 1), 10) || 0, 0, 8);
}

function normalizeMasterNpcResourceValue(value, fallback = 0) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  return Number.isNaN(parsed) ? Math.max(0, fallback) : Math.max(0, parsed);
}

function cloneMasterNpc(npc) {
  const snapshot = normalizeMasterNpc(npc);
  return {
    ...snapshot,
    id: generateId(),
    name: snapshot.name ? `${snapshot.name} (Cópia)` : "NPC sem nome (Cópia)",
    updatedAt: new Date().toISOString(),
  };
}

function createEmptyMasterNpc() {
  return {
    id: generateId(),
    name: "",
    birthdate: "",
    origin: "",
    className: "",
    trail: "",
    role: "",
    profileImage: "",
    profileImageFit: "cover",
    race: "humano",
    threatType: "",
    riskLevel: "moderado",
    importance: "media",
    nex: 5,
    pv: 0,
    pvMax: 0,
    pe: 0,
    peMax: 0,
    san: 0,
    sanMax: 0,
    defense: 10,
    movement: "9m",
    wounds: "",
    attacks: "",
    specials: "",
    attributes: createEmptyMasterNpcAttributes(),
    skillRanks: {},
    inventory: deriveMasterNpcInventoryItems(null),
    appearance: "",
    personality: "",
    history: "",
    objective: "",
    informations: "",
    notes: "",
    updatedAt: new Date().toISOString(),
  };
}

function normalizeMasterNpc(npc) {
  const allowedRaces = new Set(["humano", "criatura", "animal"]);
  const allowedImportance = new Set(["baixa", "media", "alta", "critica"]);
  const allowedRiskLevels = new Set(["minimo", "baixo", "moderado", "alto", "extremo"]);
  return {
    id: typeof npc?.id === "string" && npc.id ? npc.id : generateId(),
    name: typeof npc?.name === "string" ? npc.name : "",
    birthdate: typeof npc?.birthdate === "string" ? npc.birthdate : "",
    origin: typeof npc?.origin === "string" ? npc.origin : "",
    className: typeof npc?.className === "string" ? npc.className : "",
    trail: typeof npc?.trail === "string" ? npc.trail : "",
    role: typeof npc?.role === "string" ? npc.role : "",
    profileImage: typeof npc?.profileImage === "string" ? npc.profileImage : "",
    profileImageFit: normalizeImageFit(npc?.profileImageFit),
    race: allowedRaces.has(String(npc?.race || "").toLowerCase()) ? String(npc.race).toLowerCase() : "humano",
    threatType: typeof npc?.threatType === "string" ? npc.threatType : "",
    riskLevel: allowedRiskLevels.has(String(npc?.riskLevel || "").toLowerCase())
      ? String(npc.riskLevel).toLowerCase()
      : "moderado",
    importance: allowedImportance.has(String(npc?.importance || "").toLowerCase())
      ? String(npc.importance).toLowerCase()
      : "media",
    nex: clamp(Number.parseInt(String(npc?.nex ?? "5"), 10) || 5, 0, 100),
    pv: normalizeMasterNpcResourceValue(npc?.pv, 0),
    pvMax: normalizeMasterNpcResourceValue(npc?.pvMax, normalizeMasterNpcResourceValue(npc?.pv, 0)),
    pe: normalizeMasterNpcResourceValue(npc?.pe, 0),
    peMax: normalizeMasterNpcResourceValue(npc?.peMax, normalizeMasterNpcResourceValue(npc?.pe, 0)),
    san: normalizeMasterNpcResourceValue(npc?.san, 0),
    sanMax: normalizeMasterNpcResourceValue(npc?.sanMax, normalizeMasterNpcResourceValue(npc?.san, 0)),
    defense: Number.parseInt(String(npc?.defense ?? "10"), 10) || 10,
    movement: typeof npc?.movement === "string" ? npc.movement : "9m",
    wounds: typeof npc?.wounds === "string" ? npc.wounds : "",
    attacks: typeof npc?.attacks === "string" ? npc.attacks : "",
    specials: typeof npc?.specials === "string" ? npc.specials : "",
    attributes: normalizeMasterNpcAttributes(npc?.attributes),
    skillRanks: normalizeMasterNpcSkillRanks(npc?.skillRanks),
    inventory: deriveMasterNpcInventoryItems(npc),
    appearance: typeof npc?.appearance === "string" ? npc.appearance : "",
    personality: typeof npc?.personality === "string" ? npc.personality : "",
    history: typeof npc?.history === "string" ? npc.history : "",
    objective: typeof npc?.objective === "string" ? npc.objective : "",
    informations: typeof npc?.informations === "string" ? npc.informations : "",
    notes: typeof npc?.notes === "string" ? npc.notes : "",
    updatedAt: typeof npc?.updatedAt === "string" ? npc.updatedAt : new Date().toISOString(),
  };
}

function touchMasterNpc(npc) {
  if (!npc) {
    return;
  }
  npc.updatedAt = new Date().toISOString();
}

function getMasterNpcArchiveStatus(npc) {
  if (String(npc?.wounds || "").trim() === "Morto") {
    return {
      label: "Morto",
      className: "dead",
    };
  }

  return {
    label: "Ativo",
    className: "alive",
  };
}

function renderMasterNpcSkillsMarkup(npc) {
  return skillsCatalog
    .map((skill) => {
      const rank = getMasterNpcSkillRank(npc, skill.name);
      const shortLabel = SKILL_RANK_SHORT_LABELS[rank] || rank;
      const bonus = SKILL_RANK_BONUS[rank] ?? 0;
      return `
        <article class="master-npc-skill-card rank-${normalize(rank)}">
          <button type="button" class="master-npc-skill-roll" data-npc-roll-skill="${escapeHtml(skill.name)}" title="Rolar ${escapeHtml(skill.name)}">
            <strong>${escapeHtml(skill.name)}</strong>
            <span>${escapeHtml(skill.attribute)}</span>
          </button>
          <button type="button" class="master-npc-skill-rank" data-npc-skill="${escapeHtml(skill.name)}" title="Clique para alternar o treino">
            ${escapeHtml(shortLabel)}${bonus > 0 ? ` (+${bonus})` : ""}
          </button>
        </article>
      `;
    })
    .join("");
}

function renderMasterNpcAttributesMarkup(npc, compact = false) {
  const orderedAttributes = attributes
    .slice()
    .sort((a, b) => (ATTRIBUTE_META[a.id]?.position || 0) - (ATTRIBUTE_META[b.id]?.position || 0));

  return orderedAttributes
    .map((attribute) => {
      const short = ATTRIBUTE_META[attribute.id]?.short || attribute.label.slice(0, 3).toUpperCase();
      const value = getMasterNpcAttributeValue(npc, attribute.id);
      return `
        <article class="master-npc-attribute-card${compact ? " compact" : ""}">
          <button type="button" class="master-npc-attribute-roll" data-npc-roll-attribute="${escapeHtml(attribute.id)}" title="Rolar ${escapeHtml(attribute.label)}">
            <span>${escapeHtml(attribute.label)}</span>
            <strong>${escapeHtml(short)}</strong>
            <em>${escapeHtml(String(value))}</em>
          </button>
          <input
            data-npc-attribute="${escapeHtml(attribute.id)}"
            type="number"
            min="0"
            max="8"
            value="${escapeHtml(String(value))}"
          >
        </article>
      `;
    })
    .join("");
}

function renderMasterNpcCombatShell(npc) {
  const filledItems = deriveMasterNpcInventoryItems(npc).filter(
    (item) => item.name || item.description || item.image || item.equipped || item.linkedAttack
  );
  const pvMax = Math.max(npc.pvMax || 0, npc.pv || 0, 1);
  const peMax = Math.max(npc.peMax || 0, npc.pe || 0, 1);
  const sanMax = Math.max(npc.sanMax || 0, npc.san || 0, 1);
  const pvPercent = clamp((Math.max(0, npc.pv || 0) / pvMax) * 100, 0, 100);
  const pePercent = clamp((Math.max(0, npc.pe || 0) / peMax) * 100, 0, 100);
  const sanPercent = clamp((Math.max(0, npc.san || 0) / sanMax) * 100, 0, 100);
  const combatInventoryMarkup = filledItems.length
    ? filledItems
        .slice(0, 4)
        .map((item) => `
          <article class="master-npc-combat-item">
            <img style="--image-fit:${escapeHtml(normalizeImageFit(item.imageFit))}" src="${escapeHtml(item.image || defaultItemIcon)}" alt="${escapeHtml(item.name || "Item")}">
            <div>
              <strong>${escapeHtml(item.name || "Item sem nome")}</strong>
              <span>${escapeHtml(item.type || "Outro")}</span>
            </div>
          </article>
        `)
        .join("")
    : `<p class="empty-state">Nenhum equipamento relevante registrado.</p>`;

  return `
    <div class="master-npc-combat-shell">
      <section class="master-npc-combat-hero">
        <label class="master-npc-portrait large" title="Adicionar retrato do NPC">
          <img style="--image-fit:${escapeHtml(normalizeImageFit(npc.profileImageFit))}" src="${escapeHtml(npc.profileImage || defaultAvatar)}" alt="Retrato de ${escapeHtml(npc.name || "NPC")}">
          <input type="file" accept="image/*" class="hidden-file" data-npc-profile-image="true">
        </label>
        <div class="master-npc-combat-copy">
          <p class="master-lock-eyebrow">Modo combate</p>
          <h4>${escapeHtml(npc.name || "NPC sem nome")}</h4>
          <p>${escapeHtml(npc.role || "Sem função")} • ${escapeHtml(MASTER_NPC_RACE_LABELS[npc.race] || "Humano")} • ${escapeHtml(npc.className || "Sem classe")} • ${escapeHtml(npc.trail || "Sem trilha")}</p>
          <div class="master-npc-combat-tags">
            <span>${escapeHtml(MASTER_NPC_RISK_LABELS[npc.riskLevel] || "Moderado")}</span>
            <span>${escapeHtml(MASTER_NPC_IMPORTANCE_LABELS[npc.importance] || "Média")}</span>
            <span>NEX ${escapeHtml(String(npc.nex || 0))}%</span>
            <span>Itens ${escapeHtml(String(filledItems.length))}</span>
          </div>
        </div>
      </section>

      <section class="master-npc-combat-stats">
        <div class="master-npc-combat-track pv">
          <div class="master-npc-combat-track-head">
            <small>Pontos de Vida</small>
            <strong>${escapeHtml(String(npc.pv))} / ${escapeHtml(String(npc.pvMax))}</strong>
          </div>
          <div class="master-npc-combat-track-bar">
            <span style="width:${escapeHtml(String(pvPercent))}%"></span>
          </div>
          <div class="master-npc-combat-track-inputs">
            <label><span>Atual</span><input data-npc-field="pv" type="number" min="0" value="${escapeHtml(String(npc.pv))}"></label>
            <label><span>Máx</span><input data-npc-field="pvMax" type="number" min="0" value="${escapeHtml(String(npc.pvMax))}"></label>
          </div>
        </div>
        <div class="master-npc-combat-track pe">
          <div class="master-npc-combat-track-head">
            <small>Pontos de Esforço</small>
            <strong>${escapeHtml(String(npc.pe))} / ${escapeHtml(String(npc.peMax))}</strong>
          </div>
          <div class="master-npc-combat-track-bar">
            <span style="width:${escapeHtml(String(pePercent))}%"></span>
          </div>
          <div class="master-npc-combat-track-inputs">
            <label><span>Atual</span><input data-npc-field="pe" type="number" min="0" value="${escapeHtml(String(npc.pe))}"></label>
            <label><span>Máx</span><input data-npc-field="peMax" type="number" min="0" value="${escapeHtml(String(npc.peMax))}"></label>
          </div>
        </div>
        <div class="master-npc-combat-track san">
          <div class="master-npc-combat-track-head">
            <small>Sanidade</small>
            <strong>${escapeHtml(String(npc.san))} / ${escapeHtml(String(npc.sanMax))}</strong>
          </div>
          <div class="master-npc-combat-track-bar">
            <span style="width:${escapeHtml(String(sanPercent))}%"></span>
          </div>
          <div class="master-npc-combat-track-inputs">
            <label><span>Atual</span><input data-npc-field="san" type="number" min="0" value="${escapeHtml(String(npc.san))}"></label>
            <label><span>Máx</span><input data-npc-field="sanMax" type="number" min="0" value="${escapeHtml(String(npc.sanMax))}"></label>
          </div>
        </div>
        <label><small>Defesa</small><input data-npc-field="defense" type="number" min="0" value="${escapeHtml(String(npc.defense))}"></label>
        <label><small>Deslocamento</small><input data-npc-field="movement" type="text" value="${escapeHtml(npc.movement)}"></label>
      </section>

      <section class="master-npc-combat-grid">
        <article class="master-npc-combat-panel">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Arsenal</p>
            <h4>Ataques</h4>
          </div>
          <textarea data-npc-field="attacks" rows="7" placeholder="Ataques, dano, alcance, efeitos...">${escapeHtml(npc.attacks)}</textarea>
        </article>
        <article class="master-npc-combat-panel">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Anomalias</p>
            <h4>Traços e habilidades</h4>
          </div>
          <textarea data-npc-field="specials" rows="7" placeholder="Reações, passivas, efeitos, poderes...">${escapeHtml(npc.specials)}</textarea>
        </article>
      </section>

      <section class="master-npc-combat-grid two-columns">
        <article class="master-npc-combat-panel">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Atributos</p>
            <h4>Rolagem direta</h4>
          </div>
          <div class="master-npc-attributes-grid compact">
            ${renderMasterNpcAttributesMarkup(npc, true)}
          </div>
        </article>
        <article class="master-npc-combat-panel">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Perícias</p>
            <h4>Execução</h4>
          </div>
          <div class="master-npc-skills-grid compact">
            ${renderMasterNpcSkillsMarkup(npc)}
          </div>
        </article>
      </section>

      <section class="master-npc-combat-panel">
        <div class="master-npc-block-head">
          <p class="master-lock-eyebrow">Equipamentos</p>
          <h4>Operação</h4>
        </div>
        <div class="master-npc-combat-items">
          ${combatInventoryMarkup}
        </div>
      </section>
    </div>
  `;
}

function renderMasterNpcInventoryMarkup(npc) {
  return deriveMasterNpcInventoryItems(npc)
    .map((item, index) => {
      const filled = item.name || item.description || item.image || item.equipped || item.linkedAttack;
      const typeOptions = INVENTORY_ITEM_TYPES
        .map((type) => `<option value="${escapeHtml(type)}"${item.type === type ? " selected" : ""}>${escapeHtml(type)}</option>`)
        .join("");

      return `
        <article class="master-npc-item-card${filled ? " filled" : ""}">
          <div class="master-npc-item-top">
            <label class="master-npc-item-photo" title="Adicionar imagem do item ${index + 1}">
              <img style="--image-fit:${escapeHtml(normalizeImageFit(item.imageFit))}" src="${escapeHtml(item.image || defaultItemIcon)}" alt="Imagem do item ${index + 1}">
              <input type="file" accept="image/*" class="hidden-file" data-npc-item-image="${index}">
            </label>
            <div class="master-npc-item-copy">
              <input
                data-npc-item-field="name"
                data-npc-item-index="${index}"
                type="text"
                placeholder="Nome do item"
                value="${escapeHtml(item.name)}"
              >
              <select data-npc-item-field="type" data-npc-item-index="${index}">
                ${typeOptions}
              </select>
              <label class="master-npc-item-toggle">
                <span>Equipado</span>
                <input type="checkbox" data-npc-item-field="equipped" data-npc-item-index="${index}"${item.equipped ? " checked" : ""}>
              </label>
            </div>
          </div>
          <textarea
            data-npc-item-field="description"
            data-npc-item-index="${index}"
            rows="3"
            placeholder="Descrição, uso, pista ou efeito..."
          >${escapeHtml(item.description)}</textarea>
          <div class="master-npc-item-detail-grid">
            <label>Vínculo
              <input
                data-npc-item-field="linkedAttack"
                data-npc-item-index="${index}"
                type="text"
                placeholder="Ataque ou uso"
                value="${escapeHtml(item.linkedAttack)}"
              >
            </label>
            <label>DEF
              <input data-npc-item-field="defenseBonus" data-npc-item-index="${index}" type="number" min="-20" max="20" value="${escapeHtml(String(item.defenseBonus))}">
            </label>
            <label>AC
              <input data-npc-item-field="attackBonus" data-npc-item-index="${index}" type="number" min="-20" max="20" value="${escapeHtml(String(item.attackBonus))}">
            </label>
            <label>DMG
              <input data-npc-item-field="damageBonus" data-npc-item-index="${index}" type="number" min="-99" max="99" value="${escapeHtml(String(item.damageBonus))}">
            </label>
            <label>SAN-
              <input data-npc-item-field="sanPenalty" data-npc-item-index="${index}" type="number" min="0" max="99" value="${escapeHtml(String(item.sanPenalty))}">
            </label>
            <label>Imagem
              <select data-npc-item-field="imageFit" data-npc-item-index="${index}">
                <option value="cover"${normalizeImageFit(item.imageFit) === "cover" ? " selected" : ""}>Preencher quadro</option>
                <option value="contain"${normalizeImageFit(item.imageFit) === "contain" ? " selected" : ""}>Mostrar inteira</option>
              </select>
            </label>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMasterNpcList() {
  if (!elements.menuMasterNpcArchiveList) {
    return;
  }

  if (masterNpcs.length > 0 && !masterNpcs.some((npc) => npc.id === editingNpcId)) {
    editingNpcId = masterNpcs[0].id;
  }

  elements.menuMasterNpcArchiveList.innerHTML = "";

  if (!masterNpcs.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum NPC cadastrado.";
    elements.menuMasterNpcArchiveList.appendChild(empty);
    return;
  }

  getOrderedMasterNpcs().forEach((npc) => {
    const raceLabel = MASTER_NPC_RACE_LABELS[npc.race] || "Humano";
    const importanceLabel = MASTER_NPC_IMPORTANCE_LABELS[npc.importance] || "Média";
    const riskLabel = MASTER_NPC_RISK_LABELS[npc.riskLevel] || "Moderado";
    const trainedSkillsCount = Object.keys(npc.skillRanks || {}).length;
    const inventoryCount = deriveMasterNpcInventoryItems(npc).filter(
      (item) => item.name || item.description || item.image || item.equipped || item.linkedAttack
    ).length;
    const archiveStatus = getMasterNpcArchiveStatus(npc);
    const age = calculateAge(npc.birthdate);
    const card = document.createElement("article");
    card.className = npc.id === editingNpcId ? "master-npc-card archive active" : "master-npc-card archive";
    card.dataset.npcId = npc.id;
    card.innerHTML = `
      <div class="master-npc-card-top">
        <img class="master-npc-card-avatar" style="--image-fit:${escapeHtml(normalizeImageFit(npc.profileImageFit))}" src="${escapeHtml(npc.profileImage || defaultAvatar)}" alt="Retrato de ${escapeHtml(npc.name || "NPC")}">
        <div class="master-npc-card-copy">
          <strong>${escapeHtml(npc.name || "NPC sem nome")}</strong>
          <span>${escapeHtml(npc.role || "Sem função")} • ${escapeHtml(raceLabel)} • ${escapeHtml(npc.threatType || "Ameaça indefinida")}</span>
          <span>${escapeHtml(npc.className || "Sem classe")} • ${escapeHtml(npc.trail || "Sem trilha")}${age !== null ? ` • ${escapeHtml(String(age))} anos` : ""}</span>
          <span>PV ${escapeHtml(String(npc.pv))}/${escapeHtml(String(npc.pvMax))} • PE ${escapeHtml(String(npc.pe))}/${escapeHtml(String(npc.peMax))} • SAN ${escapeHtml(String(npc.san))}/${escapeHtml(String(npc.sanMax))} • DEF ${escapeHtml(String(npc.defense))} • NEX ${escapeHtml(String(npc.nex || 0))}%</span>
          <span>${escapeHtml(riskLabel)} • ${escapeHtml(importanceLabel)} • ${escapeHtml(String(trainedSkillsCount))} perícias • ${escapeHtml(String(inventoryCount))} itens • ${escapeHtml(archiveStatus.label)}</span>
        </div>
      </div>
      <div class="master-npc-card-actions">
        <button type="button" class="secondary compact-action" data-npc-id="${escapeHtml(npc.id)}" data-npc-menu-action="open">Abrir</button>
        <button type="button" class="menu-delete-btn compact-action" data-npc-id="${escapeHtml(npc.id)}" data-npc-menu-action="delete">Excluir</button>
      </div>
    `;
    elements.menuMasterNpcArchiveList.appendChild(card);
  });
}

function deleteMasterNpcById(npcId) {
  const npc = masterNpcs.find((item) => item.id === npcId);
  if (!npc) {
    return;
  }

  const confirmed = window.confirm(`Excluir o NPC "${npc.name || "Sem nome"}" do arquivo do mestre?`);
  if (!confirmed) {
    return;
  }

  masterNpcs = masterNpcs.filter((item) => item.id !== npcId);
  editingNpcId = masterNpcs[0]?.id || null;
  masterNpcCombatMode = false;
  saveMasterNpcs(masterNpcs);
  renderMasterNpcList();
  renderMasterNpcEditor();
  renderMasterNpcSheetSwitcher();
  updateMasterNpcScreenStatus();
  if (!masterNpcs.length) {
    setView("create");
  }
}

function renderMasterNpcEditor() {
  if (!elements.masterNpcEditor) {
    return;
  }

  const npc = masterNpcs.find((item) => item.id === editingNpcId) || null;
  renderMasterNpcSheetSwitcher();
  updateMasterNpcScreenStatus();
  if (!npc) {
    elements.masterNpcEditor.innerHTML = `
      <div class="master-detail-empty">
        <h3>Nenhum NPC aberto</h3>
        <p>Crie ou selecione um NPC para montar o dossiê completo do mestre.</p>
      </div>
    `;
    return;
  }

  const attributesMarkup = renderMasterNpcAttributesMarkup(npc);
  const skillsMarkup = renderMasterNpcSkillsMarkup(npc);
  const inventoryMarkup = renderMasterNpcInventoryMarkup(npc);
  const age = calculateAge(npc.birthdate);

  elements.masterNpcEditor.innerHTML = `
    <div class="master-npc-editor-card${masterNpcCombatMode ? " npc-combat-mode" : ""}" data-npc-editor-id="${escapeHtml(npc.id)}">
      <div class="master-npc-sheet">
        <section class="master-npc-block master-npc-identification">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Registro Base</p>
            <h4>Identificação e procedência</h4>
          </div>
          <div class="master-npc-profile-head">
            <label class="master-npc-portrait" title="Adicionar retrato do NPC">
              <img style="--image-fit:${escapeHtml(normalizeImageFit(npc.profileImageFit))}" src="${escapeHtml(npc.profileImage || defaultAvatar)}" alt="Retrato de ${escapeHtml(npc.name || "NPC")}">
              <input type="file" accept="image/*" class="hidden-file" data-npc-profile-image="true">
            </label>
            <div class="master-npc-profile-meta">
              <p><strong>Status:</strong> ${escapeHtml(getMasterNpcArchiveStatus(npc).label)}</p>
              <p><strong>Risco:</strong> ${escapeHtml(MASTER_NPC_RISK_LABELS[npc.riskLevel] || "Moderado")}</p>
              <p><strong>Importância:</strong> ${escapeHtml(MASTER_NPC_IMPORTANCE_LABELS[npc.importance] || "Média")}</p>
              <p><strong>Idade:</strong> ${age === null ? "-" : escapeHtml(String(age))}</p>
              <label>Retrato
                <select data-npc-field="profileImageFit">
                  <option value="cover"${normalizeImageFit(npc.profileImageFit) === "cover" ? " selected" : ""}>Preencher quadro</option>
                  <option value="contain"${normalizeImageFit(npc.profileImageFit) === "contain" ? " selected" : ""}>Mostrar inteiro</option>
                </select>
              </label>
            </div>
          </div>
          <div class="master-npc-grid">
            <label>Nome<input data-npc-field="name" type="text" value="${escapeHtml(npc.name)}"></label>
            <label>Data de nascimento<input data-npc-field="birthdate" type="date" value="${escapeHtml(npc.birthdate)}"></label>
            <label>Origem / profissão<input data-npc-field="origin" type="text" value="${escapeHtml(npc.origin)}" placeholder="Origem, ocupação, procedência..."></label>
            <label>Classe<input data-npc-field="className" type="text" value="${escapeHtml(npc.className)}" placeholder="Classe ou arquétipo"></label>
            <label>Trilha<input data-npc-field="trail" type="text" value="${escapeHtml(npc.trail)}" placeholder="Trilha, disciplina ou especialização"></label>
            <label>Função<input data-npc-field="role" type="text" value="${escapeHtml(npc.role)}" placeholder="Cultista, ameaça, aliado..."></label>
            <label>Raça
              <select data-npc-field="race">
                <option value="humano"${npc.race === "humano" ? " selected" : ""}>Humano</option>
                <option value="criatura"${npc.race === "criatura" ? " selected" : ""}>Criatura</option>
                <option value="animal"${npc.race === "animal" ? " selected" : ""}>Animal</option>
              </select>
            </label>
            <label>Tipo de ameaça<input data-npc-field="threatType" type="text" value="${escapeHtml(npc.threatType)}" placeholder="Entidade, predador, aliado instável..."></label>
            <label>Importância
              <select data-npc-field="importance">
                <option value="baixa"${npc.importance === "baixa" ? " selected" : ""}>Baixa</option>
                <option value="media"${npc.importance === "media" ? " selected" : ""}>Média</option>
                <option value="alta"${npc.importance === "alta" ? " selected" : ""}>Alta</option>
                <option value="critica"${npc.importance === "critica" ? " selected" : ""}>Crítica</option>
              </select>
            </label>
            <label>Nível de risco
              <select data-npc-field="riskLevel">
                <option value="minimo"${npc.riskLevel === "minimo" ? " selected" : ""}>Mínimo</option>
                <option value="baixo"${npc.riskLevel === "baixo" ? " selected" : ""}>Baixo</option>
                <option value="moderado"${npc.riskLevel === "moderado" ? " selected" : ""}>Moderado</option>
                <option value="alto"${npc.riskLevel === "alto" ? " selected" : ""}>Alto</option>
                <option value="extremo"${npc.riskLevel === "extremo" ? " selected" : ""}>Extremo</option>
              </select>
            </label>
            <label class="master-npc-full">Aparência<textarea data-npc-field="appearance" rows="3" placeholder="Traços visuais, vestes, marcas, sinais...">${escapeHtml(npc.appearance)}</textarea></label>
            <label class="master-npc-full">Personalidade<textarea data-npc-field="personality" rows="3" placeholder="Comportamento, postura, obsessões, presença...">${escapeHtml(npc.personality)}</textarea></label>
          </div>
        </section>

        <section class="master-npc-block master-npc-combat-block">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Presença em Cena</p>
            <h4>Recursos, defesa e ofensiva</h4>
          </div>
          <div class="master-npc-grid master-npc-combat-grid">
            <label>NEX<input data-npc-field="nex" type="number" min="0" max="100" step="5" value="${escapeHtml(String(npc.nex || 0))}"></label>
            <label>PV<input data-npc-field="pv" type="number" min="0" value="${escapeHtml(String(npc.pv))}"></label>
            <label>PV Máx<input data-npc-field="pvMax" type="number" min="0" value="${escapeHtml(String(npc.pvMax))}"></label>
            <label>PE<input data-npc-field="pe" type="number" min="0" value="${escapeHtml(String(npc.pe))}"></label>
            <label>PE Máx<input data-npc-field="peMax" type="number" min="0" value="${escapeHtml(String(npc.peMax))}"></label>
            <label>SAN<input data-npc-field="san" type="number" min="0" value="${escapeHtml(String(npc.san))}"></label>
            <label>SAN Máx<input data-npc-field="sanMax" type="number" min="0" value="${escapeHtml(String(npc.sanMax))}"></label>
            <label>Defesa<input data-npc-field="defense" type="number" min="0" value="${escapeHtml(String(npc.defense))}"></label>
            <label>Deslocamento<input data-npc-field="movement" type="text" value="${escapeHtml(npc.movement)}"></label>
            <label>Ferimentos
              <select data-npc-field="wounds">
                <option value=""${!npc.wounds ? " selected" : ""}>Sem ferimentos</option>
                <option value="Sangrando"${npc.wounds === "Sangrando" ? " selected" : ""}>Sangrando</option>
                <option value="Ferido"${npc.wounds === "Ferido" ? " selected" : ""}>Ferido</option>
                <option value="Morrendo"${npc.wounds === "Morrendo" ? " selected" : ""}>Morrendo</option>
                <option value="Morto"${npc.wounds === "Morto" ? " selected" : ""}>Morto</option>
              </select>
            </label>
            <label class="master-npc-full">Ataques<textarea data-npc-field="attacks" rows="4" placeholder="Lista rápida de ataques...">${escapeHtml(npc.attacks)}</textarea></label>
            <label class="master-npc-full">Traços e habilidades<textarea data-npc-field="specials" rows="4" placeholder="Poderes, efeitos paranormais, reações e traços especiais...">${escapeHtml(npc.specials)}</textarea></label>
          </div>
          <div class="inline-actions">
            <button type="button" class="secondary" data-npc-action="initiative">Adicionar ao encontro</button>
          </div>
        </section>

        <section class="master-npc-block master-npc-attributes-block">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Atributos</p>
            <h4>Base física e mental</h4>
          </div>
          <div class="master-npc-attributes-grid">
            ${attributesMarkup}
          </div>
        </section>

        <section class="master-npc-block master-npc-dossier-block">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Dossiê</p>
            <h4>História, objetivo e informação</h4>
          </div>
          <div class="master-npc-grid">
            <label class="master-npc-full">História<textarea data-npc-field="history" rows="4" placeholder="Origem, passado, ligação com a campanha...">${escapeHtml(npc.history)}</textarea></label>
            <label class="master-npc-full">Objetivo<textarea data-npc-field="objective" rows="3" placeholder="O que essa presença quer, protege ou procura?">${escapeHtml(npc.objective)}</textarea></label>
            <label class="master-npc-full">Informações<textarea data-npc-field="informations" rows="4" placeholder="Pistas, fatos, fraquezas, boatos, detalhes importantes...">${escapeHtml(npc.informations)}</textarea></label>
            <label class="master-npc-full">Anotações<textarea data-npc-field="notes" rows="5" placeholder="Comportamento, gatilhos, observações do mestre...">${escapeHtml(npc.notes)}</textarea></label>
          </div>
        </section>

        <section class="master-npc-block master-npc-skills-block">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Perícias</p>
            <h4>Treinamento e execução</h4>
            <p class="hint">Role ou alterne o nível de treino diretamente na ficha.</p>
          </div>
          <div class="master-npc-skills-grid">
            ${skillsMarkup}
          </div>
        </section>

        <section class="master-npc-block master-npc-inventory-block">
          <div class="master-npc-block-head">
            <p class="master-lock-eyebrow">Inventário</p>
            <h4>Equipamentos e evidências</h4>
            <p class="hint">Itens, armas, ferramentas, objetos amaldiçoados e pistas carregadas pelo NPC.</p>
          </div>
          <div class="master-npc-inventory-grid">
            ${inventoryMarkup}
          </div>
        </section>
      </div>
      ${renderMasterNpcCombatShell(npc)}
    </div>
  `;
}

function handleMasterNpcCreate() {
  const npc = createEmptyMasterNpc();
  masterNpcs = [npc, ...masterNpcs];
  editingNpcId = npc.id;
  masterNpcCombatMode = false;
  saveMasterNpcs(masterNpcs);
  renderMasterNpcList();
  openMasterNpcSheet(npc.id);
}

function handleMasterNpcListClick(event) {
  const target = event.target instanceof Element ? event.target.closest("[data-npc-id]") : null;
  if (!target) {
    return;
  }

  if (masterNpcSyncTimer) {
    flushMasterNpcSync();
  }

  const npcId = target.dataset.npcId || "";
  const actionTrigger = event.target instanceof Element ? event.target.closest("[data-npc-menu-action]") : null;
  const action = actionTrigger?.dataset.npcMenuAction || "open";
  if (!npcId) {
    return;
  }

  if (action === "delete") {
    deleteMasterNpcById(npcId);
    return;
  }

  openMasterNpcSheet(npcId);
}

function handleMasterNpcEditorInput(event) {
  const target = event.target instanceof Element ? event.target : null;
  const editor = target ? target.closest("[data-npc-editor-id]") : null;
  if (!target || !editor) {
    return;
  }

  const npc = masterNpcs.find((item) => item.id === editor.dataset.npcEditorId);
  if (!npc) {
    return;
  }

  const field = target.closest("[data-npc-field]");
  if (field) {
    const fieldName = field.dataset.npcField;
    let nextValue = field.value;
    if (field instanceof HTMLInputElement && field.type === "number") {
      nextValue = Number.parseInt(field.value || "0", 10) || 0;
      if (fieldName === "nex") {
        nextValue = clamp(nextValue, 0, 100);
      }
    }
    npc[fieldName] = nextValue;
    touchMasterNpc(npc);
    queueMasterNpcSync();
    return;
  }

  const attributeField = target.closest("[data-npc-attribute]");
  if (attributeField) {
    const attributeId = attributeField.dataset.npcAttribute;
    if (!attributeId) {
      return;
    }
    npc.attributes = normalizeMasterNpcAttributes(npc.attributes);
    const parsed = Number.parseInt(attributeField.value || "0", 10);
    npc.attributes[attributeId] = Number.isNaN(parsed) ? 0 : clamp(parsed, 0, 8);
    touchMasterNpc(npc);
    queueMasterNpcSync();
    return;
  }

  const itemField = target.closest("[data-npc-item-field]");
  if (itemField) {
    const itemIndex = Number.parseInt(itemField.dataset.npcItemIndex || "-1", 10);
    const itemKey = itemField.dataset.npcItemField || "";
    if (itemIndex < 0 || itemIndex >= MASTER_NPC_INVENTORY_SLOTS || !itemKey) {
      return;
    }
    const items = deriveMasterNpcInventoryItems(npc);
    const nextItem = { ...items[itemIndex] };
    if (itemField instanceof HTMLInputElement && itemField.type === "checkbox") {
      nextItem[itemKey] = itemField.checked;
    } else if (itemField instanceof HTMLInputElement && itemField.type === "number") {
      nextItem[itemKey] = Number.parseInt(itemField.value || "0", 10) || 0;
    } else {
      nextItem[itemKey] = itemField.value;
    }
    items[itemIndex] = normalizeInventoryItem(nextItem);
    npc.inventory = items;
    touchMasterNpc(npc);
    queueMasterNpcSync();
  }
}

function handleMasterNpcEditorChange(event) {
  const target = event.target instanceof Element ? event.target : null;
  const editor = target ? target.closest("[data-npc-editor-id]") : null;
  if (!target || !editor) {
    return;
  }

  const npc = masterNpcs.find((item) => item.id === editor.dataset.npcEditorId);
  if (!npc) {
    return;
  }

  const profileImageInput = target.closest("[data-npc-profile-image]");
  if (profileImageInput instanceof HTMLInputElement) {
    const [file] = profileImageInput.files || [];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      npc.profileImage = String(reader.result || "");
      touchMasterNpc(npc);
      flushMasterNpcSync({ renderEditor: true });
    };
    reader.readAsDataURL(file);
    return;
  }

  const imageInput = target.closest("[data-npc-item-image]");
  if (imageInput instanceof HTMLInputElement) {
    const [file] = imageInput.files || [];
    const itemIndex = Number.parseInt(imageInput.dataset.npcItemImage || "-1", 10);
    if (!file || itemIndex < 0 || itemIndex >= MASTER_NPC_INVENTORY_SLOTS) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const items = deriveMasterNpcInventoryItems(npc);
      items[itemIndex] = normalizeInventoryItem({
        ...items[itemIndex],
        image: String(reader.result || ""),
      });
      npc.inventory = items;
      touchMasterNpc(npc);
      flushMasterNpcSync({ renderEditor: true });
    };
    reader.readAsDataURL(file);
    return;
  }

  if (target.matches("[data-npc-item-field], [data-npc-field], [data-npc-attribute]")) {
    handleMasterNpcEditorInput(event);
  }
}

function handleMasterNpcEditorClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  const editor = target ? target.closest("[data-npc-editor-id]") : null;
  if (!target || !editor) {
    return;
  }

  const npc = masterNpcs.find((item) => item.id === editor.dataset.npcEditorId);
  if (!npc) {
    return;
  }

  if (masterNpcSyncTimer) {
    flushMasterNpcSync();
  }

  const attributeRollTrigger = target.closest("[data-npc-roll-attribute]");
  if (attributeRollTrigger) {
    const attributeId = attributeRollTrigger.dataset.npcRollAttribute || "";
    const attribute = attributes.find((item) => item.id === attributeId);
    if (!attribute) {
      return;
    }
    void rollMasterNpcAttribute(npc, attribute);
    return;
  }

  const skillRollTrigger = target.closest("[data-npc-roll-skill]");
  if (skillRollTrigger) {
    const skillName = skillRollTrigger.dataset.npcRollSkill || "";
    const skill = skillsCatalog.find((item) => item.name === skillName);
    if (!skill) {
      return;
    }
    void rollMasterNpcSkill(npc, skill);
    return;
  }

  const skillTrigger = target.closest("[data-npc-skill]");
  if (skillTrigger) {
    const skillName = skillTrigger.dataset.npcSkill || "";
    const currentRank = getMasterNpcSkillRank(npc, skillName);
    const currentIndex = SKILL_RANKS.indexOf(currentRank);
    const nextRank = SKILL_RANKS[(currentIndex + 1) % SKILL_RANKS.length];
    npc.skillRanks = normalizeMasterNpcSkillRanks(npc.skillRanks);
    if (nextRank === "Destreinado") {
      delete npc.skillRanks[skillName];
    } else {
      npc.skillRanks[skillName] = nextRank;
    }
    touchMasterNpc(npc);
    saveMasterNpcs(masterNpcs);
    renderMasterNpcList();
    renderMasterNpcEditor();
    return;
  }

  const trigger = target.closest("[data-npc-action]");
  if (!trigger) {
    return;
  }

  if (trigger.dataset.npcAction === "toggle-combat") {
    masterNpcCombatMode = !masterNpcCombatMode;
    renderMasterNpcEditor();
    updateMasterNpcScreenStatus();
    return;
  }

  if (trigger.dataset.npcAction === "duplicate") {
    const clonedNpc = cloneMasterNpc(npc);
    masterNpcs = [clonedNpc, ...masterNpcs];
    editingNpcId = clonedNpc.id;
    masterNpcCombatMode = false;
    saveMasterNpcs(masterNpcs);
    renderMasterNpcList();
    openMasterNpcSheet(clonedNpc.id, { closeMenu: false });
    return;
  }

  if (trigger.dataset.npcAction === "initiative") {
    initiativeEntries = [
      ...initiativeEntries,
      createEmptyInitiativeEntry({
        name: npc.name || "NPC",
        tag: npc.role || "NPC",
      }),
    ];
    renderInitiativeTracker();
    queueAutoSave();
    return;
  }

  if (trigger.dataset.npcAction === "delete") {
    deleteMasterNpcById(editor.dataset.npcEditorId || npc.id);
    return;
  }
}

async function rollMasterNpcAttribute(npc, attribute) {
  const diceCount = clampRollDiceCount(rollDiceCount);
  const rolls = rollDicePool(diceCount);
  const highest = Math.max(...rolls);
  const sum = rolls.reduce((total, value) => total + value, 0);
  const short = ATTRIBUTE_META[attribute.id]?.short || attribute.label;
  const attributeValue = getMasterNpcAttributeValue(npc, attribute.id);
  const actorName = npc.name || "NPC";

  setRollResult(
    diceCount > 1
      ? `${actorName}: ${attribute.label} (${short}) -> maior ${highest} | soma ${sum}`
      : `${actorName}: ${attribute.label} (${short}) -> ${highest}`
  );

  recordRollHistory({
    kind: "NPC",
    label: `${actorName} • ${attribute.label}`,
    total: highest,
    detail: `Atributo ${attributeValue}${diceCount > 1 ? ` • soma ${sum}` : ""}`,
    rolls,
  });

  await showRollModal({
    title: `${actorName} • ${attribute.label} (${short})`,
    rolls,
    highest,
    bonus: 0,
    total: highest,
    subtitle: `Valor base ${attributeValue}`,
    animateRoll: true,
  });
}

async function rollMasterNpcSkill(npc, skill) {
  const rank = getMasterNpcSkillRank(npc, skill.name);
  const bonus = SKILL_RANK_BONUS[rank] ?? 0;
  const diceCount = clampRollDiceCount(rollDiceCount);
  const rolls = rollDicePool(diceCount);
  const highest = Math.max(...rolls);
  const sum = rolls.reduce((total, value) => total + value, 0);
  const total = highest + bonus;
  const actorName = npc.name || "NPC";

  setRollResult(
    diceCount > 1
      ? `${actorName}: ${skill.name} -> maior ${highest}${bonus ? ` + ${bonus} = ${total}` : ""} | soma ${sum}`
      : `${actorName}: ${skill.name} -> ${highest}${bonus ? ` + ${bonus} = ${total}` : ""}`
  );

  recordRollHistory({
    kind: "NPC",
    label: `${actorName} • ${skill.name}`,
    total,
    detail: `${rank}${bonus > 0 ? ` • bônus ${bonus}` : ""}${diceCount > 1 ? ` • soma ${sum}` : ""}`,
    rolls,
  });

  await showRollModal({
    title: `${actorName} • ${skill.name}`,
    rolls,
    highest,
    bonus,
    total,
    subtitle: `${skill.attribute} • ${SKILL_RANK_SHORT_LABELS[rank] || rank}`,
    animateRoll: true,
  });
}

function syncNexTrack() {
  const maxInput = elements.nexMax;
  const lostInput = elements.nexLost;
  if (!elements.nex || !maxInput || !lostInput) {
    return;
  }

  const parsed = readNumber(elements.nex.value);
  const safe = clamp(parsed ?? 0, 0, 100);
  const normalized = Math.floor(safe / 5) * 5;

  maxInput.value = "100";
  lostInput.value = String(Math.max(0, 100 - normalized));
}

function updateResourceBars() {
  syncNexTrack();
  applyTrack("pd");
  applyTrack("san");
  applyTrack("pe");
  applyTrack("nex");
  updateNexGlow();
  updateProfileAura();
  renderProfileStatusIcons();
  renderSheetMetaPanels();
}

function updateNexGlow() {
  const trackEl = document.querySelector(".nex-track");
  if (!trackEl) {
    return;
  }

  trackEl.classList.remove("glow-25", "glow-50", "glow-75", "glow-100");

  if (!elements.nexMax || !elements.nexLost) {
    return;
  }

  const values = readTrackValues(elements.nexMax.value, elements.nexLost.value);
  const nexValue = clamp(values.current, 0, 100);

  if (nexValue >= 100) {
    trackEl.classList.add("glow-100");
    return;
  }
  if (nexValue >= 75) {
    trackEl.classList.add("glow-75");
    return;
  }
  if (nexValue >= 50) {
    trackEl.classList.add("glow-50");
    return;
  }
  if (nexValue >= 25) {
    trackEl.classList.add("glow-25");
  }
}

function applyTrack(trackName) {
  const track = TRACK_CONFIG[trackName];
  if (!track || !track.maxInput || !track.lostInput || !track.fill || !track.label) {
    return;
  }

  const values = getEffectiveTrackView(trackName, readTrackValues(track.maxInput.value, track.lostInput.value));
  const percentage = values.max > 0 ? (values.current / values.max) * 100 : 0;

  if (track.orientation === "vertical") {
    track.fill.style.height = `${percentage}%`;
    track.fill.style.width = "100%";
  } else {
    track.fill.style.width = `${percentage}%`;
    track.fill.style.height = "100%";
  }

  if (trackName === "nex") {
    track.label.textContent = `${values.current}%`;
  } else if (trackName === "pd" || trackName === "pe") {
    track.label.textContent = `${values.current} / ${values.max}`;
  } else {
    track.label.textContent = `${values.current}/${values.max}`;
  }

  track.maxInput.value = String(values.max);
  track.lostInput.value = String(values.lost);
}

function adjustTrack(trackName, delta) {
  const labelMap = { nex: "NEX", pd: "PV", pe: "PE", san: "SAN" };
  if (trackName === "nex") {
    if (!elements.nex) {
      return;
    }
    const current = normalizeNexValue();
    const next = clamp(current + delta, 0, 100);
    elements.nex.value = String(next);
    normalizeNexValue();
    recordChangeHistory("NEX ajustado", `${current}% → ${next}%`);
    queueAutoSave();
    return;
  }

  const track = TRACK_CONFIG[trackName];
  if (!track || delta === 0) {
    return;
  }

  const values = readTrackValues(track.maxInput.value, track.lostInput.value);
  const lockTrackMaximum =
    editorMode === "character"
    && characterSheetMode === "viewer";
  let max = values.max;
  let current = values.current + delta;

  if (lockTrackMaximum) {
    current = clamp(current, 0, max);
  } else {
    if (current > max) {
      max = current;
    }

    if (current < 0) {
      const overflow = Math.abs(current);
      max = Math.max(0, max - overflow);
      current = 0;
    }
  }

  const lost = Math.max(0, max - current);

  track.maxInput.value = String(max);
  track.lostInput.value = String(lost);
  updateResourceBars();
  recordChangeHistory(`${labelMap[trackName] || "Recurso"} ajustado`, `${delta > 0 ? "+" : ""}${delta}`);
  queueAutoSave();
}

function spendTrackPoints(trackName, amount) {
  const track = TRACK_CONFIG[trackName];
  if (!track || amount <= 0) {
    return;
  }

  const values = readTrackValues(track.maxInput.value, track.lostInput.value);
  const nextCurrent = Math.max(0, values.current - amount);
  const lost = Math.max(0, values.max - nextCurrent);

  track.maxInput.value = String(values.max);
  track.lostInput.value = String(lost);
  updateResourceBars();
  recordChangeHistory(`${trackName === "pd" ? "PV" : trackName === "pe" ? "PE" : trackName.toUpperCase()} gasto`, `-${amount}`);
  queueAutoSave();
}

function readTrackValues(maxValue, lostValue) {
  const maxParsed = readNumber(maxValue);
  const lostParsed = readNumber(lostValue);

  const max = Math.max(0, maxParsed ?? 0);
  const safeLost = Math.max(0, lostParsed ?? 0);
  const lost = Math.min(safeLost, max);
  const current = Math.max(0, max - lost);

  return { max, lost, current };
}

function deriveTrack(maxValue, lostValue) {
  if (maxValue === null || maxValue === undefined) {
    return { max: null, lost: null, current: null };
  }

  const max = Math.max(0, Number(maxValue) || 0);
  const lost = Math.min(Math.max(0, Number(lostValue) || 0), max);

  return {
    max,
    lost,
    current: Math.max(0, max - lost),
  };
}

function readAttributeValue(attributeId) {
  const input = document.getElementById(`attr-${attributeId}`);
  const parsed = Number.parseInt(input?.value || "0", 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function readNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function normalizeNexValue() {
  if (!elements.nex) {
    return 0;
  }
  const parsed = readNumber(elements.nex.value);
  const safe = clamp(parsed ?? 0, 0, 100);
  const normalized = Math.floor(safe / 5) * 5;
  elements.nex.value = String(normalized);
  updateHeroNexDisplay(normalized);
  applyNexEffects(normalized);
  updateResourceBars();
  updateDerivedSummary();
  updateProfileIdentity();
  return normalized;
}

function hasCustomProfileImage() {
  return Boolean(String(elements.profileImageData?.value || "").trim());
}

function openProfileImagePicker() {
  if (!elements.profileImageFile) {
    return;
  }
  elements.profileImageFile.value = "";
  elements.profileImageFile.click();
}

function normalizeProfileFrameShape(value, fallback = "square") {
  const rawValue = String(value || "").toLowerCase();
  if (PROFILE_FRAME_SHAPES.has(rawValue)) {
    return rawValue;
  }
  return PROFILE_FRAME_SHAPES.has(String(fallback || "").toLowerCase())
    ? String(fallback).toLowerCase()
    : "square";
}

function normalizeProfileImagePosition(value, fallback = 50) {
  const parsed = Number.parseFloat(String(value ?? "").replace(",", "."));
  return clamp(Number.isFinite(parsed) ? parsed : fallback, 0, 100);
}

function normalizeProfileImageZoom(value, fallback = 1) {
  const parsed = Number.parseFloat(String(value ?? "").replace(",", "."));
  return clamp(Number.isFinite(parsed) ? parsed : fallback, 1, 2.6);
}

function getProfileImageSettings() {
  return {
    fit: normalizeImageFit(elements.profileImageFit?.value || "cover"),
    x: normalizeProfileImagePosition(elements.profileImagePositionX?.value),
    y: normalizeProfileImagePosition(elements.profileImagePositionY?.value),
    zoom: normalizeProfileImageZoom(elements.profileImageZoom?.value),
    shape: normalizeProfileFrameShape(elements.profileFrameShape?.value),
  };
}

function getCharacterProfileImageSettings(character = {}) {
  return {
    fit: normalizeImageFit(character.profileImageFit),
    x: normalizeProfileImagePosition(character.profileImagePositionX),
    y: normalizeProfileImagePosition(character.profileImagePositionY),
    zoom: normalizeProfileImageZoom(character.profileImageZoom),
    shape: normalizeProfileFrameShape(character.profileFrameShape),
  };
}

function setProfileImageSettings(settings = {}) {
  const current = getProfileImageSettings();
  const next = {
    fit: settings.fit === undefined ? current.fit : normalizeImageFit(settings.fit),
    x: settings.x === undefined ? current.x : normalizeProfileImagePosition(settings.x, current.x),
    y: settings.y === undefined ? current.y : normalizeProfileImagePosition(settings.y, current.y),
    zoom: settings.zoom === undefined ? current.zoom : normalizeProfileImageZoom(settings.zoom, current.zoom),
    shape: settings.shape === undefined ? current.shape : normalizeProfileFrameShape(settings.shape, current.shape),
  };

  if (elements.profileImageFit) {
    elements.profileImageFit.value = next.fit;
  }
  if (elements.profileImagePositionX) {
    elements.profileImagePositionX.value = String(Math.round(next.x));
  }
  if (elements.profileImagePositionY) {
    elements.profileImagePositionY.value = String(Math.round(next.y));
  }
  if (elements.profileImageZoom) {
    elements.profileImageZoom.value = String(next.zoom);
  }
  if (elements.profileFrameShape) {
    elements.profileFrameShape.value = next.shape;
  }

  return next;
}

function applyProfileImageSettingsToElement(element, settings = getProfileImageSettings()) {
  if (!element?.style) {
    return;
  }
  applyImageFitToElement(element, settings.fit);
  element.style.setProperty("--profile-image-x", `${settings.x}%`);
  element.style.setProperty("--profile-image-y", `${settings.y}%`);
  element.style.setProperty("--profile-image-zoom", String(settings.zoom));
}

function applyProfileFrameShape(shape = getProfileImageSettings().shape) {
  const normalizedShape = normalizeProfileFrameShape(shape);
  [elements.avatarCircle, elements.profileImageViewer].forEach((target) => {
    if (!target?.classList) {
      return;
    }
    target.classList.remove("frame-shape-square", "frame-shape-round", "frame-shape-hexagon");
    target.classList.add(`frame-shape-${normalizedShape}`);
  });
  return normalizedShape;
}

function refreshProfileImagePreview() {
  if (!elements.profilePreview) {
    return;
  }
  const settings = getProfileImageSettings();
  elements.profilePreview.src = elements.profileImageData?.value || defaultAvatar;
  applyProfileImageSettingsToElement(elements.profilePreview, settings);
  applyProfileFrameShape(settings.shape);
}

function syncProfileImageControls() {
  const settings = getProfileImageSettings();
  if (elements.profileImagePositionXControl) {
    elements.profileImagePositionXControl.value = String(settings.x);
  }
  if (elements.profileImagePositionYControl) {
    elements.profileImagePositionYControl.value = String(settings.y);
  }
  if (elements.profileImageZoomControl) {
    elements.profileImageZoomControl.value = String(settings.zoom);
  }
  elements.profileFrameShapeButtons.forEach((button) => {
    const active = normalizeProfileFrameShape(button.dataset.profileFrameShape) === settings.shape;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function refreshProfileImageModal() {
  if (!elements.profileImageFullPreview) {
    return;
  }
  const settings = getProfileImageSettings();
  elements.profileImageFullPreview.src = elements.profileImageData?.value || defaultAvatar;
  applyProfileImageSettingsToElement(elements.profileImageFullPreview, settings);
  applyProfileFrameShape(settings.shape);
  syncProfileImageControls();
}

function setProfileImageToolsVisible(visible) {
  elements.profileImageTools?.classList.toggle("hidden", !visible);
  elements.profileImageEditToggle?.classList.toggle("hidden", visible);
}

function openProfileImageModal(editing = false) {
  if (!hasCustomProfileImage()) {
    openProfileImagePicker();
    return;
  }
  refreshProfileImageModal();
  setProfileImageToolsVisible(editing);
  elements.profileImageModal?.classList.add("open");
  elements.profileImageModal?.setAttribute("aria-hidden", "false");
}

function closeProfileImageModal() {
  elements.profileImageModal?.classList.remove("open");
  elements.profileImageModal?.setAttribute("aria-hidden", "true");
  profileImageDrag = null;
}

function setProfileImagePositionFromPointer(event) {
  if (!elements.profileImageViewer) {
    return;
  }
  const rect = elements.profileImageViewer.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  setProfileImageSettings({ x, y });
  syncProfileImageControls();
  refreshProfileImagePreview();
  refreshProfileImageModal();
}

function startProfileImageDrag(event) {
  if (!elements.profileImageModal?.classList.contains("open") || elements.profileImageTools?.classList.contains("hidden")) {
    return;
  }
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("button, input, label")) {
    return;
  }
  profileImageDrag = event.pointerId;
  elements.profileImageViewer?.setPointerCapture?.(event.pointerId);
  setProfileImagePositionFromPointer(event);
}

function moveProfileImageDrag(event) {
  if (profileImageDrag !== event.pointerId) {
    return;
  }
  setProfileImagePositionFromPointer(event);
}

function stopProfileImageDrag(event) {
  if (profileImageDrag !== event.pointerId) {
    return;
  }
  elements.profileImageViewer?.releasePointerCapture?.(event.pointerId);
  profileImageDrag = null;
  queueAutoSave();
}

function setProfilePreview(source, fit = elements.profileImageFit?.value || "cover") {
  if (elements.profileImageFit) {
    elements.profileImageFit.value = normalizeImageFit(fit);
  }
  if (elements.profileImageData && source) {
    elements.profileImageData.value = source;
  }
  refreshProfileImagePreview();
}

function updateHeroNexDisplay(nexValue) {
  if (!elements.heroNexDisplay) {
    return;
  }

  elements.heroNexDisplay.textContent = `NEX ${nexValue}%`;
}

function applyNexEffects(nexValue) {
  document.body.classList.remove("nex-normal", "nex-glitch", "nex-corrupt");

  if (nexValue <= 20) {
    document.body.classList.add("nex-normal");
    return;
  }

  if (nexValue <= 50) {
    document.body.classList.add("nex-glitch");
    return;
  }

  document.body.classList.add("nex-corrupt");
}

function updateProfileAura() {
  if (!elements.avatarCircle) {
    return;
  }

  const pd = readTrackValues(elements.pdMax.value, elements.pdLost.value);
  const san = getEffectiveTrackView("san", readTrackValues(elements.sanMax.value, elements.sanLost.value));
  const nex = elements.nexMax && elements.nexLost
    ? readTrackValues(elements.nexMax.value, elements.nexLost.value)
    : { max: 100, lost: 100, current: 0 };

  const lowLife = pd.max > 0 && pd.current / pd.max < 0.25;
  const highSanity = san.max > 0 && san.current / san.max > 0.4;
  const lowSanity = san.max > 0 && san.current / san.max < 0.25;
  const severeDamage = pd.max > 0 && pd.current / pd.max <= 0.5;
  const combatActive = document.body.classList.contains("combat-mode");
  const severeWounds = combatActive && elements.wounds
    ? elements.wounds.value === "Ferido" || elements.wounds.value === "Morrendo"
    : false;

  const frameClasses = ["frame-nex-0", "frame-nex-25", "frame-nex-50", "frame-nex-75", "frame-nex-100"];
  elements.avatarCircle.classList.remove(
    "aura-red",
    "aura-yellow",
    "frame-cracked",
    "sanity-low",
    ...frameClasses
  );

  const nexValue = clamp(nex.current, 0, 100);
  const nexFrame = nexValue >= 100
    ? "frame-nex-100"
    : nexValue >= 75
      ? "frame-nex-75"
      : nexValue >= 50
        ? "frame-nex-50"
        : nexValue >= 25
          ? "frame-nex-25"
          : "frame-nex-0";
  elements.avatarCircle.classList.add(nexFrame);

  if (lowLife) {
    elements.avatarCircle.classList.add("aura-red");
  } else if (highSanity) {
    elements.avatarCircle.classList.add("aura-yellow");
  }

  if (lowSanity) {
    elements.avatarCircle.classList.add("sanity-low");
  }

  if (severeDamage || severeWounds) {
    elements.avatarCircle.classList.add("frame-cracked");
  }
}

function applyWoundState() {
  const states = ["wound-sangrando", "wound-ferido", "wound-morrendo", "wound-morto", "character-dead"];
  states.forEach((state) => document.body.classList.remove(state));

  if (!elements.wounds) {
    return;
  }

  const mapping = {
    Sangrando: "wound-sangrando",
    Ferido: "wound-ferido",
    Morrendo: "wound-morrendo",
    Morto: "wound-morto",
  };

  const selected = mapping[elements.wounds.value];
  if (selected) {
    document.body.classList.add(selected);
  }
  if (elements.wounds.value === "Morto") {
    document.body.classList.add("character-dead");
  }

  updateProfileAura();
  renderProfileStatusIcons();
}

function setRollResult(text) {
  elements.rollResult.textContent = text;
}

function randomDie(sides = 20) {
  const safeSides = Math.max(2, Math.round(Number(sides) || 20));
  return Math.floor(Math.random() * safeSides) + 1;
}

function rollDicePool(amount, sides = 20) {
  return Array.from({ length: amount }, () => randomDie(sides));
}

async function handleManualDieRoll() {
  const diceCount = clampRollDiceCount(rollDiceCount);
  const dieSides = clampRollDieType(rollDieType);
  const rolls = rollDicePool(diceCount, dieSides);
  const highest = Math.max(...rolls);
  const sum = rolls.reduce((total, value) => total + value, 0);
  const label = `${diceCount}d${dieSides}`;

  setRollResult(
    diceCount > 1
      ? `${label}: maior ${highest} | soma ${sum}`
      : `${label}: ${highest}`
  );

  recordRollHistory({
    kind: "Dado",
    label,
    total: highest,
    detail: diceCount > 1 ? `Maior ${highest} • soma ${sum}` : `Resultado ${highest}`,
    rolls,
  });

  await showRollModal({
    title: label,
    rolls,
    highest,
    bonus: 0,
    total: highest,
    subtitle: diceCount > 1 ? `Soma ${sum}` : "",
    animateRoll: true,
    dieSides,
  });
}

function getTopRollIndices(rolls, count) {
  const sorted = rolls
    .map((value, index) => ({ value, index }))
    .sort((a, b) => (b.value !== a.value ? b.value - a.value : a.index - b.index))
    .slice(0, Math.min(count, rolls.length));
  return new Set(sorted.map((item) => item.index));
}

function getRollHighlightCount(rolls) {
  return rolls.length > 1 ? Math.min(2, rolls.length) : 1;
}

function formatDiceRolls(rolls, highlightCount = 1) {
  const highlighted = getTopRollIndices(rolls, highlightCount);
  return rolls
    .map((value, index) =>
      highlighted.has(index)
        ? `<span class="roll-die-highlight">${value}</span>`
        : `${value}`
    )
    .join(", ");
}

function formatTopRollLabel(rolls) {
  if (!rolls.length) {
    return "-";
  }
  if (rolls.length === 1) {
    return `maior ${rolls[0]}`;
  }
  const sorted = [...rolls].sort((a, b) => b - a);
  const topTwo = sorted.slice(0, 2);
  return `maiores ${topTwo.join(" e ")}`;
}

async function showRollModal({ title, rolls, highest, bonus, total, subtitle = "", animateRoll = true, dieSides = 20 }) {
  const criticalEnabled = dieSides === 20;
  const isCritical = criticalEnabled && rolls.some((value) => value === 20);
  const isFailure = criticalEnabled && !isCritical && highest === 1;
  const sum = rolls.reduce((accumulator, value) => accumulator + value, 0);
  elements.rollModalTitle.textContent = title;
  applyRollOutcomeState(false, false);
  if (elements.rollModalCard) {
    elements.rollModalCard.classList.remove("is-rolling");
  }
  playDiceRollSound();

  const animationSupported = animateRoll && elements.rollSkillAnimation;

  if (animationSupported) {
    elements.rollSkillAnimation.classList.add("active");
    if (elements.rollModalCard) {
      elements.rollModalCard.classList.add("is-rolling");
    }
    elements.rollModalResult.textContent = "Resultado: -";
    elements.rollModalDice.textContent = subtitle ? `${subtitle} • D${dieSides}: -` : `D${dieSides}: -`;
  } else if (elements.rollSkillAnimation) {
    elements.rollSkillAnimation.classList.remove("active");
  }

  elements.rollModal.classList.add("open");
  elements.rollModal.setAttribute("aria-hidden", "false");

  if (animationSupported) {
    const completed = await runSkillDieAnimation(rolls, dieSides);
    if (!completed) {
      return;
    }
  }

  renderRollModalResult({
    rolls,
    highest,
    sum,
    bonus,
    total,
    isCritical,
    isFailure,
  });
  const highlightCount = getRollHighlightCount(rolls);
  const diceMarkup =
    bonus > 0
      ? `D${dieSides}: ${formatDiceRolls(rolls, highlightCount)} + ${bonus}`
      : `D${dieSides}: ${formatDiceRolls(rolls, highlightCount)}`;
  elements.rollModalDice.innerHTML = subtitle
    ? `${escapeHtml(subtitle)}<br>${diceMarkup}`
    : diceMarkup;

  if (elements.rollModalCard) {
    elements.rollModalCard.classList.remove("is-rolling");
  }
  applyRollOutcomeState(isCritical, isFailure);
}

function closeRollModal() {
  elements.rollModal.classList.remove("open");
  elements.rollModal.setAttribute("aria-hidden", "true");
  if (elements.rollModalCard) {
    elements.rollModalCard.classList.remove("is-rolling");
  }
  if (elements.rollSkillAnimation) {
    elements.rollSkillAnimation.classList.remove("active");
    elements.rollSkillAnimation.innerHTML = "";
  }
  stopRollDiceAnimation();
  applyRollOutcomeState(false, false);
}

function triggerSheetTransition() {
  document.body.classList.remove("sheet-transition");
  void document.body.offsetWidth;
  document.body.classList.add("sheet-transition");
  window.setTimeout(() => {
    document.body.classList.remove("sheet-transition");
  }, 360);
}

function triggerMenuButtonAnimation(button) {
  triggerClickGlitch(button);
}

function handleInteractiveGlitchClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const target = event.target.closest(CLICK_GLITCH_SELECTOR);

  if (!target) {
    return;
  }

  if (target instanceof HTMLButtonElement && target.disabled) {
    return;
  }

  triggerClickGlitch(target);
}

function triggerClickGlitch(target, duration = 320) {
  if (!target) {
    return;
  }

  const previousTimer = clickGlitchTimers.get(target);

  if (previousTimer) {
    window.clearTimeout(previousTimer);
  }

  target.classList.remove("clicked");
  void target.offsetWidth;
  target.classList.add("clicked");

  const timer = window.setTimeout(() => {
    target.classList.remove("clicked");
    clickGlitchTimers.delete(target);
  }, duration);

  clickGlitchTimers.set(target, timer);
}

function animateMenuAccessView() {
  if (!elements.menuAccessView) {
    return;
  }

  elements.menuAccessView.classList.remove("entering");
  void elements.menuAccessView.offsetWidth;
  elements.menuAccessView.classList.add("entering");
  window.setTimeout(() => {
    elements.menuAccessView.classList.remove("entering");
  }, 320);
}

function openModeMenu() {
  if (menuTransitionTimer) {
    window.clearTimeout(menuTransitionTimer);
    menuTransitionTimer = null;
  }

  renderCharacterList();
  elements.modeMenu.classList.remove("closing");
  elements.modeMenu.classList.add("open");
  elements.modeMenu.setAttribute("aria-hidden", "false");
  refreshMenuAmbientEffects(true);
}

function closeModeMenu(animated = false) {
  if (!elements.modeMenu.classList.contains("open")) {
    return;
  }

  if (!animated) {
    elements.modeMenu.classList.remove("open", "closing");
    elements.modeMenu.setAttribute("aria-hidden", "true");
    stopMenuAmbientEffects();
    return;
  }

  elements.modeMenu.classList.add("closing");
  elements.modeMenu.setAttribute("aria-hidden", "true");

  if (menuTransitionTimer) {
    window.clearTimeout(menuTransitionTimer);
  }

  menuTransitionTimer = window.setTimeout(() => {
    elements.modeMenu.classList.remove("open", "closing");
    stopMenuAmbientEffects();
    menuTransitionTimer = null;
  }, 240);
}

function setView(view) {
  if (!view) {
    return;
  }

  document.body.setAttribute("data-view", view);
}

function randomD20() {
  return randomDie(20);
}

function clampRollDiceCount(value) {
  if (!Number.isFinite(value)) {
    return 1;
  }
  return Math.min(8, Math.max(1, Math.round(value)));
}

function formatRollDiceCountLabel(value) {
  return value === 1 ? "1 dado" : `${value} dados`;
}

function clampRollDieType(value) {
  const allowed = new Set([4, 6, 8, 10, 12, 20]);
  const parsed = Math.round(Number(value) || 20);
  return allowed.has(parsed) ? parsed : 20;
}

function syncRollDiceControls() {
  const clampedValue = clampRollDiceCount(rollDiceCount);
  const currentDieType = clampRollDieType(rollDieType);

  if (elements.rollDiceCount) {
    elements.rollDiceCount.value = String(clampedValue);
  }

  if (elements.rollDiceDisplay) {
    elements.rollDiceDisplay.textContent = formatRollDiceCountLabel(clampedValue);
  }

  if (elements.rollDiceDecrease) {
    elements.rollDiceDecrease.disabled = clampedValue <= 1;
  }

  if (elements.rollDiceIncrease) {
    elements.rollDiceIncrease.disabled = clampedValue >= 8;
  }

  if (elements.rollDieType) {
    elements.rollDieType.value = String(currentDieType);
  }
}

function setRollDiceCount(value) {
  const nextValue = clampRollDiceCount(value);
  rollDiceCount = nextValue;
  syncRollDiceControls();
  saveRollDiceCount(nextValue);
}

function setRollDieType(value) {
  rollDieType = clampRollDieType(value);
  syncRollDiceControls();
  saveRollDieType(rollDieType);
}

function loadRollDiceCount() {
  try {
    const raw = localStorage.getItem(ROLL_DICE_COUNT_KEY);
    return clampRollDiceCount(readNumber(raw) ?? 1);
  } catch {
    return 1;
  }
}

function saveRollDiceCount(value) {
  try {
    localStorage.setItem(ROLL_DICE_COUNT_KEY, String(clampRollDiceCount(value)));
  } catch {
    // Ignore localStorage errors.
  }
}

function loadRollDieType() {
  try {
    const raw = localStorage.getItem(ROLL_DIE_TYPE_KEY);
    return clampRollDieType(readNumber(raw) ?? 20);
  } catch {
    return 20;
  }
}

function saveRollDieType(value) {
  try {
    localStorage.setItem(ROLL_DIE_TYPE_KEY, String(clampRollDieType(value)));
  } catch {
    // Ignore localStorage errors.
  }
}

function loadLayoutModePreference() {
  try {
    const raw = String(localStorage.getItem(LAYOUT_MODE_KEY) || "").trim();
    if (raw === "mobile" || raw === "desktop") {
      return raw;
    }
  } catch {
    // Ignore localStorage errors.
  }

  return window.matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop";
}

function getEffectiveLayoutMode() {
  if (layoutModePreference === "mobile" || window.matchMedia("(max-width: 760px)").matches) {
    return "mobile";
  }
  return "desktop";
}

function updateLayoutModeToggle() {
  if (!elements.layoutModeToggle) {
    return;
  }

  const activeMode = getEffectiveLayoutMode();
  const isMobile = activeMode === "mobile";
  const isSmallViewport = window.matchMedia("(max-width: 760px)").matches;
  elements.layoutModeToggle.textContent = "";
  elements.layoutModeToggle.dataset.mode = activeMode;
  elements.layoutModeToggle.setAttribute(
    "aria-label",
    isMobile ? "Modo celular ativo" : "Modo computador ativo"
  );
  elements.layoutModeToggle.title = isMobile
    ? (isSmallViewport
      ? "Modo celular ativo."
      : "Modo celular ativo. Clique para voltar ao layout de PC.")
    : "Modo computador ativo. Clique para usar o layout de celular.";
}

function applyLayoutModePreference() {
  if (!document.body) {
    return;
  }

  document.body.classList.toggle("layout-mobile", getEffectiveLayoutMode() === "mobile");
  updateLayoutModeToggle();
}

function saveLayoutModePreference() {
  try {
    localStorage.setItem(LAYOUT_MODE_KEY, layoutModePreference);
  } catch {
    // Ignore localStorage errors.
  }
}

function toggleLayoutModePreference() {
  if (window.matchMedia("(max-width: 760px)").matches) {
    applyLayoutModePreference();
    pushUiToast("Neste tamanho de tela, o layout vertical já fica ativo.", "status", 1800);
    return;
  }

  layoutModePreference = getEffectiveLayoutMode() === "mobile" ? "desktop" : "mobile";
  saveLayoutModePreference();
  applyLayoutModePreference();
  pushUiToast(
    getEffectiveLayoutMode() === "mobile"
      ? "Layout de celular ativo."
      : "Layout de computador ativo.",
    "status",
    1800
  );
}

function stopRollDiceAnimation() {
  activeRollAnimationToken += 1;
  activeRollAnimationTimers.forEach((timer) => window.clearInterval(timer));
  activeRollAnimationTimers = [];
}

function getRollDieShapeClass(sides = 20) {
  const shapeMap = {
    4: "die-shape-d4",
    6: "die-shape-d6",
    8: "die-shape-d8",
    10: "die-shape-d10",
    12: "die-shape-d12",
    20: "die-shape-d20",
  };
  return shapeMap[sides] || "die-shape-d20";
}

function getRollDieShellMarkup(sides = 20) {
  const markupMap = {
    4: `
      <svg class="roll-skill-shell" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <polygon points="50,8 84,52 50,92 16,52"></polygon>
        <path d="M50 8V92"></path>
        <path d="M16 52H84"></path>
      </svg>
    `,
    6: `
      <svg class="roll-skill-shell" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <path d="M28 30L28 70L66 70L66 30Z"></path>
        <path d="M28 30L44 16H82L66 30"></path>
        <path d="M66 30L82 16V56L66 70"></path>
        <path d="M82 16V56"></path>
      </svg>
    `,
    8: `
      <svg class="roll-skill-shell" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <polygon points="50,8 84,40 50,92 16,40"></polygon>
        <path d="M50 8V92"></path>
        <path d="M16 40L50 58L84 40"></path>
      </svg>
    `,
    10: `
      <svg class="roll-skill-shell" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <polygon points="50,6 80,34 68,86 32,86 20,34"></polygon>
        <path d="M50 6V86"></path>
        <path d="M20 34L50 52L80 34"></path>
      </svg>
    `,
    12: `
      <svg class="roll-skill-shell" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <polygon points="50,8 72,14 86,32 82,60 64,84 36,84 18,60 14,32 28,14"></polygon>
        <path d="M28 14L50 32L72 14"></path>
        <path d="M14 32L34 50L18 60"></path>
        <path d="M86 32L66 50L82 60"></path>
        <path d="M36 84L34 50L64 84L66 50"></path>
      </svg>
    `,
    20: `
      <svg class="roll-skill-shell" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <polygon points="50,6 76,16 90,34 84,64 62,90 38,90 16,64 10,34 24,16"></polygon>
        <path d="M50 6L50 90"></path>
        <path d="M24 16L50 34L76 16"></path>
        <path d="M10 34L32 50L16 64"></path>
        <path d="M90 34L68 50L84 64"></path>
        <path d="M32 50H68"></path>
        <path d="M38 90L32 50L62 90L68 50"></path>
      </svg>
    `,
  };
  return markupMap[sides] || markupMap[20];
}

function setRollDieValue(die, value) {
  const valueNode = die.querySelector(".roll-skill-value");
  if (valueNode) {
    valueNode.textContent = String(value);
  }
}

function buildRollDie(sides = 20, value = sides) {
  const die = document.createElement("div");
  die.className = `roll-skill-die ${getRollDieShapeClass(sides)}`;
  die.dataset.dieSides = String(sides);
  die.innerHTML = `${getRollDieShellMarkup(sides)}<span class="roll-skill-value">${String(value)}</span>`;
  return die;
}

async function runSkillDieAnimation(rolls, dieSides = 20) {
  if (!elements.rollSkillAnimation) {
    return false;
  }

  stopRollDiceAnimation();

  const animationToken = activeRollAnimationToken;
  const highlightCount = getRollHighlightCount(rolls);
  const topRollIndices = getTopRollIndices(rolls, highlightCount);
  const highest = Math.max(...rolls);
  const criticalEnabled = dieSides === 20;
  const isCritical = criticalEnabled && rolls.some((value) => value === 20);
  const isFailure = criticalEnabled && !isCritical && highest === 1;

  elements.rollSkillAnimation.innerHTML = "";

  const diceNodes = rolls.map((_, index) => {
    const die = buildRollDie(dieSides, randomDie(dieSides));
    die.classList.add("rolling");
    elements.rollSkillAnimation.appendChild(die);

    const timer = window.setInterval(() => {
      setRollDieValue(die, randomDie(dieSides));
    }, 58 + (index % 4) * 11);

    activeRollAnimationTimers.push(timer);
    return die;
  });

  await wait(900);

  if (animationToken !== activeRollAnimationToken) {
    return false;
  }

  activeRollAnimationTimers.forEach((timer) => window.clearInterval(timer));
  activeRollAnimationTimers = [];

  diceNodes.forEach((die, index) => {
    const finalValue = rolls[index];
    die.classList.remove("rolling");
    die.classList.add("landing");
    setRollDieValue(die, finalValue);

    if (topRollIndices.has(index)) {
      die.classList.add("top-roll");
    }
    if (criticalEnabled && finalValue === 20) {
      die.classList.add("critical");
    } else if (isFailure) {
      die.classList.add("failure");
    }

    window.setTimeout(() => {
      if (animationToken === activeRollAnimationToken) {
        triggerClickGlitch(die, isCritical || isFailure ? 420 : 280);
      }
    }, 220 + index * 36);
  });

  await wait(isCritical || isFailure ? 520 : 420);
  return animationToken === activeRollAnimationToken;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function playDiceRollSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    if (!diceAudioContext) {
      diceAudioContext = new AudioContextClass();
    }

    if (diceAudioContext.state === "suspended") {
      void diceAudioContext.resume();
    }

    const now = diceAudioContext.currentTime;
    const oscillator = diceAudioContext.createOscillator();
    const gain = diceAudioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(260, now);
    oscillator.frequency.exponentialRampToValueAtTime(95, now + 0.23);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    oscillator.connect(gain);
    gain.connect(diceAudioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.26);
  } catch {
    // Ignore audio failures on unsupported environments.
  }
}

function renderRollModalResult({ rolls, highest, sum, bonus, total, isCritical, isFailure }) {
  const bonusText = bonus > 0 ? `+${bonus}` : "";
  const highestValueClass = isCritical ? "critical-number" : isFailure ? "failure-number" : "";
  const highestValueMarkup = highestValueClass
    ? `<span class="${highestValueClass}">${highest}</span>`
    : `<span>${highest}</span>`;
  const outcomeTag = isCritical
    ? '<span class="roll-tag-critical">CRÍTICO</span>'
    : isFailure
      ? '<span class="roll-tag-failure">FALHA CRÍTICA</span>'
      : "";

  if (rolls.length > 1) {
    elements.rollModalResult.innerHTML = `
      <span class="roll-result-main">
        Maior: ${highestValueMarkup}${bonusText ? `${bonusText}=${total}` : ""}
        ${outcomeTag}
      </span>
      <span class="roll-result-sub">Soma: ${sum}</span>
    `;
    return;
  }

  if (isCritical) {
    elements.rollModalResult.innerHTML =
      `Resultado: <span class="critical-number">${highest}</span>${bonusText}=${total} <span class="roll-tag-critical">CRÍTICO</span>`;
    return;
  }

  if (isFailure) {
    elements.rollModalResult.innerHTML =
      `Resultado: <span class="failure-number">${highest}</span>${bonusText}=${total} <span class="roll-tag-failure">FALHA CRÍTICA</span>`;
    return;
  }

  elements.rollModalResult.textContent = `Resultado: ${highest}${bonusText}=${total}`;
}

function applyRollOutcomeState(isCritical, isFailure) {
  if (!elements.rollModalCard || !elements.rollModalResult) {
    return;
  }

  elements.rollModalCard.classList.remove("critical", "failure");
  elements.rollModalResult.classList.remove("critical", "failure");

  if (isCritical) {
    void elements.rollModalCard.offsetWidth;
    elements.rollModalCard.classList.add("critical");
    elements.rollModalResult.classList.add("critical");
    return;
  }

  if (isFailure) {
    void elements.rollModalCard.offsetWidth;
    elements.rollModalCard.classList.add("failure");
    elements.rollModalResult.classList.add("failure");
  }
}

function clearCardHighlight() {
  if (!elements.menuCharactersList) {
    return;
  }
  const active = elements.menuCharactersList.querySelector(".menu-character-card.active");
  if (active) {
    active.classList.remove("active");
  }
}

function highlightCurrentCard() {
  if (!elements.menuCharactersList) {
    return;
  }

  const cards = elements.menuCharactersList.querySelectorAll(".menu-character-card");
  cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.id === editingId);
  });
}

function formatTrack(track) {
  if (!track || track.max === null || track.max === undefined) {
    return "-/-";
  }
  return `${track.current}/${track.max}`;
}

function updateCurrentShareActions() {
  if (!elements.shareMasterCurrent) {
    return;
  }

  updateInActionToggle();

  if (editorMode === "master") {
    elements.shareMasterCurrent.classList.add("hidden");
    updateMasterEditorStatus();
    return;
  }

  elements.shareMasterCurrent.classList.remove("hidden");
  const character = characters.find((item) => item.id === editingId) || null;
  elements.shareMasterCurrent.textContent = character?.masterShareId
    ? "Atualizar Mestre"
    : "Enviar ao Mestre";
}

async function shareCharacterByLink(characterId) {
  const character = characters.find((item) => item.id === characterId);
  if (!character) {
    return;
  }

  const shareLink = buildCharacterShareLink(character);
  const copied = await copyToClipboard(shareLink);

  if (copied) {
    alert("Link do registro copiado para a area de transferencia.");
    return;
  }

  window.prompt("Copie o link do registro:", shareLink);
}

async function shareDiarySessionByLink(sessionId) {
  const session = getDiarySessionById(sessionId);
  if (!session) {
    return;
  }

  const shareLink = buildDiarySessionShareLink(session);
  const copied = await copyToClipboard(shareLink);

  if (copied) {
    alert("Link da sessão copiado para a área de transferência.");
    return;
  }

  window.prompt("Copie o link da sessão:", shareLink);
}

async function shareCharacterToMaster(characterId) {
  const index = characters.findIndex((item) => item.id === characterId);
  if (index === -1) {
    return;
  }

  let character = characters[index];
  if (!character.masterShareId) {
    character = {
      ...character,
      masterShareId: generateId(),
      masterSharedAt: new Date().toISOString(),
    };
    characters[index] = character;
    saveCharacters(characters);
  }

  selectedMasterShareId = character.masterShareId;
  const sharedRecord = upsertMasterShare(character);
  renderCharacterList();
  updateCurrentShareActions();

  if (sharedRecord && firebaseReady) {
    alert(`Registro de "${character.name}" enviado ao mestre e sincronizado entre dispositivos.`);
    return;
  }

  const shareLink = buildMasterShareLink(character);
  const copied = await copyToClipboard(shareLink);

  if (copied) {
    alert(`Registro de "${character.name}" enviado ao modo mestre. Link do mestre copiado.`);
    return;
  }

  window.prompt("Copie o link do mestre:", shareLink);
}

function buildCharacterShareLink(character) {
  const encoded = encodeSharePayload(
    JSON.stringify(buildSharedCharacterSnapshot(character, {
      includeProfileImage: false,
      includeInventoryImages: false,
      compactShare: true,
    }))
  );
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = `share=${encoded}`;
  return shareUrl.toString();
}

function buildMasterShareLink(character) {
  const encoded = encodeSharePayload(
    JSON.stringify(buildMasterSharePayload(character, {
      includeProfileImage: false,
      includeInventoryImages: false,
      compactShare: true,
    }))
  );
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = `masterShare=${encoded}`;
  return shareUrl.toString();
}

function buildDiarySessionShareLink(session) {
  const encoded = encodeSharePayload(JSON.stringify({
    type: "diary-session",
    session: {
      title: session.title || "",
      summary: session.summary || "",
      details: session.details || "",
      sequence: session.sequence || 0,
    },
  }));
  const shareUrl = new URL(window.location.href);
  shareUrl.hash = `diaryShare=${encoded}`;
  return shareUrl.toString();
}

function normalizeShareOptions(options = {}) {
  if (typeof options === "boolean") {
    return {
      includeProfileImage: options,
      includeInventoryImages: options,
      compactShare: false,
    };
  }

  return {
    includeProfileImage: Boolean(options.includeProfileImage),
    includeInventoryImages: Boolean(options.includeInventoryImages),
    compactShare: Boolean(options.compactShare),
  };
}

function sanitizeInventoryForShare(items, includeImages = false) {
  return Array.isArray(items)
    ? items.map((item) => ({
      ...item,
      image: includeImages ? (item?.image || "") : "",
    }))
    : [];
}

function sanitizeCombatForShare(combat, compactShare = false) {
  const baseCombat = combat && typeof combat === "object" ? combat : {};
  if (!compactShare) {
    return baseCombat;
  }

  return {
    ...baseCombat,
    battleNotes: "",
    encounterTitle: "",
    encounterNotes: "",
    initiativeEntries: [],
    activeInitiativeId: "",
    rollHistory: [],
  };
}

function sanitizeUiForShare(ui, compactShare = false) {
  const baseUi = ui && typeof ui === "object" ? ui : {};
  if (!compactShare) {
    return baseUi;
  }

  return {
    readMode: Boolean(baseUi.readMode),
    inAction: Boolean(baseUi.inAction),
    changeHistory: [],
  };
}

function buildSharedCharacterSnapshot(character, options = {}) {
  const shareOptions = normalizeShareOptions(options);
  return {
    id: character.id || generateId(),
    masterShareId: character.masterShareId || "",
    masterSharedAt: character.masterSharedAt || "",
    name: character.name || "",
    birthdate: character.birthdate || "",
    origin: character.origin || "",
    height: character.height || "",
    weight: character.weight || "",
    class: character.class || "",
    trail: character.trail || "",
    appearance: character.appearance || "",
    personality: character.personality || "",
    internalConflict: character.internalConflict || "",
    motivation: character.motivation || "",
    profileImage: shareOptions.includeProfileImage ? character.profileImage || "" : "",
    profileImageFit: normalizeImageFit(character.profileImageFit),
    profileImagePositionX: normalizeProfileImagePosition(character.profileImagePositionX),
    profileImagePositionY: normalizeProfileImagePosition(character.profileImagePositionY),
    profileImageZoom: normalizeProfileImageZoom(character.profileImageZoom),
    profileFrameShape: normalizeProfileFrameShape(character.profileFrameShape),
    attributes: character.attributes || {},
    resources: character.resources || {},
    combat: sanitizeCombatForShare(character.combat || {}, shareOptions.compactShare),
    ui: sanitizeUiForShare(character.ui || {}, shareOptions.compactShare),
    inventory: sanitizeInventoryForShare(character.inventory, shareOptions.includeInventoryImages),
    skillRanks: character.skillRanks || {},
    updatedAt: character.updatedAt || new Date().toISOString(),
  };
}

function buildMasterSharePayload(character, options = true) {
  const shareOptions = normalizeShareOptions(options);
  const existingRecord = masterShares.find((record) => (
    record.shareId === character.masterShareId
    || record.sourceCharacterId === character.id
  )) || null;
  return {
    shareId: character.masterShareId || generateId(),
    sourceCharacterId: character.id || generateId(),
    sharedAt: character.masterSharedAt || new Date().toISOString(),
    updatedAt: character.updatedAt || new Date().toISOString(),
    ownerUid: firebaseUser?.uid || existingRecord?.ownerUid || "",
    assignedRoomId: existingRecord?.assignedRoomId || "",
    assignedRoomTitle: existingRecord?.assignedRoomTitle || "",
    assignedAt: existingRecord?.assignedAt || "",
    snapshot: buildSharedCharacterSnapshot(character, shareOptions),
  };
}

function syncCharacterToMaster(character) {
  if (!character?.masterShareId) {
    return;
  }

  upsertMasterShare(character);
}

function upsertMasterShare(recordOrCharacter) {
  const incoming = recordOrCharacter?.snapshot
    ? migrateMasterShareRecord(recordOrCharacter)
    : migrateMasterShareRecord(buildMasterSharePayload(recordOrCharacter, true));

  if (!incoming) {
    return null;
  }

  const existingIndex = masterShares.findIndex((item) => item.shareId === incoming.shareId);
  if (existingIndex === -1) {
    masterShares.push(incoming);
  } else {
    masterShares[existingIndex] = mergeMasterShareRecords(masterShares[existingIndex], incoming);
  }

  selectedMasterShareId = incoming.shareId;
  saveMasterShares(masterShares);
  void syncMasterShareRecordToFirebase(incoming);
  refreshMasterViews();
  return incoming;
}

function removeMasterShare(shareId) {
  if (!shareId) {
    return;
  }

  masterShares = masterShares.filter((item) => item.shareId !== shareId);
  if (selectedMasterShareId === shareId) {
    selectedMasterShareId = masterShares[0]?.shareId || null;
  }
  saveMasterShares(masterShares);
  void removeMasterShareFromFirebase(shareId);
  refreshMasterViews();
}

function mergeMasterShareRecords(existing, incoming) {
  const mergedSnapshot = {
    ...(existing?.snapshot || {}),
    ...(incoming?.snapshot || {}),
  };

  if (!incoming?.snapshot?.profileImage && existing?.snapshot?.profileImage) {
    mergedSnapshot.profileImage = existing.snapshot.profileImage;
  }
  if (!incoming?.snapshot?.profileImageFit && existing?.snapshot?.profileImageFit) {
    mergedSnapshot.profileImageFit = existing.snapshot.profileImageFit;
  }
  mergedSnapshot.masterShareId = incoming?.shareId || incoming?.snapshot?.masterShareId || existing?.snapshot?.masterShareId || "";
  mergedSnapshot.masterSharedAt = incoming?.sharedAt || incoming?.snapshot?.masterSharedAt || existing?.snapshot?.masterSharedAt || "";

  const hasIncomingAssignedRoomId = Object.prototype.hasOwnProperty.call(incoming || {}, "assignedRoomId");
  const hasIncomingAssignedRoomTitle = Object.prototype.hasOwnProperty.call(incoming || {}, "assignedRoomTitle");
  const hasIncomingAssignedAt = Object.prototype.hasOwnProperty.call(incoming || {}, "assignedAt");

  return {
    shareId: incoming.shareId,
    sourceCharacterId: incoming.sourceCharacterId || existing?.sourceCharacterId || "",
    sharedAt: existing?.sharedAt || incoming.sharedAt,
    updatedAt: incoming.updatedAt,
    ownerUid: incoming?.ownerUid || existing?.ownerUid || "",
    assignedRoomId: hasIncomingAssignedRoomId ? String(incoming.assignedRoomId || "").trim() : String(existing?.assignedRoomId || "").trim(),
    assignedRoomTitle: hasIncomingAssignedRoomTitle ? String(incoming.assignedRoomTitle || "").trim() : String(existing?.assignedRoomTitle || "").trim(),
    assignedAt: hasIncomingAssignedAt ? String(incoming.assignedAt || "").trim() : String(existing?.assignedAt || "").trim(),
    snapshot: mergedSnapshot,
  };
}

function updateMasterShareAssignment(shareId, assignment = {}) {
  const index = masterShares.findIndex((item) => item.shareId === shareId);
  if (index === -1) {
    return null;
  }

  const currentRecord = masterShares[index];
  const incomingRecord = migrateMasterShareRecord({
    ...currentRecord,
    ownerUid: assignment.ownerUid ?? currentRecord.ownerUid ?? "",
    assignedRoomId: assignment.assignedRoomId ?? "",
    assignedRoomTitle: assignment.assignedRoomTitle ?? "",
    assignedAt: assignment.assignedAt ?? "",
    updatedAt: assignment.updatedAt ?? new Date().toISOString(),
    snapshot: {
      ...(currentRecord.snapshot || {}),
      masterShareId: currentRecord.shareId,
      masterSharedAt: currentRecord.sharedAt || currentRecord.snapshot?.masterSharedAt || new Date().toISOString(),
    },
  });

  if (!incomingRecord) {
    return null;
  }

  const mergedRecord = mergeMasterShareRecords(currentRecord, incomingRecord);
  masterShares[index] = mergedRecord;
  saveMasterShares(masterShares);
  void syncMasterShareRecordToFirebase(mergedRecord);
  refreshMasterViews();
  return mergedRecord;
}

function syncLocalCharacterFromMasterRecord(record) {
  const index = characters.findIndex((item) =>
    item.masterShareId === record.shareId || item.id === record.sourceCharacterId
  );

  if (index === -1) {
    return;
  }

  const existing = characters[index];
  if (
    existing.masterShareId === record.shareId
    && String(existing.updatedAt || "") === String(record.updatedAt || "")
  ) {
    return;
  }

  const updatedCharacter = {
    ...existing,
    ...record.snapshot,
    id: existing.id,
    createdAt: existing.createdAt,
    masterShareId: record.shareId,
    masterSharedAt: record.sharedAt,
    updatedAt: record.updatedAt,
  };

  characters[index] = updatedCharacter;
  saveCharacters(characters);
  renderCharacterList();
  updateCurrentShareActions();

  if (editorMode === "character" && editingId === updatedCharacter.id) {
    applyCharacterDataToForm(updatedCharacter);
    highlightCurrentCard();
  }

  const participantSnapshot = firebaseUser?.uid
    ? currentRoomData?.participants?.[firebaseUser.uid]?.snapshot || null
    : null;
  const shouldSyncParticipant = Boolean(
    currentRoomId
    && onlineCharacterId === updatedCharacter.id
    && (
      participantSnapshot?.id === updatedCharacter.id
      || participantSnapshot?.masterShareId === record.shareId
      || editingId === updatedCharacter.id
    )
  );

  if (shouldSyncParticipant) {
    void syncCurrentRoomParticipant(updatedCharacter);
  }
}

function refreshMasterViews() {
  renderCharacterList();
  renderMasterCharacterList();
  renderMasterCharacterDetail();
  renderMasterSheetSwitcher();
  renderMasterInventoryScreen();

  if (editorMode !== "master") {
    return;
  }

  const active = masterShares.find((item) => item.shareId === editingMasterShareId)
    || masterShares.find((item) => item.shareId === selectedMasterShareId)
    || masterShares[0]
    || null;

  if (!active) {
    editingMasterShareId = null;
    resetForm();
    setEditorMode("master");
    updateMasterEditorStatus("Nenhum registro compartilhado para o mestre ainda.");
    return;
  }

  editingMasterShareId = active.shareId;
  selectedMasterShareId = active.shareId;
  applyCharacterDataToForm(active.snapshot || {});
  updateMasterEditorStatus();
}

function encodeSharePayload(rawText) {
  const bytes = new TextEncoder().encode(rawText);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeSharePayload(encodedText) {
  const base64 = encodedText.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(base64 + padding);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function importSharedStateFromLink() {
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  const params = new URLSearchParams(hash);
  const masterShare = params.get("masterShare");
  const shared = params.get("share");
  const diaryShare = params.get("diaryShare");

  if (masterShare) {
    stageMasterShareFromLink(masterShare);
    return;
  }

  if (diaryShare) {
    importDiarySessionFromSharedLink(diaryShare);
    return;
  }

  if (shared) {
    importCharacterFromSharedLink(shared);
  }
}

function importCharacterFromSharedLink(encodedPayload = null) {
  const shared = encodedPayload || new URLSearchParams(window.location.hash.slice(1)).get("share");

  if (!shared) {
    return;
  }

  try {
    const decoded = decodeSharePayload(shared);
    const parsed = JSON.parse(decoded);
    const migrated = migrateCharacter({
      ...parsed,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!migrated) {
      throw new Error("Registro compartilhado invalido.");
    }

    const shouldImport = confirm(
      `Importar registro compartilhado de "${migrated.name || "Personagem"}"?`
    );

    clearShareHash();
    if (!shouldImport) {
      return;
    }

    characters.push(migrated);
    saveCharacters(characters);
    renderCharacterList();
    showMenuAccess();
    alert("Registro compartilhado importado com sucesso.");
  } catch {
    clearShareHash();
    alert("Não foi possível ler esse link de compartilhamento.");
  }
}

function importDiarySessionFromSharedLink(encodedPayload = null) {
  const shared = encodedPayload || new URLSearchParams(window.location.hash.slice(1)).get("diaryShare");

  if (!shared) {
    return;
  }

  try {
    const decoded = decodeSharePayload(shared);
    const parsed = JSON.parse(decoded);
    const payload = normalizeDiarySession({
      ...(parsed?.session || {}),
      id: generateId(),
      linkedCharacterIds: [],
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const shouldImport = confirm(
      `Importar sessão compartilhada "${payload.title || "Sessão"}"?`
    );

    clearShareHash();
    if (!shouldImport) {
      return;
    }

    campaignDiary = {
      sessions: [payload, ...getDiarySessions()].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)),
      updatedAt: new Date().toISOString(),
    };
    saveCampaignDiary(campaignDiary);
    selectedDiarySessionId = payload.id;
    diaryEditorDraft = null;
    diaryEditorSessionId = null;
    openModeMenu();
    showMenuDiary();
    alert("Sessão compartilhada importada com sucesso.");
  } catch {
    clearShareHash();
    alert("Não foi possível ler esse link de sessão.");
  }
}

function stageMasterShareFromLink(encodedPayload) {
  try {
    const decoded = decodeSharePayload(encodedPayload);
    const parsed = JSON.parse(decoded);
    const staged = migrateMasterShareRecord(parsed);

    if (!staged) {
      throw new Error("Registro de mestre invalido.");
    }

    pendingMasterShare = staged;
    clearShareHash();
    openModeMenu();

    if (masterUnlocked) {
      importPendingMasterShare(true);
      showMasterDashboard();
      return;
    }

    showMasterLockView(`Registro de "${staged.snapshot.name || "Personagem"}" pronto para importar.`);
  } catch {
    clearShareHash();
    alert("Não foi possível ler esse link do mestre.");
  }
}

function importPendingMasterShare(showAlert = false) {
  if (!pendingMasterShare) {
    return null;
  }

  const imported = pendingMasterShare;
  pendingMasterShare = null;
  const existingIndex = masterShares.findIndex((item) => item.shareId === imported.shareId);

  if (existingIndex === -1) {
    masterShares.push(imported);
  } else {
    masterShares[existingIndex] = mergeMasterShareRecords(masterShares[existingIndex], imported);
  }

  selectedMasterShareId = imported.shareId;
  saveMasterShares(masterShares);
  refreshMasterViews();

  if (showAlert) {
    alert(`Registro de "${imported.snapshot.name || "Personagem"}" adicionado ao modo mestre.`);
  }

  return imported;
}

function handleStorageEvent(event) {
  if (event.key === STORAGE_KEY) {
    characters = loadCharacters();
    renderCharacterList();
    updateCurrentShareActions();
    window.refreshLinkedTabletopTokens?.();

    if (editingId && !characters.some((item) => item.id === editingId)) {
      resetForm();
    }
    return;
  }

  if (event.key === MASTER_SHARE_STORAGE_KEY) {
    masterShares = loadMasterShares();
    refreshMasterViews();
    return;
  }

  if (event.key === MASTER_NPC_STORAGE_KEY) {
    masterNpcs = loadMasterNpcs();
    if (!masterNpcs.some((npc) => npc.id === editingNpcId)) {
      editingNpcId = masterNpcs[0]?.id || null;
    }
    renderMasterNpcList();
    renderMasterNpcEditor();
    window.refreshLinkedTabletopTokens?.();
    return;
  }

  if (event.key === MASTER_INVENTORY_STORAGE_KEY) {
    masterInventoryTemplates = loadMasterInventoryTemplates();
    ensureSelectedMasterInventoryTemplate();
    renderMasterInventoryScreen();
    return;
  }

  if (event.key === CAMPAIGN_DIARY_STORAGE_KEY) {
    campaignDiary = loadCampaignDiary();
    if (!getDiarySessions().some((session) => session.id === selectedDiarySessionId)) {
      selectedDiarySessionId = getDiarySessions()[0]?.id || null;
    }
    renderCampaignDiary();
    return;
  }

  if (event.key === MASTER_SECRET_NOTES_STORAGE_KEY) {
    masterSecretNotes = loadMasterSecretNotes();
    renderMasterCharacterDetail();
  }
}

function handleMasterSyncMessage() {
  masterShares = loadMasterShares();
  masterInventoryTemplates = loadMasterInventoryTemplates();
  refreshMasterViews();
}

function createMasterSyncChannel() {
  try {
    if (typeof BroadcastChannel !== "function") {
      return null;
    }

    return new BroadcastChannel(MASTER_SYNC_CHANNEL_NAME);
  } catch {
    return null;
  }
}

function isMasterLive(updatedAt) {
  const updatedTime = new Date(updatedAt).getTime();
  if (Number.isNaN(updatedTime)) {
    return false;
  }
  return Date.now() - updatedTime <= 10000;
}

function formatDisplayDate(dateInput) {
  if (!dateInput) {
    return "-";
  }

  const date = new Date(`${dateInput}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("pt-BR");
}

function formatDateTime(dateInput) {
  if (!dateInput) {
    return "-";
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("pt-BR");
}

function formatMasterUpdatedAt(updatedAt) {
  return `Atualizado ${formatDateTime(updatedAt)}`;
}

function normalizeImageFit(value, fallback = "cover") {
  const rawValue = String(value || "").toLowerCase();
  if (IMAGE_FIT_VALUES.has(rawValue)) {
    return rawValue;
  }
  return IMAGE_FIT_VALUES.has(String(fallback || "").toLowerCase())
    ? String(fallback).toLowerCase()
    : "cover";
}

function applyImageFitToElement(element, fit, cssVariable = "--image-fit") {
  if (!element?.style) {
    return;
  }
  element.style.setProperty(cssVariable, normalizeImageFit(fit));
}

function getTrailDescription(selectedClass, selectedTrail) {
  if (!selectedClass || !selectedTrail) {
    return "";
  }

  const trail = trailsByClass[selectedClass]?.find((item) => item.name === selectedTrail);
  return trail?.description || "";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clearShareHash() {
  const cleanUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", cleanUrl);
}

async function copyToClipboard(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(textarea);
  return copied;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function loadCharacters() {
  let parsedCollection = [];
  let sourceKey = STORAGE_KEY;
  let sawAnyCollection = false;
  let sawStoredCharacters = false;
  let parseFailed = false;

  try {
    for (const candidateKey of getCharacterStorageCandidates()) {
      const raw = localStorage.getItem(candidateKey);
      if (!raw) {
        continue;
      }

      sawStoredCharacters = true;

      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (error) {
        console.error(error);
        parseFailed = true;
        continue;
      }

      const collection = parseStoredCharacterCollection(parsed);
      if (collection.length > 0) {
        parsedCollection = collection;
        sourceKey = candidateKey;
        break;
      }

      if (!sawAnyCollection && (Array.isArray(parsed) || (parsed && typeof parsed === "object"))) {
        parsedCollection = collection;
        sourceKey = candidateKey;
        sawAnyCollection = true;
      }
    }

    const migrated = parsedCollection
      .map((character) => migrateCharacter(character))
      .filter((character) => character !== null);

    const shouldRecoverFromSafetyBackup = (!sawAnyCollection && parseFailed)
      || (parsedCollection.length > 0 && migrated.length === 0);

    if (shouldRecoverFromSafetyBackup) {
      const recovered = recoverCharactersFromSafetyBackup();
      if (recovered.length > 0) {
        queueStartupToast("Os registros salvos foram recuperados a partir do backup de segurança.", "status");
        persistCharactersWithRecovery(recovered);
        return recovered;
      }

      if (parseFailed || parsedCollection.length > 0) {
        queueStartupToast("Alguns registros locais não puderam ser lidos.", "danger");
      }
    }

    const needsRewrite = sourceKey !== STORAGE_KEY
      || migrated.length !== parsedCollection.length
      || migrated.some((character, index) => {
        const original = parsedCollection[index];
        return !original
          || original.id !== character.id
          || original.createdAt !== character.createdAt
          || original.updatedAt !== character.updatedAt;
      });

    if (needsRewrite) {
      persistCharactersWithRecovery(migrated);
    }

    return migrated;
  } catch (error) {
    console.error(error);
    const recovered = recoverCharactersFromSafetyBackup();
    if (recovered.length > 0) {
      queueStartupToast("Os registros salvos foram recuperados a partir do backup de segurança.", "status");
      try {
        persistCharactersWithRecovery(recovered);
      } catch {
        // Ignore rewrite failure and return the recovered data in memory.
      }
      return recovered;
    }

    queueStartupToast("Não foi possível carregar os registros locais.", "danger");
    return [];
  }
}

function loadMasterNpcs() {
  try {
    const raw = localStorage.getItem(MASTER_NPC_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((npc) => normalizeMasterNpc(npc))
      .filter((npc) => npc !== null);
  } catch {
    return [];
  }
}

function loadMasterShares() {
  try {
    const raw = localStorage.getItem(MASTER_SHARE_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((record) => migrateMasterShareRecord(record))
      .filter((record) => record !== null);
  } catch {
    return [];
  }
}

function loadMasterSecretNotes() {
  try {
    const raw = localStorage.getItem(MASTER_SECRET_NOTES_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function normalizeMenuEventSettings(settings) {
  const customFramesSource = Array.isArray(settings?.customFrames)
    ? settings.customFrames
    : String(settings?.customFramesText || settings?.frames || "")
      .split(/\r?\n/);

  const customFrames = customFramesSource
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .filter((value, index, list) => list.findIndex((item) => normalize(item) === normalize(value)) === index)
    .slice(0, 20);

  return {
    enabled: settings?.enabled !== false,
    forceActive: Boolean(settings?.forceActive),
    customFrames,
    updatedAt: typeof settings?.updatedAt === "string" ? settings.updatedAt : "",
  };
}

function loadMenuEventSettings() {
  try {
    const raw = localStorage.getItem(MASTER_MENU_EVENT_SETTINGS_KEY);
    const parsed = JSON.parse(raw || "null");
    return normalizeMenuEventSettings(parsed || DEFAULT_MENU_EVENT_SETTINGS);
  } catch {
    return { ...DEFAULT_MENU_EVENT_SETTINGS };
  }
}

function saveMenuEventSettings(settings) {
  try {
    persistJsonWithRecovery(
      MASTER_MENU_EVENT_SETTINGS_KEY,
      normalizeMenuEventSettings(settings)
    );
    recordSafetyBackup("menu-event-settings");
  } catch (error) {
    console.error(error);
    pushUiToast("Não foi possível salvar o evento de novembro.", "danger", 3200);
  }
}

function normalizeDiarySession(session) {
  const now = new Date().toISOString();
  const parsedSequence = Number.parseInt(String(session?.sequence ?? ""), 10);
  const fallbackSequence = parseDiarySessionSequence(session?.title);
  return {
    id: typeof session?.id === "string" && session.id ? session.id : generateId(),
    sequence: Number.isNaN(parsedSequence) ? fallbackSequence : parsedSequence,
    title: typeof session?.title === "string" ? session.title : "",
    summary: typeof session?.summary === "string" ? session.summary : "",
    details: typeof session?.details === "string" ? session.details : "",
    linkedCharacterIds: Array.isArray(session?.linkedCharacterIds)
      ? session.linkedCharacterIds.filter((value) => typeof value === "string" && value)
      : [],
    attachments: Array.isArray(session?.attachments)
      ? session.attachments.map((attachment) => normalizeDiaryAttachment(attachment)).filter((attachment) => attachment)
      : [],
    createdAt: typeof session?.createdAt === "string" && session.createdAt ? session.createdAt : now,
    updatedAt: typeof session?.updatedAt === "string" && session.updatedAt ? session.updatedAt : now,
  };
}

function buildLegacyDiaryMigration(parsed) {
  const legacyText = typeof parsed?.text === "string" ? parsed.text.trim() : "";
  const legacyUpdatedAt = typeof parsed?.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString();

  if (!legacyText) {
    return {
      sessions: [],
      updatedAt: legacyUpdatedAt || "",
    };
  }

  const summary = legacyText.split(/\r?\n/).find((line) => line.trim()) || legacyText.slice(0, 140);
  return {
    sessions: [
      normalizeDiarySession({
        id: `legacy-${legacyUpdatedAt || "session"}`,
        sequence: 1,
        title: "Sessao Anterior",
        summary: summary.slice(0, 220),
        details: legacyText,
        createdAt: legacyUpdatedAt,
        updatedAt: legacyUpdatedAt,
      }),
    ],
    updatedAt: legacyUpdatedAt,
  };
}

function loadCampaignDiary() {
  try {
    const raw = localStorage.getItem(CAMPAIGN_DIARY_STORAGE_KEY);
    const parsed = JSON.parse(raw || "{}");

    if (!parsed || typeof parsed !== "object") {
      return { sessions: [], updatedAt: "" };
    }

    if (Array.isArray(parsed.sessions)) {
      return {
        sessions: parsed.sessions.map((session) => normalizeDiarySession(session)),
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
      };
    }

    return buildLegacyDiaryMigration(parsed);
  } catch {
    return { sessions: [], updatedAt: "" };
  }
}

function saveCampaignDiary(data) {
  try {
    persistJsonWithRecovery(CAMPAIGN_DIARY_STORAGE_KEY, {
      sessions: Array.isArray(data?.sessions)
        ? data.sessions.map((session) => normalizeDiarySession(session))
        : [],
      updatedAt: typeof data?.updatedAt === "string" ? data.updatedAt : new Date().toISOString(),
    });
    recordSafetyBackup("campaign-diary");
  } catch (error) {
    console.error(error);
    pushUiToast("Não foi possível salvar os relatórios agora.", "danger", 3200);
  }
}

function migrateCharacter(character) {
  if (!character || typeof character !== "object") {
    return null;
  }

  const baseResources = character.resources || {};
  const combat = character.combat || {};

  const pdMax = pickNumber(baseResources.pdMax, baseResources.pvMax);
  const pdCurrentFallback = pickNumber(baseResources.pdCurrent, baseResources.pvCurrent);
  const pdLost = pickNumber(baseResources.pdLost, lostFromCurrent(pdMax, pdCurrentFallback));

  const sanMax = pickNumber(baseResources.sanMax);
  const sanCurrentFallback = pickNumber(baseResources.sanCurrent);
  const sanLost = pickNumber(baseResources.sanLost, lostFromCurrent(sanMax, sanCurrentFallback));

  const peMax = pickNumber(baseResources.peMax);
  const peCurrentFallback = pickNumber(baseResources.peCurrent);
  const peLost = pickNumber(baseResources.peLost, lostFromCurrent(peMax, peCurrentFallback));
  const stableId = typeof character.id === "string" && character.id.trim()
    ? character.id.trim()
    : generateId();
  const createdAt = typeof character.createdAt === "string" && character.createdAt
    ? character.createdAt
    : (typeof character.updatedAt === "string" && character.updatedAt
      ? character.updatedAt
      : new Date().toISOString());
  const updatedAt = typeof character.updatedAt === "string" && character.updatedAt
    ? character.updatedAt
    : createdAt;

  return {
    ...character,
    id: stableId,
    createdAt,
    updatedAt,
    origin: character.origin || "",
    height: character.height || "",
    weight: character.weight || "",
    internalConflict: character.internalConflict || "",
    motivation: character.motivation || "",
    profileImageFit: normalizeImageFit(character.profileImageFit),
    profileImagePositionX: normalizeProfileImagePosition(character.profileImagePositionX),
    profileImagePositionY: normalizeProfileImagePosition(character.profileImagePositionY),
    profileImageZoom: normalizeProfileImageZoom(character.profileImageZoom),
    profileFrameShape: normalizeProfileFrameShape(character.profileFrameShape),
    masterShareId:
      typeof character.masterShareId === "string" && character.masterShareId
        ? character.masterShareId
        : "",
    masterSharedAt: character.masterSharedAt || "",
    resources: {
      nex: baseResources.nex ?? null,
      defense: baseResources.defense ?? null,
      movement: baseResources.movement || "",
      pdMax,
      pdLost,
      sanMax,
      sanLost,
      peMax,
      peLost,
    },
    combat: {
      attacks: combat.attacks || "",
      attackEntries: Array.isArray(combat.attackEntries)
        ? combat.attackEntries.map((entry) => normalizeAttackEntry(entry))
        : deriveAttackEntries(character),
      items: combat.items || "",
      battleNotes: combat.battleNotes || "",
      encounterTitle: typeof combat.encounterTitle === "string" ? combat.encounterTitle : "",
      encounterNotes: typeof combat.encounterNotes === "string" ? combat.encounterNotes : "",
      abilities: deriveCombatAbilities(character),
      initiativeEntries: Array.isArray(combat.initiativeEntries)
        ? combat.initiativeEntries.map((entry) => normalizeInitiativeEntry(entry))
        : [],
      initiativeRound: Number.parseInt(String(combat.initiativeRound ?? "1"), 10) || 1,
      activeInitiativeId: typeof combat.activeInitiativeId === "string" ? combat.activeInitiativeId : "",
      conditions: Array.isArray(combat.conditions)
        ? combat.conditions.map((condition) => normalizeConditionState(condition))
        : CONDITION_PRESETS.map((name) => createConditionState(name)),
      rollHistory: Array.isArray(combat.rollHistory)
        ? combat.rollHistory
            .filter((entry) => entry && typeof entry === "object")
            .slice(0, 24)
            .map((entry) => ({
              id: typeof entry.id === "string" && entry.id ? entry.id : generateId(),
              kind: typeof entry.kind === "string" ? entry.kind : "Rolagem",
              label: typeof entry.label === "string" ? entry.label : "Teste",
              total: Number.parseInt(String(entry.total ?? "0"), 10) || 0,
              detail: typeof entry.detail === "string" ? entry.detail : "",
              dice: Array.isArray(entry.dice) ? entry.dice.map((value) => Number(value) || 0) : [],
              at: typeof entry.at === "string" ? entry.at : new Date().toISOString(),
            }))
        : [],
      autoDerived: combat.autoDerived !== false,
    },
    ui: {
      readMode: Boolean(character.ui?.readMode),
      inAction: Boolean(character.ui?.inAction),
      changeHistory: Array.isArray(character.ui?.changeHistory)
        ? character.ui.changeHistory
            .filter((entry) => entry && typeof entry === "object")
            .slice(0, MAX_CHANGE_HISTORY_ENTRIES)
            .map((entry) => normalizeChangeHistoryEntry(entry))
        : [],
    },
    inventory: deriveInventoryItems(character),
    skillRanks: deriveSkillRanks(character),
  };
}

function migrateMasterShareRecord(record) {
  if (!record || typeof record !== "object") {
    return null;
  }

  const rawSnapshot = record.snapshot || record.character || record;
  const snapshot = migrateCharacter({
    ...rawSnapshot,
    id: rawSnapshot.id || record.sourceCharacterId || generateId(),
    updatedAt: rawSnapshot.updatedAt || record.updatedAt || new Date().toISOString(),
  });

  if (!snapshot) {
    return null;
  }

  snapshot.masterShareId = snapshot.masterShareId || record.shareId || "";
  snapshot.masterSharedAt = snapshot.masterSharedAt || record.sharedAt || snapshot.updatedAt;

  return {
    shareId:
      typeof record.shareId === "string" && record.shareId
        ? record.shareId
        : snapshot.masterShareId || generateId(),
    sourceCharacterId:
      typeof record.sourceCharacterId === "string" && record.sourceCharacterId
        ? record.sourceCharacterId
        : snapshot.id,
    sharedAt: record.sharedAt || snapshot.masterSharedAt || snapshot.updatedAt,
    updatedAt: record.updatedAt || snapshot.updatedAt || new Date().toISOString(),
    ownerUid: typeof record.ownerUid === "string" ? record.ownerUid : "",
    assignedRoomId: typeof record.assignedRoomId === "string" ? record.assignedRoomId : "",
    assignedRoomTitle: typeof record.assignedRoomTitle === "string" ? record.assignedRoomTitle : "",
    assignedAt: typeof record.assignedAt === "string" ? record.assignedAt : "",
    snapshot,
  };
}

function pickNumber(...values) {
  for (const value of values) {
    if (value === null || value === undefined || value === "") {
      continue;
    }

    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.trunc(parsed));
    }
  }

  return null;
}

function lostFromCurrent(maxValue, currentValue) {
  if (maxValue === null || maxValue === undefined) {
    return null;
  }
  if (currentValue === null || currentValue === undefined) {
    return null;
  }

  const max = Math.max(0, Number(maxValue) || 0);
  const current = Math.max(0, Number(currentValue) || 0);
  return Math.max(0, Math.trunc(max - current));
}

function saveCharacters(data) {
  persistCharactersWithRecovery(data);
  recordSafetyBackup("characters");
  window.refreshLinkedTabletopTokens?.();
}

function saveMasterNpcs(data) {
  try {
    persistJsonWithRecovery(
      MASTER_NPC_STORAGE_KEY,
      Array.isArray(data) ? data.map((npc) => normalizeMasterNpc(npc)) : []
    );
    recordSafetyBackup("master-npcs");
    window.refreshLinkedTabletopTokens?.();
  } catch (error) {
    console.error(error);
    pushUiToast("Não foi possível salvar os NPCs do mestre.", "danger", 3200);
  }
}

function saveMasterShares(data) {
  try {
    persistJsonWithRecovery(MASTER_SHARE_STORAGE_KEY, data);
    recordSafetyBackup("master-shares");

    if (masterSyncChannel) {
      try {
        masterSyncChannel.postMessage({ type: "master-shares-updated" });
      } catch {
        // Ignore channel sync errors.
      }
    }
  } catch (error) {
    console.error(error);
    pushUiToast("Não foi possível salvar os registros compartilhados.", "danger", 3200);
  }
}

function saveMasterSecretNotes(data) {
  try {
    persistJsonWithRecovery(MASTER_SECRET_NOTES_STORAGE_KEY, (
      data && typeof data === "object" ? data : {}
    ));
    recordSafetyBackup("master-secret-notes");
  } catch (error) {
    console.error(error);
    pushUiToast("Não foi possível salvar as notas secretas.", "danger", 3200);
  }
}

function generateId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `char-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}



















































































