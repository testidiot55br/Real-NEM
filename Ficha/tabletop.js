(function () {
  const TABLETOP_STORAGE_KEY = "ficha-rpg.tabletop-state.v1";
  const TABLETOP_STAGE_WIDTH = 1600;
  const TABLETOP_STAGE_HEIGHT = 1000;
  const TABLETOP_DEFAULT_GRID_SIZE = 64;
  const TABLETOP_MIN_GRID_SIZE = 32;
  const TABLETOP_MAX_GRID_SIZE = 128;
  const TABLETOP_MIN_ZOOM = 0.5;
  const TABLETOP_MAX_ZOOM = 2;
  const TABLETOP_MIN_TOKEN_SIZE = 40;
  const TABLETOP_MAX_TOKEN_SIZE = 160;
  const TABLETOP_IMPORT_COLUMNS = 4;
  const TABLETOP_TOKEN_ROLE_SIZES = {
    player: 64,
    npc: 64,
    enemy: 96,
  };
  const TABLETOP_TOKEN_PALETTE = [
    "#c5a36a",
    "#7fb3a6",
    "#d16f6f",
    "#8b9cd6",
    "#d29b5d",
    "#7ca16b",
    "#c081b7",
    "#65a5c5",
  ];
  const TABLETOP_CONDITIONS = [
    { key: "bleeding", label: "Sangrando", short: "SG", color: "rgba(171, 45, 45, 0.88)" },
    { key: "down", label: "Caido", short: "CD", color: "rgba(99, 99, 108, 0.92)" },
    { key: "hidden", label: "Oculto", short: "OC", color: "rgba(64, 103, 119, 0.92)" },
    { key: "marked", label: "Marcado", short: "MK", color: "rgba(201, 134, 49, 0.92)" },
    { key: "buff", label: "Buff", short: "BF", color: "rgba(64, 136, 86, 0.92)" },
    { key: "debuff", label: "Debuff", short: "DF", color: "rgba(135, 73, 149, 0.92)" },
  ];
  const TABLETOP_PING_DURATION_MS = 4200;
  const MASTER_PHONE_LIBRARY_STORAGE_KEY = "ficha-rpg.master-phone-library.v1";
  const MASTER_PHONE_MAX_SOUND_BYTES = 2 * 1024 * 1024;
  const MASTER_PHONE_SOUND_PRESETS = {
    alert: { label: "Alerta", tones: [[784, 0.11], [988, 0.09], [784, 0.15]], type: "triangle", gain: 0.08 },
    impact: { label: "Impacto", tones: [[164, 0.1], [98, 0.22]], type: "sawtooth", gain: 0.12 },
    horror: { label: "Suspense", tones: [[240, 0.34], [184, 0.26], [146, 0.3]], type: "sine", gain: 0.07 },
    success: { label: "Confirmacao", tones: [[494, 0.1], [659, 0.12], [784, 0.18]], type: "triangle", gain: 0.075 },
  };

  const tabletopElements = {
    menuButton: document.getElementById("menu-tabletop"),
    standaloneScreen: document.getElementById("tabletop-standalone-screen"),
    view: document.getElementById("menu-tabletop-view"),
    shell: document.querySelector("#menu-tabletop-view .tabletop-shell"),
    configCard: document.querySelector("#menu-tabletop-view .tabletop-config-card"),
    exportButton: document.getElementById("tabletop-export"),
    importButton: document.getElementById("tabletop-import"),
    importFile: document.getElementById("tabletop-import-file"),
    sceneAdd: document.getElementById("tabletop-scene-add"),
    sceneList: document.getElementById("tabletop-scene-list"),
    sceneName: document.getElementById("tabletop-scene-name"),
    mapPick: document.getElementById("tabletop-map-pick"),
    mapClear: document.getElementById("tabletop-map-clear"),
    mapFile: document.getElementById("tabletop-map-file"),
    sceneVisible: document.getElementById("tabletop-scene-visible"),
    centerView: document.getElementById("tabletop-center-view"),
    gridEnabled: document.getElementById("tabletop-grid-enabled"),
    gridSize: document.getElementById("tabletop-grid-size"),
    gridSizeOutput: document.getElementById("tabletop-grid-size-output"),
    zoom: document.getElementById("tabletop-zoom"),
    zoomOutput: document.getElementById("tabletop-zoom-output"),
    sceneNotes: document.getElementById("tabletop-scene-notes"),
    importCharacters: document.getElementById("tabletop-import-characters"),
    importMission: document.getElementById("tabletop-import-mission"),
    importNpcs: document.getElementById("tabletop-import-npcs"),
    tokenSelection: document.getElementById("tabletop-token-selection"),
    tokenSelectionTitle: document.getElementById("tabletop-token-selection-title"),
    tokenSelectionMeta: document.getElementById("tabletop-token-selection-meta"),
    tokenSelectionList: document.getElementById("tabletop-token-selection-list"),
    tokenSelectionAll: document.getElementById("tabletop-token-selection-all"),
    tokenSelectionClear: document.getElementById("tabletop-token-selection-clear"),
    tokenSelectionConfirm: document.getElementById("tabletop-token-selection-confirm"),
    tokenSelectionCancel: document.getElementById("tabletop-token-selection-cancel"),
    tokenUpload: document.getElementById("tabletop-token-upload"),
    tokenUploadFile: document.getElementById("tabletop-token-upload-file"),
    tokenSourceSelect: document.getElementById("tabletop-token-source-select"),
    tokenSourceAdd: document.getElementById("tabletop-token-source-add"),
    tokenAdd: document.getElementById("tabletop-token-add"),
    tokenEditor: document.getElementById("tabletop-token-editor"),
    tokenEditorTitle: document.getElementById("tabletop-token-editor-title"),
    tokenEditorMeta: document.getElementById("tabletop-token-editor-meta"),
    tokenLink: document.getElementById("tabletop-token-link"),
    tokenRole: document.getElementById("tabletop-token-role"),
    tokenImageFit: document.getElementById("tabletop-token-image-fit"),
    tokenName: document.getElementById("tabletop-token-name"),
    tokenColor: document.getElementById("tabletop-token-color"),
    tokenMarker: document.getElementById("tabletop-token-hp"),
    tokenSize: document.getElementById("tabletop-token-size"),
    tokenX: document.getElementById("tabletop-token-x"),
    tokenY: document.getElementById("tabletop-token-y"),
    tokenImagePick: document.getElementById("tabletop-token-image-pick"),
    tokenImageClear: document.getElementById("tabletop-token-image-clear"),
    tokenDuplicate: document.getElementById("tabletop-token-duplicate"),
    tokenDelete: document.getElementById("tabletop-token-delete"),
    tokenImageFile: document.getElementById("tabletop-token-image-file"),
    tokenConditions: document.getElementById("tabletop-token-conditions"),
    tokenList: document.getElementById("tabletop-token-list"),
    initPrev: document.getElementById("tabletop-init-prev"),
    initNext: document.getElementById("tabletop-init-next"),
    initRound: document.getElementById("tabletop-init-round"),
    initSort: document.getElementById("tabletop-init-sort"),
    initClear: document.getElementById("tabletop-init-clear"),
    initList: document.getElementById("tabletop-init-list"),
    fogEnabled: document.getElementById("tabletop-fog-enabled"),
    fogBrush: document.getElementById("tabletop-fog-brush"),
    fogBrushOutput: document.getElementById("tabletop-fog-brush-output"),
    fogRevealTool: document.getElementById("tabletop-tool-fog-reveal"),
    fogHideTool: document.getElementById("tabletop-tool-fog-hide"),
    fogClear: document.getElementById("tabletop-fog-clear"),
    noteAdd: document.getElementById("tabletop-note-add"),
    areaAddCircle: document.getElementById("tabletop-area-add-circle"),
    areaAddCone: document.getElementById("tabletop-area-add-cone"),
    areaAddLine: document.getElementById("tabletop-area-add-line"),
    pingClear: document.getElementById("tabletop-ping-clear"),
    pinList: document.getElementById("tabletop-pin-list"),
    areaList: document.getElementById("tabletop-area-list"),
    propList: document.getElementById("tabletop-prop-list"),
    libraryUpload: document.getElementById("tabletop-library-upload"),
    libraryFile: document.getElementById("tabletop-library-file"),
    libraryType: document.getElementById("tabletop-library-type"),
    libraryList: document.getElementById("tabletop-library-list"),
    presetSave: document.getElementById("tabletop-preset-save"),
    presetSelect: document.getElementById("tabletop-preset-select"),
    presetApply: document.getElementById("tabletop-preset-apply"),
    presetCreateScene: document.getElementById("tabletop-preset-create-scene"),
    presetDelete: document.getElementById("tabletop-preset-delete"),
    stageTitle: document.getElementById("tabletop-stage-title"),
    stageMeta: document.getElementById("tabletop-stage-meta"),
    stageTurn: document.getElementById("tabletop-stage-turn"),
    stageNotes: document.getElementById("tabletop-stage-notes"),
    stageFrame: document.getElementById("tabletop-stage-frame"),
    stage: document.getElementById("tabletop-stage"),
    mapLayer: document.getElementById("tabletop-map-layer"),
    propsLayer: document.getElementById("tabletop-props-layer"),
    grid: document.getElementById("tabletop-grid"),
    areasLayer: document.getElementById("tabletop-areas-layer"),
    tokensLayer: document.getElementById("tabletop-tokens-layer"),
    notesLayer: document.getElementById("tabletop-notes-layer"),
    fogLayer: document.getElementById("tabletop-fog-layer"),
    pingsLayer: document.getElementById("tabletop-pings-layer"),
    rulerLayer: document.getElementById("tabletop-ruler-layer"),
    stageEmpty: document.getElementById("tabletop-stage-empty"),
    toolMeasure: document.getElementById("tabletop-tool-measure"),
    toolGrid: document.getElementById("tabletop-tool-grid"),
    toolPing: document.getElementById("tabletop-tool-ping"),
    zoomOut: document.getElementById("tabletop-zoom-out"),
    zoomReset: document.getElementById("tabletop-zoom-reset"),
    zoomIn: document.getElementById("tabletop-zoom-in"),
    masterPhoneDock: document.getElementById("tabletop-master-phone-dock"),
    masterPhone: document.getElementById("tabletop-master-phone"),
    masterPhoneClose: document.getElementById("tabletop-master-phone-close"),
    masterPhoneClock: document.getElementById("tabletop-master-phone-clock"),
    masterPhoneSessionSelect: document.getElementById("tabletop-master-session-select"),
    masterPhoneSessionMeta: document.getElementById("tabletop-master-session-meta"),
    masterPhoneSessionOpen: document.getElementById("tabletop-master-session-open"),
    masterPhoneSessionCopy: document.getElementById("tabletop-master-session-copy"),
    masterPhoneSessionClose: document.getElementById("tabletop-master-session-close"),
    masterPhoneSessionTitle: document.getElementById("tabletop-master-session-title"),
    masterPhoneSessionIntro: document.getElementById("tabletop-master-session-intro"),
    masterPhoneSessionCreate: document.getElementById("tabletop-master-session-create"),
    masterPhoneTimerDisplay: document.getElementById("tabletop-master-session-timer"),
    masterPhoneTimerStart: document.getElementById("tabletop-master-session-timer-start"),
    masterPhoneTimerPause: document.getElementById("tabletop-master-session-timer-pause"),
    masterPhoneTimerReset: document.getElementById("tabletop-master-session-timer-reset"),
    masterPhoneSoundMeta: document.getElementById("tabletop-master-sound-meta"),
    masterPhoneSoundUpload: document.getElementById("tabletop-master-sound-upload"),
    masterPhoneSoundFile: document.getElementById("tabletop-master-sound-file"),
    masterPhoneSoundSelect: document.getElementById("tabletop-master-sound-select"),
    masterPhoneSoundPlay: document.getElementById("tabletop-master-sound-play"),
    masterPhoneSoundList: document.getElementById("tabletop-master-sound-list"),
    masterPhoneGalleryUpload: document.getElementById("tabletop-master-gallery-upload"),
    masterPhoneGalleryFile: document.getElementById("tabletop-master-gallery-file"),
    masterPhoneGalleryList: document.getElementById("tabletop-master-gallery-list"),
    masterPhoneInventoryList: document.getElementById("tabletop-master-inventory-list"),
    masterPhoneNpcList: document.getElementById("tabletop-master-npc-list"),
    masterPhoneDiaryList: document.getElementById("tabletop-master-diary-list"),
    imageViewer: document.getElementById("tabletop-image-viewer"),
    imageViewerClose: document.getElementById("tabletop-image-viewer-close"),
    imageViewerImage: document.getElementById("tabletop-image-viewer-image"),
    imageViewerTitle: document.getElementById("tabletop-image-viewer-title"),
  };

  if (!tabletopElements.menuButton || !tabletopElements.view) {
    return;
  }

  mountTabletopStandaloneScreen();
  mountMasterPhoneOverlay();

  let tabletopState = normalizeTabletopState(loadTabletopState());
  let tabletopMasterPhoneLibrary = loadMasterPhoneLibrary();
  let tabletopSelectedTokenId = "";
  let tabletopViewerSceneId = "";
  let tabletopViewerZoomByScene = {};
  let tabletopViewerGridByScene = {};
  let tabletopSceneConfigSceneId = "";
  let tabletopToolMode = "";
  let tabletopDrag = null;
  let tabletopCapturedPointerId = null;
  let tabletopPinch = null;
  let tabletopOpenedOnce = false;
  let tabletopSelectionState = null;
  let tabletopMeasurement = null;
  let tabletopMeasurementClearTimer = 0;
  let tabletopPingCleanupTimer = 0;
  let tabletopMasterPhoneState = {
    open: false,
    screen: "home",
  };
  let tabletopMasterPhoneSelectedSoundId = "preset:alert";
  let tabletopMasterPhoneLastCueId = "";
  let tabletopMasterPhoneAudioContext = null;
  let tabletopMasterPhoneClockTimer = 0;
  let tabletopMasterPhoneAudioBufferCache = new Map();
  let tabletopImageViewerState = { src: "", title: "" };
  let tabletopSuppressImagePreviewUntil = 0;

  bindTabletopEvents();
  ensureTabletopSelection();
  refreshLinkedTabletopTokens({ render: false });
  renderTabletopView();
  tabletopMasterPhoneClockTimer = window.setInterval(syncMasterPhoneLiveReadouts, 1000);
  syncMasterPhoneLiveReadouts();

  window.showMenuTabletop = showMenuTabletop;
  window.loadTabletopState = loadTabletopState;
  window.normalizeTabletopState = normalizeTabletopState;
  window.renderTabletopView = renderTabletopView;
  window.refreshTabletopRemoteState = refreshTabletopRemoteState;
  window.refreshLinkedTabletopTokens = refreshLinkedTabletopTokens;
  window.handleSharedMasterPhoneState = handleSharedMasterPhoneState;
  window.renderMasterPhone = renderMasterPhone;
  window.saveTabletopState = function saveExposedTabletopState(nextState) {
    saveTabletopState(nextState);
  };

  function bindTabletopEvents() {
    tabletopElements.menuButton.addEventListener("click", () => {
      runMenuButtonAnimation(tabletopElements.menuButton);
      if (
        tabletopElements.menuButton.classList.contains("active")
        && !tabletopElements.view.classList.contains("hidden")
      ) {
        if (typeof showMenuHome === "function") {
          showMenuHome();
        }
        return;
      }
      showMenuTabletop();
    });

    tabletopElements.exportButton?.addEventListener("click", handleTabletopExport);
    tabletopElements.importButton?.addEventListener("click", () => tabletopElements.importFile?.click());
    tabletopElements.importFile?.addEventListener("change", handleTabletopImportFile);
    tabletopElements.sceneAdd?.addEventListener("click", handleTabletopSceneAdd);
    tabletopElements.sceneName?.addEventListener("input", handleSceneNameInput);
    tabletopElements.sceneNotes?.addEventListener("input", handleSceneNotesInput);
    tabletopElements.sceneVisible?.addEventListener("change", handleSceneVisibilityChange);
    tabletopElements.gridEnabled?.addEventListener("change", handleGridEnabledChange);
    tabletopElements.gridSize?.addEventListener("input", handleGridSizeInput);
    tabletopElements.zoom?.addEventListener("input", handleZoomRangeInput);
    tabletopElements.mapPick?.addEventListener("click", () => tabletopElements.mapFile?.click());
    tabletopElements.mapClear?.addEventListener("click", clearSceneMap);
    tabletopElements.mapFile?.addEventListener("change", handleSceneMapFileChange);
    tabletopElements.centerView?.addEventListener("click", () => centerTabletopFrame());
    tabletopElements.importCharacters?.addEventListener("click", () => openTokenSelection(buildCharacterImportEntries(), "fichas salvas"));
    tabletopElements.importMission?.addEventListener("click", () => openTokenSelection(buildMissionImportEntries(), "missao atual"));
    tabletopElements.importNpcs?.addEventListener("click", () => openTokenSelection(buildNpcImportEntries(), "NPCs do mestre"));
    tabletopElements.tokenSelectionAll?.addEventListener("click", () => toggleAllTokenSelections(true));
    tabletopElements.tokenSelectionClear?.addEventListener("click", () => toggleAllTokenSelections(false));
    tabletopElements.tokenSelectionConfirm?.addEventListener("click", handleConfirmTokenSelection);
    tabletopElements.tokenSelectionCancel?.addEventListener("click", () => closeTokenSelection());
    tabletopElements.tokenUpload?.addEventListener("click", () => tabletopElements.tokenUploadFile?.click());
    tabletopElements.tokenUploadFile?.addEventListener("change", handleTokenUploadFileChange);
    tabletopElements.tokenSourceAdd?.addEventListener("click", handleAddSelectedLinkedToken);
    tabletopElements.tokenAdd?.addEventListener("click", handleTabletopTokenAdd);
    tabletopElements.tokenLink?.addEventListener("change", handleTokenLinkChange);
    tabletopElements.tokenRole?.addEventListener("change", () => patchSelectedToken({ tokenRole: tabletopElements.tokenRole.value }));
    tabletopElements.tokenImageFit?.addEventListener("change", () => patchSelectedToken({ imageFit: tabletopElements.tokenImageFit.value }));
    tabletopElements.tokenName?.addEventListener("input", () => patchSelectedToken({ name: tabletopElements.tokenName.value }));
    tabletopElements.tokenColor?.addEventListener("input", () => patchSelectedToken({ color: tabletopElements.tokenColor.value }));
    tabletopElements.tokenMarker?.addEventListener("input", () => patchSelectedToken({ marker: tabletopElements.tokenMarker.value }));
    tabletopElements.tokenSize?.addEventListener("input", () => patchSelectedToken({ size: Number.parseInt(tabletopElements.tokenSize.value || "64", 10) }));
    tabletopElements.tokenX?.addEventListener("change", () => patchSelectedToken({ x: Number.parseFloat(tabletopElements.tokenX.value || "0") }));
    tabletopElements.tokenY?.addEventListener("change", () => patchSelectedToken({ y: Number.parseFloat(tabletopElements.tokenY.value || "0") }));
    tabletopElements.tokenImagePick?.addEventListener("click", () => tabletopElements.tokenImageFile?.click());
    tabletopElements.tokenImageClear?.addEventListener("click", clearSelectedTokenImage);
    tabletopElements.tokenDuplicate?.addEventListener("click", duplicateSelectedToken);
    tabletopElements.tokenDelete?.addEventListener("click", deleteSelectedToken);
    tabletopElements.tokenImageFile?.addEventListener("change", handleTokenImageFileChange);
    tabletopElements.initPrev?.addEventListener("click", () => stepInitiative(-1));
    tabletopElements.initNext?.addEventListener("click", () => stepInitiative(1));
    tabletopElements.initRound?.addEventListener("change", handleInitiativeRoundChange);
    tabletopElements.initSort?.addEventListener("click", sortInitiativeEntries);
    tabletopElements.initClear?.addEventListener("click", clearInitiativeEntries);
    tabletopElements.fogEnabled?.addEventListener("change", handleFogEnabledChange);
    tabletopElements.fogBrush?.addEventListener("input", handleFogBrushInput);
    tabletopElements.fogRevealTool?.addEventListener("click", () => setTabletopToolMode(tabletopToolMode === "fog-reveal" ? "" : "fog-reveal"));
    tabletopElements.fogHideTool?.addEventListener("click", () => setTabletopToolMode(tabletopToolMode === "fog-hide" ? "" : "fog-hide"));
    tabletopElements.fogClear?.addEventListener("click", clearFogReveals);
    tabletopElements.noteAdd?.addEventListener("click", addScenePin);
    tabletopElements.areaAddCircle?.addEventListener("click", () => addSceneArea("circle"));
    tabletopElements.areaAddCone?.addEventListener("click", () => addSceneArea("cone"));
    tabletopElements.areaAddLine?.addEventListener("click", () => addSceneArea("line"));
    tabletopElements.pingClear?.addEventListener("click", clearScenePings);
    tabletopElements.libraryUpload?.addEventListener("click", () => tabletopElements.libraryFile?.click());
    tabletopElements.libraryFile?.addEventListener("change", handleLibraryFileChange);
    tabletopElements.presetSave?.addEventListener("click", saveScenePreset);
    tabletopElements.presetApply?.addEventListener("click", () => applySelectedPreset({ createScene: false }));
    tabletopElements.presetCreateScene?.addEventListener("click", () => applySelectedPreset({ createScene: true }));
    tabletopElements.presetDelete?.addEventListener("click", deleteSelectedPreset);
    tabletopElements.toolMeasure?.addEventListener("click", () => setTabletopToolMode(tabletopToolMode === "measure" ? "" : "measure"));
    tabletopElements.toolGrid?.addEventListener("click", toggleSceneGridVisibility);
    tabletopElements.toolPing?.addEventListener("click", () => setTabletopToolMode(tabletopToolMode === "ping" ? "" : "ping"));
    tabletopElements.zoomOut?.addEventListener("click", () => stepSceneZoom(-0.1));
    tabletopElements.zoomReset?.addEventListener("click", () => setSceneZoom(1));
    tabletopElements.zoomIn?.addEventListener("click", () => stepSceneZoom(0.1));
    tabletopElements.masterPhoneDock?.addEventListener("click", toggleMasterPhone);
    tabletopElements.masterPhoneClose?.addEventListener("click", closeMasterPhone);
    tabletopElements.masterPhone?.querySelectorAll("[data-phone-screen-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextScreen = String(button.getAttribute("data-phone-screen-target") || "home");
        setMasterPhoneScreen(nextScreen);
      });
    });
    tabletopElements.masterPhone?.querySelectorAll("[data-phone-shortcut]").forEach((button) => {
      button.addEventListener("click", () => handleMasterPhoneShortcut(String(button.getAttribute("data-phone-shortcut") || "")));
    });
    tabletopElements.masterPhoneSessionOpen?.addEventListener("click", handleMasterPhoneOpenSession);
    tabletopElements.masterPhoneSessionCopy?.addEventListener("click", handleMasterPhoneCopySessionCode);
    tabletopElements.masterPhoneSessionClose?.addEventListener("click", handleMasterPhoneCloseSession);
    tabletopElements.masterPhoneSessionCreate?.addEventListener("click", handleMasterPhoneCreateSession);
    tabletopElements.masterPhoneSessionSelect?.addEventListener("change", renderMasterPhone);
    tabletopElements.masterPhoneSessionTitle?.addEventListener("input", renderMasterPhone);
    tabletopElements.masterPhoneSessionIntro?.addEventListener("input", renderMasterPhone);
    tabletopElements.masterPhoneTimerStart?.addEventListener("click", startMasterPhoneTimer);
    tabletopElements.masterPhoneTimerPause?.addEventListener("click", pauseMasterPhoneTimer);
    tabletopElements.masterPhoneTimerReset?.addEventListener("click", resetMasterPhoneTimer);
    tabletopElements.masterPhoneSoundUpload?.addEventListener("click", () => tabletopElements.masterPhoneSoundFile?.click());
    tabletopElements.masterPhoneSoundFile?.addEventListener("change", handleMasterPhoneSoundUploadChange);
    tabletopElements.masterPhoneSoundPlay?.addEventListener("click", triggerMasterPhoneSoundCue);
    tabletopElements.masterPhoneGalleryUpload?.addEventListener("click", () => tabletopElements.masterPhoneGalleryFile?.click());
    tabletopElements.masterPhoneGalleryFile?.addEventListener("change", handleMasterPhoneGalleryUploadChange);
    tabletopElements.imageViewerClose?.addEventListener("click", closeTabletopImageViewer);
    tabletopElements.imageViewer?.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      if (!event.target.closest("#tabletop-image-viewer-image") && !event.target.closest("#tabletop-image-viewer-close")) {
        closeTabletopImageViewer();
      }
    });
    tabletopElements.stageFrame?.addEventListener("pointerdown", handleStagePointerDown);
    tabletopElements.stageFrame?.addEventListener("touchstart", handleStageTouchStart, { passive: false });
    tabletopElements.stageFrame?.addEventListener("touchmove", handleStageTouchMove, { passive: false });
    tabletopElements.stageFrame?.addEventListener("touchend", handleStageTouchEnd, { passive: false });
    tabletopElements.stageFrame?.addEventListener("touchcancel", handleStageTouchEnd, { passive: false });
    window.addEventListener("pointermove", handleStagePointerMove);
    window.addEventListener("pointerup", finishStageDrag);
    window.addEventListener("pointercancel", finishStageDrag);
    window.addEventListener("storage", handleTabletopStorageEvent);
    document.addEventListener("pointerdown", primeMasterPhoneAudio, { passive: true, once: true });
    document.addEventListener("keydown", primeMasterPhoneAudio, { once: true });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTabletopImageViewer();
      }
    });
  }

  function showMenuTabletop() {
    if (typeof hideAllMenuViews === "function") {
      hideAllMenuViews();
    }
    tabletopElements.view.classList.remove("hidden");
    if (typeof setActiveMenuButton === "function") {
      setActiveMenuButton(tabletopElements.menuButton);
    } else {
      tabletopElements.menuButton.classList.add("active");
    }
    if (typeof setView === "function") {
      setView("tabletop");
    } else {
      document.body?.setAttribute("data-view", "tabletop");
    }
    refreshTabletopRemoteState({ force: true, silent: true });
    refreshLinkedTabletopTokens({ render: false });
    ensureTabletopSelection();
    tabletopSceneConfigSceneId = "";
    renderTabletopView({ centerStage: !tabletopOpenedOnce });
    tabletopOpenedOnce = true;
    if (typeof closeModeMenu === "function") {
      closeModeMenu(true);
    }
    window.setTimeout(() => tabletopElements.stage?.focus(), 0);
  }

  function toggleMasterPhone() {
    if (!isMasterPhoneShortcutEnabled()) {
      return;
    }
    if (tabletopMasterPhoneState.open) {
      closeMasterPhone();
      return;
    }
    openMasterPhone();
  }

  function openMasterPhone(screen = tabletopMasterPhoneState.screen || "home") {
    if (!isMasterPhoneShortcutEnabled()) {
      return;
    }
    if (!isMasterModeUnlocked()) {
      return;
    }
    tabletopMasterPhoneState.open = true;
    tabletopMasterPhoneState.screen = screen;
    renderMasterPhone();
  }

  function closeMasterPhone() {
    tabletopMasterPhoneState.open = false;
    tabletopMasterPhoneState.screen = "home";
    renderMasterPhone();
  }

  function setMasterPhoneScreen(screen = "home") {
    if (!isMasterPhoneShortcutEnabled()) {
      return;
    }
    tabletopMasterPhoneState.screen = screen || "home";
    tabletopMasterPhoneState.open = true;
    renderMasterPhone();
  }

  function isMasterPhoneShortcutEnabled() {
    return false;
  }

  function handleMasterPhoneShortcut(shortcut) {
    closeMasterPhone();
    if (typeof openModeMenu === "function") {
      openModeMenu();
    }
    if (shortcut === "inventory" && typeof showMenuMasterInventory === "function") {
      showMenuMasterInventory();
      return;
    }
    if (shortcut === "npcs" && typeof showMenuMasterNpcArchive === "function") {
      showMenuMasterNpcArchive();
      return;
    }
    if (shortcut === "diary" && typeof showMenuDiary === "function") {
      showMenuDiary();
    }
  }

  function syncMasterPhoneLiveReadouts() {
    if (tabletopElements.masterPhoneClock) {
      tabletopElements.masterPhoneClock.textContent = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (tabletopElements.masterPhoneTimerDisplay) {
      tabletopElements.masterPhoneTimerDisplay.textContent = formatMasterPhoneTimer(
        getMasterPhoneTimerElapsedMs()
      );
    }
  }

  function formatMasterPhoneTimer(totalMs = 0) {
    const totalSeconds = Math.max(0, Math.floor(totalMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
  }

  function getMasterPhoneSessionRecords() {
    try {
      return Array.isArray(hostMissionRecords) ? hostMissionRecords : [];
    } catch (error) {
      return [];
    }
  }

  function getCurrentSessionRecordForPhone() {
    if (typeof selectedMissionData !== "undefined" && selectedMissionData) {
      return selectedMissionData;
    }
    if (typeof currentRoomData !== "undefined" && currentRoomData) {
      return currentRoomData;
    }
    return null;
  }

  function getCurrentSessionCodeForPhone() {
    const sessionRecord = getCurrentSessionRecordForPhone();
    return String(
      sessionRecord?.id
      || (typeof selectedMissionId !== "undefined" ? selectedMissionId : "")
      || (typeof currentRoomId !== "undefined" ? currentRoomId : "")
      || ""
    );
  }

  function getTabletopDirectorState() {
    return tabletopState.director || createEmptyTabletopDirectorState();
  }

  function getMasterPhoneTimerElapsedMs(referenceTime = Date.now()) {
    const timer = getTabletopDirectorState().sessionTimer || createEmptyTabletopSessionTimer();
    if (!timer.running || !timer.startedAt) {
      return Number(timer.elapsedMs || 0);
    }
    const startedTime = new Date(timer.startedAt).getTime();
    if (Number.isNaN(startedTime)) {
      return Number(timer.elapsedMs || 0);
    }
    return Math.max(0, Number(timer.elapsedMs || 0) + (referenceTime - startedTime));
  }

  function renderMasterPhone() {
    const phoneUnlocked = isMasterModeUnlocked();
    if (tabletopElements.masterPhoneDock) {
      tabletopElements.masterPhoneDock.classList.add("hidden");
      tabletopElements.masterPhoneDock.setAttribute("aria-expanded", "false");
    }
    if (!tabletopElements.masterPhone) {
      return;
    }
    if (!phoneUnlocked || !isMasterPhoneShortcutEnabled()) {
      tabletopMasterPhoneState.open = false;
      tabletopElements.masterPhone.classList.remove("is-open");
      tabletopElements.masterPhone.classList.add("hidden");
      tabletopElements.masterPhone.setAttribute("aria-hidden", "true");
      return;
    }

    tabletopElements.masterPhone.classList.remove("hidden");
    tabletopElements.masterPhone.classList.toggle("is-open", tabletopMasterPhoneState.open);
    tabletopElements.masterPhone.setAttribute("aria-hidden", tabletopMasterPhoneState.open ? "false" : "true");
    tabletopElements.masterPhone.dataset.phoneScreen = tabletopMasterPhoneState.screen || "home";
    tabletopElements.masterPhone.querySelectorAll(".tabletop-master-phone-screen").forEach((screen) => {
      const isHome = screen.id === "tabletop-master-phone-home";
      const matches = isHome
        ? tabletopMasterPhoneState.screen === "home"
        : screen.id === `tabletop-master-phone-${tabletopMasterPhoneState.screen}-screen`;
      screen.classList.toggle("hidden", !matches);
    });

    const sessionRecords = getMasterPhoneSessionRecords();
    if (tabletopElements.masterPhoneSessionSelect) {
      const currentValue = String(
        tabletopElements.masterPhoneSessionSelect.value
        || (typeof selectedMissionId !== "undefined" ? selectedMissionId : "")
        || ""
      );
      tabletopElements.masterPhoneSessionSelect.innerHTML = '<option value="">Escolha uma missao</option>';
      sessionRecords.forEach((mission) => {
        const option = document.createElement("option");
        option.value = String(mission.id || "");
        option.textContent = `${mission.missionTitle || mission.name || "Missao"} (${mission.id || "-"})`;
        tabletopElements.masterPhoneSessionSelect.appendChild(option);
      });
      tabletopElements.masterPhoneSessionSelect.value = sessionRecords.some((mission) => String(mission.id || "") === currentValue)
        ? currentValue
        : "";
    }

    const sessionRecord = getCurrentSessionRecordForPhone();
    if (tabletopElements.masterPhoneSessionMeta) {
      tabletopElements.masterPhoneSessionMeta.textContent = sessionRecord
        ? `Sessao atual: ${sessionRecord.missionTitle || sessionRecord.name || "Missao"} | codigo ${getCurrentSessionCodeForPhone()} | ${sessionRecord.status === "active" ? "em andamento" : "lobby"}`
        : "Abra uma missao criada pelo mestre para sincronizar mesa, som e relogio entre dispositivos.";
    }

    if (tabletopElements.masterPhoneSessionOpen) {
      tabletopElements.masterPhoneSessionOpen.disabled = !firebaseReadyForPhone() || !String(tabletopElements.masterPhoneSessionSelect?.value || "");
    }
    if (tabletopElements.masterPhoneSessionCopy) {
      tabletopElements.masterPhoneSessionCopy.disabled = !getCurrentSessionCodeForPhone();
    }
    if (tabletopElements.masterPhoneSessionClose) {
      tabletopElements.masterPhoneSessionClose.disabled = !sessionRecord;
    }
    if (tabletopElements.masterPhoneSessionCreate) {
      const hasTitle = Boolean(tabletopElements.masterPhoneSessionTitle?.value.trim());
      const hasIntro = Boolean(tabletopElements.masterPhoneSessionIntro?.value.trim());
      tabletopElements.masterPhoneSessionCreate.disabled = !firebaseReadyForPhone() || !hasTitle || !hasIntro;
    }

    const timer = getTabletopDirectorState().sessionTimer;
    if (tabletopElements.masterPhoneTimerStart) {
      tabletopElements.masterPhoneTimerStart.textContent = timer?.running ? "Rodando" : (Number(timer?.elapsedMs || 0) > 0 ? "Retomar" : "Iniciar");
      tabletopElements.masterPhoneTimerStart.disabled = Boolean(timer?.running);
    }
    if (tabletopElements.masterPhoneTimerPause) {
      tabletopElements.masterPhoneTimerPause.disabled = !Boolean(timer?.running);
    }
    if (tabletopElements.masterPhoneTimerReset) {
      tabletopElements.masterPhoneTimerReset.disabled = !Boolean(timer?.running) && !Number(timer?.elapsedMs || 0);
    }

    const remoteSource = getTabletopRemoteSource();
    if (tabletopElements.masterPhoneSoundMeta) {
      tabletopElements.masterPhoneSoundMeta.textContent = remoteSource
        ? (canEdit
          ? `A sessao ${String(remoteSource?.source?.missionTitle || remoteSource?.source?.name || remoteSource.roomId || "")} esta pronta para receber som sincronizado.`
          : "Abra uma sessao sua na Mesa Tatica para disparar som sincronizado.")
        : "Abra uma sessao na Mesa Tatica para disparar som para todos ao mesmo tempo.";
    }
    if (tabletopElements.masterPhoneSoundPlay) {
      tabletopElements.masterPhoneSoundPlay.disabled = !remoteSource || !canEdit;
    }

    renderMasterPhoneSoundLibrary();
    renderMasterPhoneGallery();
    renderMasterPhoneInventoryFeed();
    renderMasterPhoneNpcFeed();
    renderMasterPhoneDiaryFeed();
    syncMasterPhoneLiveReadouts();
  }

  function getMasterPhoneInventoryItems() {
    try {
      if (typeof getOrderedMasterInventoryTemplates === "function") {
        return getOrderedMasterInventoryTemplates();
      }
      if (typeof loadMasterInventoryTemplates === "function") {
        return loadMasterInventoryTemplates()
          .slice()
          .sort((itemA, itemB) => String(itemA?.updatedAt || "") < String(itemB?.updatedAt || "") ? 1 : -1);
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  function getMasterPhoneNpcItems() {
    try {
      if (typeof loadMasterNpcs === "function") {
        return loadMasterNpcs()
          .slice()
          .sort((npcA, npcB) => String(npcA?.updatedAt || "") < String(npcB?.updatedAt || "") ? 1 : -1);
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  function getMasterPhoneDiaryItems() {
    try {
      const diary = typeof loadCampaignDiary === "function"
        ? loadCampaignDiary()
        : { sessions: [] };
      return Array.isArray(diary?.sessions)
        ? diary.sessions.slice().sort((itemA, itemB) => String(itemA?.updatedAt || "") < String(itemB?.updatedAt || "") ? 1 : -1)
        : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function getMasterPhoneSoundEntries() {
    const presetEntries = Object.entries(MASTER_PHONE_SOUND_PRESETS).map(([presetKey, preset]) => ({
      id: `preset:${presetKey}`,
      kind: "preset",
      preset: presetKey,
      name: preset.label,
      meta: "Som rapido do sistema",
    }));
    const customEntries = tabletopMasterPhoneLibrary.sounds
      .slice()
      .sort((itemA, itemB) => String(itemA.updatedAt || "") < String(itemB.updatedAt || "") ? 1 : -1)
      .map((item) => ({
        id: `custom:${item.id}`,
        kind: "custom",
        preset: "",
        name: item.name,
        meta: "Arquivo salvo do dispositivo",
        audioDataUrl: item.audioDataUrl,
        soundId: item.id,
      }));
    return [...presetEntries, ...customEntries];
  }

  function getSelectedMasterPhoneSoundEntry() {
    const selectedValue = String(tabletopElements.masterPhoneSoundSelect?.value || tabletopMasterPhoneSelectedSoundId || "preset:alert");
    return getMasterPhoneSoundEntries().find((entry) => entry.id === selectedValue) || getMasterPhoneSoundEntries()[0] || null;
  }

  function renderMasterPhoneSoundLibrary() {
    if (!tabletopElements.masterPhoneSoundList || !tabletopElements.masterPhoneSoundSelect) {
      return;
    }

    const entries = getMasterPhoneSoundEntries();
    const currentValue = entries.some((entry) => entry.id === tabletopMasterPhoneSelectedSoundId)
      ? tabletopMasterPhoneSelectedSoundId
      : (entries[0]?.id || "preset:alert");
    tabletopMasterPhoneSelectedSoundId = currentValue;
    tabletopElements.masterPhoneSoundSelect.innerHTML = "";
    entries.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = entry.name;
      tabletopElements.masterPhoneSoundSelect.appendChild(option);
    });
    tabletopElements.masterPhoneSoundSelect.value = currentValue;

    tabletopElements.masterPhoneSoundList.innerHTML = "";
    entries.forEach((entry) => {
      const card = document.createElement("article");
      card.className = entry.id === currentValue
        ? "tabletop-master-phone-card is-selected"
        : "tabletop-master-phone-card";

      const copy = document.createElement("div");
      copy.className = "tabletop-master-phone-card-copy";
      const title = document.createElement("strong");
      title.textContent = entry.name;
      const meta = document.createElement("span");
      meta.textContent = entry.meta;
      copy.appendChild(title);
      copy.appendChild(meta);

      const actions = document.createElement("div");
      actions.className = "tabletop-master-phone-card-actions";

      const chooseButton = document.createElement("button");
      chooseButton.type = "button";
      chooseButton.className = entry.id === currentValue ? "primary" : "secondary";
      chooseButton.textContent = entry.id === currentValue ? "Selecionado" : "Escolher";
      chooseButton.addEventListener("click", () => {
        tabletopMasterPhoneSelectedSoundId = entry.id;
        renderMasterPhone();
      });

      const previewButton = document.createElement("button");
      previewButton.type = "button";
      previewButton.className = "secondary";
      previewButton.textContent = "Ouvir";
      previewButton.addEventListener("click", () => {
        tabletopMasterPhoneSelectedSoundId = entry.id;
        renderMasterPhone();
        playSharedSoundCue({
          id: `preview-${entry.id}`,
          preset: entry.kind === "preset" ? entry.preset : "custom",
          audioDataUrl: entry.audioDataUrl || "",
          soundId: entry.soundId || "",
          playAt: new Date(Date.now() + 120).toISOString(),
        });
      });

      actions.appendChild(chooseButton);
      actions.appendChild(previewButton);

      if (entry.kind === "custom") {
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "menu-delete-btn";
        removeButton.textContent = "Excluir";
        removeButton.addEventListener("click", () => {
          tabletopMasterPhoneLibrary.sounds = tabletopMasterPhoneLibrary.sounds.filter((item) => item.id !== entry.soundId);
          tabletopMasterPhoneAudioBufferCache.delete(entry.soundId);
          if (!tabletopMasterPhoneLibrary.sounds.some((item) => `custom:${item.id}` === tabletopMasterPhoneSelectedSoundId)) {
            tabletopMasterPhoneSelectedSoundId = "preset:alert";
          }
          saveMasterPhoneLibrary();
          renderMasterPhone();
        });
        actions.appendChild(removeButton);
      }

      card.appendChild(copy);
      card.appendChild(actions);
      tabletopElements.masterPhoneSoundList.appendChild(card);
    });
  }

  function renderMasterPhoneGallery() {
    if (!tabletopElements.masterPhoneGalleryList) {
      return;
    }
    tabletopElements.masterPhoneGalleryList.innerHTML = "";
    if (!tabletopMasterPhoneLibrary.gallery.length) {
      tabletopElements.masterPhoneGalleryList.innerHTML = '<div class="tabletop-master-phone-empty">Nenhuma imagem guardada no celular ainda.</div>';
      return;
    }

    tabletopMasterPhoneLibrary.gallery
      .slice()
      .sort((itemA, itemB) => String(itemA.updatedAt || "") < String(itemB.updatedAt || "") ? 1 : -1)
      .forEach((item) => {
        const card = document.createElement("article");
        card.className = "tabletop-master-phone-gallery-card";

        const previewButton = document.createElement("button");
        previewButton.type = "button";
        previewButton.className = "tabletop-master-phone-gallery-preview";
        previewButton.style.backgroundImage = toCssUrl(item.image);
        previewButton.setAttribute("aria-label", item.name);
        previewButton.addEventListener("click", () => openTabletopImageViewer({ src: item.image, title: item.name }));

        const label = document.createElement("strong");
        label.textContent = item.name;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "menu-delete-btn";
        removeButton.textContent = "Excluir";
        removeButton.addEventListener("click", () => {
          tabletopMasterPhoneLibrary.gallery = tabletopMasterPhoneLibrary.gallery.filter((entry) => entry.id !== item.id);
          saveMasterPhoneLibrary();
          renderMasterPhone();
        });

        card.appendChild(previewButton);
        card.appendChild(label);
        card.appendChild(removeButton);
        tabletopElements.masterPhoneGalleryList.appendChild(card);
      });
  }

  function renderMasterPhoneInventoryFeed() {
    renderMasterPhoneListFeed(
      tabletopElements.masterPhoneInventoryList,
      getMasterPhoneInventoryItems().slice(0, 10).map((item) => ({
        title: item.name || "Item",
        meta: [item.type || "Outro", item.rarity || "comum", item.status || "guardado"].filter(Boolean).join(" | "),
      })),
      "Nenhum item pronto salvo no arsenal."
    );
  }

  function renderMasterPhoneNpcFeed() {
    renderMasterPhoneListFeed(
      tabletopElements.masterPhoneNpcList,
      getMasterPhoneNpcItems().slice(0, 10).map((npc) => ({
        title: npc.name || "NPC",
        meta: [npc.role || npc.kind || "registro", npc.hp ? `PV ${npc.hp}` : "", npc.location || ""].filter(Boolean).join(" | "),
      })),
      "Nenhum NPC salvo no arquivo rapido."
    );
  }

  function renderMasterPhoneDiaryFeed() {
    renderMasterPhoneListFeed(
      tabletopElements.masterPhoneDiaryList,
      getMasterPhoneDiaryItems().slice(0, 10).map((session) => ({
        title: session.title || "Sessao",
        meta: [session.summary || "", formatPhoneDate(session.updatedAt || session.createdAt || "")].filter(Boolean).join(" | "),
      })),
      "Nenhum relatorio registrado ainda."
    );
  }

  function renderMasterPhoneListFeed(container, items, emptyText) {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    if (!items.length) {
      container.innerHTML = `<div class="tabletop-master-phone-empty">${emptyText}</div>`;
      return;
    }
    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "tabletop-master-phone-card";
      const copy = document.createElement("div");
      copy.className = "tabletop-master-phone-card-copy";
      const title = document.createElement("strong");
      title.textContent = item.title;
      const meta = document.createElement("span");
      meta.textContent = item.meta || "";
      copy.appendChild(title);
      copy.appendChild(meta);
      card.appendChild(copy);
      container.appendChild(card);
    });
  }

  function formatPhoneDate(value) {
    const timestamp = new Date(value || "").getTime();
    if (!Number.isFinite(timestamp) || Number.isNaN(timestamp)) {
      return "";
    }
    return new Date(timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  async function handleMasterPhoneSoundUploadChange(event) {
    const files = Array.from(event.target?.files || []);
    if (!files.length) {
      return;
    }

    try {
      const nextItems = [];
      for (const file of files) {
        if (file.size > MASTER_PHONE_MAX_SOUND_BYTES) {
          notifyTabletop(`O som "${file.name}" passou do limite de 2 MB para envio sincronizado.`, "warning");
          continue;
        }
        nextItems.push({
          id: makeId("phone-sound"),
          name: getTokenNameFromFileName(file.name, nextItems.length),
          audioDataUrl: await readFileAsDataUrl(file),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      if (nextItems.length) {
        tabletopMasterPhoneLibrary.sounds = [...nextItems, ...tabletopMasterPhoneLibrary.sounds];
        tabletopMasterPhoneSelectedSoundId = `custom:${nextItems[0].id}`;
        saveMasterPhoneLibrary();
        renderMasterPhone();
      }
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel guardar esse som no celular.", "danger");
    } finally {
      if (event.target) {
        event.target.value = "";
      }
    }
  }

  async function handleMasterPhoneGalleryUploadChange(event) {
    const files = Array.from(event.target?.files || []);
    if (!files.length) {
      return;
    }

    try {
      const nextItems = await Promise.all(files.map(async (file, index) => ({
        id: makeId(`phone-image-${index}`),
        name: getTokenNameFromFileName(file.name, index),
        image: await readFileAsDataUrl(file),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })));
      tabletopMasterPhoneLibrary.gallery = [...nextItems, ...tabletopMasterPhoneLibrary.gallery];
      saveMasterPhoneLibrary();
      renderMasterPhone();
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel guardar essa imagem no celular.", "danger");
    } finally {
      if (event.target) {
        event.target.value = "";
      }
    }
  }

  function openTabletopImageViewer(payload = {}) {
    const src = String(payload.src || "").trim();
    if (!src || !tabletopElements.imageViewer || !tabletopElements.imageViewerImage) {
      return;
    }
    tabletopImageViewerState = {
      src,
      title: String(payload.title || "").trim(),
    };
    tabletopElements.imageViewerImage.src = tabletopImageViewerState.src;
    tabletopElements.imageViewerImage.alt = tabletopImageViewerState.title || "Imagem ampliada";
    if (tabletopElements.imageViewerTitle) {
      tabletopElements.imageViewerTitle.textContent = tabletopImageViewerState.title;
    }
    tabletopElements.imageViewer.classList.remove("hidden");
    tabletopElements.imageViewer.setAttribute("aria-hidden", "false");
  }

  function closeTabletopImageViewer() {
    if (!tabletopElements.imageViewer || tabletopElements.imageViewer.classList.contains("hidden")) {
      return;
    }
    tabletopElements.imageViewer.classList.add("hidden");
    tabletopElements.imageViewer.setAttribute("aria-hidden", "true");
    if (tabletopElements.imageViewerImage) {
      tabletopElements.imageViewerImage.src = "";
      tabletopElements.imageViewerImage.alt = "Imagem ampliada";
    }
    if (tabletopElements.imageViewerTitle) {
      tabletopElements.imageViewerTitle.textContent = "";
    }
    tabletopImageViewerState = { src: "", title: "" };
  }

  function firebaseReadyForPhone() {
    return typeof firebaseReady !== "undefined" && Boolean(firebaseReady) && typeof firebaseDatabaseRef !== "undefined" && Boolean(firebaseDatabaseRef);
  }

  async function handleMasterPhoneOpenSession() {
    const missionId = String(tabletopElements.masterPhoneSessionSelect?.value || "");
    if (!missionId) {
      notifyTabletop("Escolha uma sessao criada pelo mestre antes de abrir.", "warning");
      return;
    }
    if (typeof subscribeToMissionPanel === "function") {
      subscribeToMissionPanel(missionId);
    }
    notifyTabletop(`Sessao ${missionId} aberta na Mesa Tatica.`, "success");
    renderMasterPhone();
  }

  async function handleMasterPhoneCopySessionCode() {
    const code = getCurrentSessionCodeForPhone();
    if (!code) {
      notifyTabletop("Nenhuma sessao aberta para copiar agora.", "warning");
      return;
    }
    if (typeof copySelectedMissionCode === "function" && typeof selectedMissionId !== "undefined" && selectedMissionId) {
      await copySelectedMissionCode();
      return;
    }
    if (typeof copyCurrentRoomCode === "function" && typeof currentRoomId !== "undefined" && currentRoomId) {
      await copyCurrentRoomCode();
      return;
    }
    if (typeof copyToClipboard === "function") {
      const copied = await copyToClipboard(code);
      if (!copied) {
        window.prompt("Copie o codigo da missao:", code);
      }
    }
  }

  function handleMasterPhoneCloseSession() {
    if (typeof closeSelectedMissionPanel === "function") {
      closeSelectedMissionPanel(true);
    }
    renderMasterPhone();
    notifyTabletop("Painel da sessao fechado na Mesa Tatica.", "status");
  }

  async function handleMasterPhoneCreateSession() {
    if (!isMasterModeUnlocked()) {
      notifyTabletop("Somente o mestre cria sessoes por aqui.", "warning");
      return;
    }
    if (!firebaseReadyForPhone()) {
      notifyTabletop("Firebase indisponivel para criar uma sessao agora.", "danger");
      return;
    }

    const missionTitle = String(tabletopElements.masterPhoneSessionTitle?.value || "").trim();
    const missionIntro = String(tabletopElements.masterPhoneSessionIntro?.value || "").trim();
    if (!missionTitle || !missionIntro) {
      notifyTabletop("Preencha o titulo e a introducao da sessao.", "warning");
      return;
    }

    try {
      const user = await ensureFirebaseAuth();
      const missionId = typeof generateRoomCode === "function" ? generateRoomCode() : makeId("room").slice(-6).toUpperCase();
      await firebaseDatabaseRef.ref(`rooms/${missionId}`).set({
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
      if (tabletopElements.masterPhoneSessionTitle) {
        tabletopElements.masterPhoneSessionTitle.value = "";
      }
      if (tabletopElements.masterPhoneSessionIntro) {
        tabletopElements.masterPhoneSessionIntro.value = "";
      }
      if (typeof subscribeToMissionPanel === "function") {
        subscribeToMissionPanel(missionId);
      }
      notifyTabletop(`Sessao ${missionId} criada e aberta na Mesa Tatica.`, "success");
      renderMasterPhone();
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel criar a sessao agora.", "danger");
    }
  }

  function startMasterPhoneTimer() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const timer = getTabletopDirectorState().sessionTimer || createEmptyTabletopSessionTimer();
    if (timer.running) {
      return;
    }
    tabletopState.director.sessionTimer = normalizeTabletopSessionTimer({
      ...timer,
      running: true,
      startedAt: new Date().toISOString(),
    });
    saveTabletopState();
    renderMasterPhone();
  }

  function pauseMasterPhoneTimer() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const timer = getTabletopDirectorState().sessionTimer || createEmptyTabletopSessionTimer();
    if (!timer.running) {
      return;
    }
    tabletopState.director.sessionTimer = normalizeTabletopSessionTimer({
      ...timer,
      elapsedMs: getMasterPhoneTimerElapsedMs(),
      running: false,
      startedAt: "",
    });
    saveTabletopState();
    renderMasterPhone();
  }

  function resetMasterPhoneTimer() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    tabletopState.director.sessionTimer = createEmptyTabletopSessionTimer();
    saveTabletopState();
    renderMasterPhone();
  }

  function triggerMasterPhoneSoundCue() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const remoteSource = getTabletopRemoteSource();
    if (!remoteSource) {
      notifyTabletop("Abra uma sessao compartilhada antes de tocar som para todos.", "warning");
      return;
    }
    const selectedEntry = getSelectedMasterPhoneSoundEntry();
    if (!selectedEntry) {
      notifyTabletop("Escolha um som para disparar.", "warning");
      return;
    }
    const cue = {
      id: makeId("cue"),
      preset: selectedEntry.kind === "preset" ? selectedEntry.preset : "custom",
      audioDataUrl: selectedEntry.audioDataUrl || "",
      soundId: selectedEntry.soundId || "",
      label: selectedEntry.name,
      createdAt: new Date().toISOString(),
      playAt: new Date(Date.now() + 1200).toISOString(),
      by: typeof firebaseUser !== "undefined" ? String(firebaseUser?.uid || "") : "",
      roomId: remoteSource.roomId,
    };
    tabletopState.director.soundCue = cue;
    tabletopMasterPhoneLastCueId = cue.id;
    saveTabletopState();
    playSharedSoundCue(cue);
    notifyTabletop(`Efeito "${selectedEntry.name || "Som"}" disparado para a sessao.`, "success");
    renderMasterPhone();
  }

  function handleSharedMasterPhoneState(roomSource) {
    const remoteTabletop = roomSource?.tabletop && typeof roomSource.tabletop === "object"
      ? normalizeTabletopState(roomSource.tabletop)
      : (roomSource?.director || roomSource?.scenes ? normalizeTabletopState(roomSource) : null);
    const cue = remoteTabletop?.director?.soundCue || null;
    if (!cue?.id || cue.id === tabletopMasterPhoneLastCueId) {
      return;
    }
    tabletopMasterPhoneLastCueId = cue.id;
    playSharedSoundCue(cue);
  }

  function getMasterPhoneAudioContext() {
    const AudioContextRef = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextRef) {
      return null;
    }
    if (!tabletopMasterPhoneAudioContext) {
      tabletopMasterPhoneAudioContext = new AudioContextRef();
    }
    if (tabletopMasterPhoneAudioContext.state === "suspended") {
      void tabletopMasterPhoneAudioContext.resume();
    }
    return tabletopMasterPhoneAudioContext;
  }

  function primeMasterPhoneAudio() {
    getMasterPhoneAudioContext();
  }

  function playSharedSoundCue(cue) {
    const audioContext = getMasterPhoneAudioContext();
    if (!audioContext) {
      return;
    }

    const playAtMs = cue?.playAt ? new Date(cue.playAt).getTime() : Date.now();
    const delaySeconds = Number.isFinite(playAtMs)
      ? Math.max(0.02, (playAtMs - Date.now()) / 1000)
      : 0.02;

    if (cue?.audioDataUrl) {
      void loadMasterPhoneAudioBuffer(cue.soundId || cue.id || "custom", cue.audioDataUrl).then((audioBuffer) => {
        if (!audioBuffer) {
          return;
        }
        const liveDelaySeconds = Number.isFinite(playAtMs)
          ? Math.max(0.02, (playAtMs - Date.now()) / 1000)
          : 0.02;
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.96;
        source.buffer = audioBuffer;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start(audioContext.currentTime + liveDelaySeconds);
      }).catch((error) => {
        console.error(error);
      });
      return;
    }

    const presetKey = String(cue?.preset || "alert");
    const preset = MASTER_PHONE_SOUND_PRESETS[presetKey] || MASTER_PHONE_SOUND_PRESETS.alert;
    let cursor = audioContext.currentTime + delaySeconds;
    preset.tones.forEach(([frequency, duration], index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = preset.type || "triangle";
      oscillator.frequency.setValueAtTime(Number(frequency) || 440, cursor);
      gainNode.gain.setValueAtTime(0.0001, cursor);
      gainNode.gain.linearRampToValueAtTime(preset.gain || 0.08, cursor + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, cursor + Math.max(0.04, Number(duration) || 0.12));
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(cursor);
      oscillator.stop(cursor + Math.max(0.05, Number(duration) || 0.12));
      cursor += Math.max(0.08, Number(duration) || 0.12) + (index < preset.tones.length - 1 ? 0.04 : 0);
    });
  }

  async function loadMasterPhoneAudioBuffer(cacheKey, audioDataUrl) {
    const resolvedKey = String(cacheKey || audioDataUrl || "");
    if (tabletopMasterPhoneAudioBufferCache.has(resolvedKey)) {
      return tabletopMasterPhoneAudioBufferCache.get(resolvedKey);
    }
    const audioContext = getMasterPhoneAudioContext();
    if (!audioContext) {
      return null;
    }
    const response = await fetch(audioDataUrl);
    const arrayBuffer = await response.arrayBuffer();
    const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
    tabletopMasterPhoneAudioBufferCache.set(resolvedKey, decodedBuffer);
    return decodedBuffer;
  }

  function mountTabletopStandaloneScreen() {
    if (!tabletopElements.standaloneScreen || tabletopElements.view.parentElement === tabletopElements.standaloneScreen) {
      return;
    }
    tabletopElements.standaloneScreen.appendChild(tabletopElements.view);
  }

  function mountMasterPhoneOverlay() {
    if (tabletopElements.masterPhoneDock && tabletopElements.masterPhoneDock.parentElement !== document.body) {
      document.body.appendChild(tabletopElements.masterPhoneDock);
    }
    if (tabletopElements.masterPhone && tabletopElements.masterPhone.parentElement !== document.body) {
      document.body.appendChild(tabletopElements.masterPhone);
    }
    if (tabletopElements.imageViewer && tabletopElements.imageViewer.parentElement !== document.body) {
      document.body.appendChild(tabletopElements.imageViewer);
    }
  }

  function createEmptyMasterPhoneLibrary() {
    return {
      gallery: [],
      sounds: [],
      updatedAt: new Date().toISOString(),
    };
  }

  function normalizeMasterPhoneGalleryItem(rawItem, index = 0) {
    if (!rawItem || typeof rawItem !== "object") {
      return null;
    }
    const image = String(rawItem.image || rawItem.dataUrl || "").trim();
    if (!image) {
      return null;
    }
    const now = new Date().toISOString();
    return {
      id: ensureId(rawItem.id, `phone-image-${index}`),
      name: String(rawItem.name || `Imagem ${index + 1}`).trim() || `Imagem ${index + 1}`,
      image,
      createdAt: String(rawItem.createdAt || now),
      updatedAt: String(rawItem.updatedAt || now),
    };
  }

  function normalizeMasterPhoneSoundItem(rawItem, index = 0) {
    if (!rawItem || typeof rawItem !== "object") {
      return null;
    }
    const audioDataUrl = String(rawItem.audioDataUrl || rawItem.dataUrl || "").trim();
    if (!audioDataUrl) {
      return null;
    }
    const now = new Date().toISOString();
    return {
      id: ensureId(rawItem.id, `phone-sound-${index}`),
      name: String(rawItem.name || `Som ${index + 1}`).trim() || `Som ${index + 1}`,
      audioDataUrl,
      createdAt: String(rawItem.createdAt || now),
      updatedAt: String(rawItem.updatedAt || now),
    };
  }

  function normalizeMasterPhoneLibrary(rawLibrary) {
    if (!rawLibrary || typeof rawLibrary !== "object") {
      return createEmptyMasterPhoneLibrary();
    }
    return {
      gallery: Array.isArray(rawLibrary.gallery)
        ? rawLibrary.gallery.map((item, index) => normalizeMasterPhoneGalleryItem(item, index)).filter(Boolean)
        : [],
      sounds: Array.isArray(rawLibrary.sounds)
        ? rawLibrary.sounds.map((item, index) => normalizeMasterPhoneSoundItem(item, index)).filter(Boolean)
        : [],
      updatedAt: String(rawLibrary.updatedAt || new Date().toISOString()),
    };
  }

  function loadMasterPhoneLibrary() {
    try {
      const raw = localStorage.getItem(MASTER_PHONE_LIBRARY_STORAGE_KEY);
      return raw ? normalizeMasterPhoneLibrary(JSON.parse(raw)) : createEmptyMasterPhoneLibrary();
    } catch (error) {
      console.error(error);
      return createEmptyMasterPhoneLibrary();
    }
  }

  function saveMasterPhoneLibrary(nextLibrary = tabletopMasterPhoneLibrary) {
    tabletopMasterPhoneLibrary = normalizeMasterPhoneLibrary(nextLibrary);
    tabletopMasterPhoneLibrary.updatedAt = new Date().toISOString();
    try {
      if (typeof persistJsonWithRecovery === "function") {
        persistJsonWithRecovery(MASTER_PHONE_LIBRARY_STORAGE_KEY, tabletopMasterPhoneLibrary);
      } else {
        localStorage.setItem(MASTER_PHONE_LIBRARY_STORAGE_KEY, JSON.stringify(tabletopMasterPhoneLibrary));
      }
      return true;
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel salvar a biblioteca do celular.", "warning");
      return false;
    }
  }

  function loadTabletopState() {
    try {
      const raw = localStorage.getItem(TABLETOP_STORAGE_KEY);
      return raw ? normalizeTabletopState(JSON.parse(raw)) : createDefaultTabletopState();
    } catch (error) {
      console.error(error);
      return createDefaultTabletopState();
    }
  }

  function saveTabletopState(nextState = tabletopState, options = {}) {
    tabletopState = normalizeTabletopState(nextState);
    tabletopState.updatedAt = new Date().toISOString();
    try {
      if (typeof persistJsonWithRecovery === "function") {
        persistJsonWithRecovery(TABLETOP_STORAGE_KEY, tabletopState);
      } else {
        localStorage.setItem(TABLETOP_STORAGE_KEY, JSON.stringify(tabletopState));
      }
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel salvar a mesa tatica. Exporte a cena antes de recarregar para nao perder as mudancas.", "danger");
      return false;
    }

    if (!options.skipRemote) {
      void syncTabletopStateToRoom(tabletopState, options.remoteSync || {});
    }

    return true;
  }

  function refreshTabletopRemoteState(options = {}) {
    const remoteSource = getTabletopRemoteSource();
    if (remoteSource?.tabletop) {
      tabletopState = normalizeTabletopState(remoteSource.tabletop);
      handleSharedMasterPhoneState(remoteSource.tabletop);
      syncTabletopViewerSceneId(remoteSource);
      ensureTabletopSelection();
    } else if (remoteSource && !canEditCurrentTabletop(remoteSource)) {
      tabletopState = createEmptyTabletopState();
      tabletopSelectedTokenId = "";
      tabletopViewerSceneId = "";
    } else if (options.force && remoteSource && canEditCurrentTabletop(remoteSource)) {
      void syncTabletopStateToRoom(tabletopState);
    }

    if (!options.silent || !tabletopElements.view.classList.contains("hidden")) {
      renderTabletopView();
    }
  }

  async function syncTabletopStateToRoom(nextState, options = {}) {
    const remoteSource = getTabletopRemoteSource();
    const canEdit = canEditCurrentTabletop(remoteSource);
    const allowPlayerMove = Boolean(options.allowPlayerMove);
    if (!remoteSource || (!canEdit && (!allowPlayerMove || !canMoveTokensCurrentTabletop(remoteSource)))) {
      return;
    }
    if (
      typeof firebaseReady === "undefined"
      || !firebaseReady
      || typeof firebaseDatabaseRef === "undefined"
      || !firebaseDatabaseRef
    ) {
      return;
    }

    const payload = normalizeTabletopState(nextState);
    payload.updatedAt = new Date().toISOString();

    try {
      if (typeof ensureFirebaseAuth === "function") {
        await ensureFirebaseAuth();
      }

      await firebaseDatabaseRef.ref(`rooms/${remoteSource.roomId}`).update({
        tabletop: {
          ...payload,
          updatedBy: typeof firebaseUser !== "undefined" && firebaseUser?.uid ? firebaseUser.uid : "",
        },
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel sincronizar a mesa compartilhada agora.", "warning");
    }
  }

  function getTabletopRemoteSource() {
    const source = getMissionRoomSource();
    if (!source || typeof source !== "object") {
      return null;
    }

    const roomId = String(
      source.id
      || source.roomId
      || source.code
      || (typeof selectedMissionId !== "undefined" ? selectedMissionId : "")
      || (typeof currentRoomId !== "undefined" ? currentRoomId : "")
      || ""
    );
    if (!roomId) {
      return null;
    }

    return {
      roomId,
      source,
      tabletop: source.tabletop && typeof source.tabletop === "object"
        ? source.tabletop
        : null,
    };
  }

  function canEditCurrentTabletop(remoteSource = getTabletopRemoteSource()) {
    if (!isMasterModeUnlocked()) {
      return false;
    }

    if (!remoteSource || !remoteSource.source?.hostUid) {
      return true;
    }

    if (typeof firebaseUser === "undefined" || !firebaseUser?.uid) {
      return false;
    }

    return firebaseUser.uid === remoteSource.source.hostUid;
  }

  function canMoveTokensCurrentTabletop(remoteSource = getTabletopRemoteSource()) {
    if (!remoteSource || !remoteSource.source?.hostUid) {
      return true;
    }

    if (typeof firebaseUser === "undefined" || !firebaseUser?.uid) {
      return false;
    }

    if (firebaseUser.uid === remoteSource.source.hostUid) {
      return true;
    }

    return Boolean(remoteSource.source?.participants?.[firebaseUser.uid]);
  }

  function getCurrentRoomParticipant(remoteSource = getTabletopRemoteSource()) {
    if (!remoteSource?.source?.hostUid || typeof firebaseUser === "undefined" || !firebaseUser?.uid) {
      return null;
    }
    const participant = remoteSource.source?.participants?.[firebaseUser.uid];
    return participant && typeof participant === "object" ? participant : null;
  }

  function getCurrentPlayerTokenAccess(remoteSource = getTabletopRemoteSource()) {
    const uid = typeof firebaseUser !== "undefined" ? String(firebaseUser?.uid || "") : "";
    const sourceKeys = new Set();
    const characterIds = new Set();
    if (!uid) {
      return { uid: "", participant: null, sourceKeys, characterIds };
    }

    const participant = getCurrentRoomParticipant(remoteSource);
    if (!participant) {
      return { uid, participant: null, sourceKeys, characterIds };
    }

    const roomId = String(remoteSource?.roomId || remoteSource?.source?.id || remoteSource?.source?.roomId || remoteSource?.source?.code || "missao");
    sourceKeys.add(`mission:${roomId}:participant:${uid}`);

    const snapshot = participant?.snapshot && typeof participant.snapshot === "object" ? participant.snapshot : {};
    const snapshotId = String(snapshot.id || "").trim();
    if (snapshotId) {
      sourceKeys.add(`character:${snapshotId}`);
      characterIds.add(snapshotId);
    }

    return { uid, participant, sourceKeys, characterIds };
  }

  function canMoveSpecificTokenCurrentTabletop(token, remoteSource = getTabletopRemoteSource()) {
    if (!token || !canMoveTokensCurrentTabletop(remoteSource)) {
      return false;
    }
    if (!remoteSource || !remoteSource.source?.hostUid || canEditCurrentTabletop(remoteSource)) {
      return true;
    }

    const playerAccess = getCurrentPlayerTokenAccess(remoteSource);
    if (!playerAccess.participant) {
      return false;
    }

    const sourceKey = String(token.sourceKey || "");
    const ownerUid = String(token.ownerUid || "");
    const ownerCharacterId = String(token.ownerCharacterId || "");
    return (ownerUid && ownerUid === playerAccess.uid)
      || (sourceKey && playerAccess.sourceKeys.has(sourceKey))
      || (ownerCharacterId && playerAccess.characterIds.has(ownerCharacterId));
  }

  function isSceneVisibleToPlayers(scene) {
    return Boolean(scene) && scene.playerVisible !== false;
  }

  function getAccessibleScenes(remoteSource = getTabletopRemoteSource()) {
    const scenes = Array.isArray(tabletopState.scenes) ? tabletopState.scenes : [];
    return canEditCurrentTabletop(remoteSource) ? scenes : scenes.filter((scene) => isSceneVisibleToPlayers(scene));
  }

  function syncTabletopViewerSceneId(remoteSource = getTabletopRemoteSource()) {
    if (canEditCurrentTabletop(remoteSource)) {
      tabletopViewerSceneId = "";
      return tabletopState.activeSceneId;
    }

    const scenes = getAccessibleScenes(remoteSource);
    const fallbackId = scenes.some((scene) => scene.id === tabletopState.activeSceneId)
      ? tabletopState.activeSceneId
      : scenes[0]?.id || "";
    tabletopViewerSceneId = scenes.some((scene) => scene.id === tabletopViewerSceneId)
      ? tabletopViewerSceneId
      : fallbackId;
    return tabletopViewerSceneId;
  }

  function getSceneGridEnabled(scene, remoteSource = getTabletopRemoteSource()) {
    if (!scene) {
      return false;
    }
    if (canEditCurrentTabletop(remoteSource)) {
      return Boolean(scene.gridEnabled);
    }
    const localPreference = tabletopViewerGridByScene[scene.id];
    return typeof localPreference === "boolean" ? localPreference : Boolean(scene.gridEnabled);
  }

  function syncTabletopPermissions() {
    const canEdit = canEditCurrentTabletop();
    const canMoveTokens = canMoveTokensCurrentTabletop();
    [
      tabletopElements.exportButton,
      tabletopElements.importButton,
      tabletopElements.sceneAdd,
      tabletopElements.sceneName,
      tabletopElements.mapPick,
      tabletopElements.mapClear,
      tabletopElements.sceneVisible,
      tabletopElements.gridEnabled,
      tabletopElements.gridSize,
      tabletopElements.zoom,
      tabletopElements.sceneNotes,
      tabletopElements.importCharacters,
      tabletopElements.importMission,
      tabletopElements.importNpcs,
      tabletopElements.tokenSelectionAll,
      tabletopElements.tokenSelectionClear,
      tabletopElements.tokenSelectionConfirm,
      tabletopElements.tokenSelectionCancel,
      tabletopElements.tokenUpload,
      tabletopElements.tokenSourceSelect,
      tabletopElements.tokenSourceAdd,
      tabletopElements.tokenAdd,
      tabletopElements.tokenLink,
      tabletopElements.tokenRole,
      tabletopElements.tokenImageFit,
      tabletopElements.tokenName,
      tabletopElements.tokenColor,
      tabletopElements.tokenMarker,
      tabletopElements.tokenSize,
      tabletopElements.tokenX,
      tabletopElements.tokenY,
      tabletopElements.tokenImagePick,
      tabletopElements.tokenImageClear,
      tabletopElements.tokenDuplicate,
      tabletopElements.tokenDelete,
      tabletopElements.initPrev,
      tabletopElements.initNext,
      tabletopElements.initRound,
      tabletopElements.initSort,
      tabletopElements.initClear,
      tabletopElements.fogEnabled,
      tabletopElements.fogBrush,
      tabletopElements.fogRevealTool,
      tabletopElements.fogHideTool,
      tabletopElements.fogClear,
      tabletopElements.noteAdd,
      tabletopElements.areaAddCircle,
      tabletopElements.areaAddCone,
      tabletopElements.areaAddLine,
      tabletopElements.pingClear,
      tabletopElements.libraryUpload,
      tabletopElements.libraryType,
      tabletopElements.presetSave,
      tabletopElements.presetSelect,
      tabletopElements.presetApply,
      tabletopElements.presetCreateScene,
      tabletopElements.presetDelete,
    ].forEach((control) => {
      if (control) {
        control.disabled = !canEdit;
      }
    });

    tabletopElements.view.dataset.tabletopMode = canEdit ? "edit" : canMoveTokens ? "player" : "spectator";
    tabletopElements.stageFrame?.classList.toggle("is-player-mode", !canEdit && canMoveTokens);
    tabletopElements.stageFrame?.classList.toggle("is-readonly", !canMoveTokens);
    if (!isMasterModeUnlocked() && tabletopMasterPhoneState.open) {
      tabletopMasterPhoneState.open = false;
      tabletopMasterPhoneState.screen = "home";
    }
    if (!canEdit && (tabletopToolMode === "fog-reveal" || tabletopToolMode === "fog-hide")) {
      tabletopToolMode = "";
    }
    if (!canMoveTokens && tabletopToolMode === "ping") {
      tabletopToolMode = "";
    }
    if (tabletopElements.toolPing) {
      tabletopElements.toolPing.disabled = !canMoveTokens;
    }
    if (tabletopElements.toolMeasure) {
      tabletopElements.toolMeasure.disabled = !getActiveScene();
    }
    if (tabletopElements.toolGrid) {
      tabletopElements.toolGrid.disabled = !getActiveScene();
    }
  }

  function ensureTabletopCanEdit(showNotice = false) {
    const canEdit = canEditCurrentTabletop();
    if (!canEdit && showNotice) {
      notifyTabletop("Somente o host da missao pode editar a mesa compartilhada.", "warning");
    }
    return canEdit;
  }

  function ensureTabletopCanMoveTokens(showNotice = false) {
    const canMove = canMoveTokensCurrentTabletop();
    if (!canMove && showNotice) {
      notifyTabletop("Somente participantes conectados podem mover os tokens da mesa compartilhada.", "warning");
    }
    return canMove;
  }

  function ensureTabletopCanMoveToken(token, showNotice = false) {
    const canMove = canMoveSpecificTokenCurrentTabletop(token);
    if (!canMove && showNotice) {
      if (!canMoveTokensCurrentTabletop()) {
        notifyTabletop("Somente participantes conectados podem mover os tokens da mesa compartilhada.", "warning");
      } else {
        notifyTabletop("No modo jogador, voce move somente o token da sua ficha vinculada.", "warning");
      }
    }
    return canMove;
  }

  function refreshLinkedTabletopTokens(options = {}) {
    const remoteSource = getTabletopRemoteSource();
    if (remoteSource && !canEditCurrentTabletop(remoteSource)) {
      if (options.render !== false && !tabletopElements.view.classList.contains("hidden")) {
        renderTabletopView();
      }
      return false;
    }

    const linkedEntries = buildLinkedSourceEntryMap();
    let changed = false;

    tabletopState.scenes.forEach((scene) => {
      let sceneChanged = false;
      scene.tokens.forEach((token) => {
        const sourceKey = String(token.sourceKey || "");
        if (!sourceKey) {
          return;
        }
        const entry = linkedEntries.get(sourceKey);
        if (syncLinkedTokenWithEntry(token, entry)) {
          sceneChanged = true;
          changed = true;
        }
      });
      if (sceneChanged) {
        scene.updatedAt = new Date().toISOString();
      }
    });

    if (changed) {
      tabletopState.updatedAt = new Date().toISOString();
      saveTabletopState(tabletopState, { skipRemote: !shouldSyncTabletopChangesToRemote(remoteSource) });
      ensureTabletopSelection();
    }

    if (options.render !== false && !tabletopElements.view.classList.contains("hidden")) {
      renderTabletopView();
    }

    return changed;
  }

  function shouldSyncTabletopChangesToRemote(remoteSource = getTabletopRemoteSource()) {
    return Boolean(remoteSource?.tabletop)
      || !tabletopElements.view.classList.contains("hidden")
      || tabletopOpenedOnce;
  }

  function buildLinkedSourceEntryMap() {
    const entries = [
      ...buildCharacterImportEntries(),
      ...buildNpcImportEntries(),
      ...buildMissionImportEntries(),
    ];
    return new Map(entries
      .filter((entry) => entry && typeof entry === "object" && entry.sourceKey)
      .map((entry) => [String(entry.sourceKey), entry]));
  }

  function syncLinkedTokenWithEntry(token, entry) {
    if (!token || !entry) {
      return false;
    }

    let changed = false;
    const nextName = String(entry.name || token.name || "Token").trim() || "Token";
    const nextKind = String(entry.kind || token.kind || "custom");
    const nextColor = normalizeColor(entry.color || token.color);
    const nextImage = String(entry.image || "");
    const nextImageFit = typeof normalizeImageFit === "function"
      ? normalizeImageFit(entry.imageFit, token.imageFit || "cover")
      : String(entry.imageFit || token.imageFit || "cover");
    const nextMarker = String(entry.marker || "");
    const nextOwnerUid = String(entry.ownerUid || "");
    const nextOwnerCharacterId = String(entry.ownerCharacterId || "");

    if (token.name !== nextName) {
      token.name = nextName;
      changed = true;
    }
    if (token.kind !== nextKind) {
      token.kind = nextKind;
      changed = true;
    }
    if (token.color !== nextColor) {
      token.color = nextColor;
      changed = true;
    }
    if (token.image !== nextImage) {
      token.image = nextImage;
      changed = true;
    }
    if (token.imageFit !== nextImageFit) {
      token.imageFit = nextImageFit;
      changed = true;
    }
    if (token.marker !== nextMarker) {
      token.marker = nextMarker;
      changed = true;
    }
    if (token.ownerUid !== nextOwnerUid) {
      token.ownerUid = nextOwnerUid;
      changed = true;
    }
    if (token.ownerCharacterId !== nextOwnerCharacterId) {
      token.ownerCharacterId = nextOwnerCharacterId;
      changed = true;
    }

    if (changed) {
      token.updatedAt = new Date().toISOString();
    }

    return changed;
  }

  function createDefaultTabletopState() {
    const firstScene = createTabletopScene("Cena 01");
    return {
      version: 3,
      activeSceneId: firstScene.id,
      scenes: [firstScene],
      library: createEmptyTabletopLibrary(),
      director: createEmptyTabletopDirectorState(),
      updatedAt: new Date().toISOString(),
    };
  }

  function createEmptyTabletopState() {
    return {
      version: 3,
      activeSceneId: "",
      scenes: [],
      library: createEmptyTabletopLibrary(),
      director: createEmptyTabletopDirectorState(),
      updatedAt: new Date().toISOString(),
    };
  }

  function createEmptyTabletopSessionTimer() {
    return {
      running: false,
      startedAt: "",
      elapsedMs: 0,
      updatedAt: new Date().toISOString(),
    };
  }

  function normalizeTabletopSessionTimer(rawTimer) {
    const elapsedMs = Math.max(0, Number.parseInt(String(rawTimer?.elapsedMs ?? "0"), 10) || 0);
    return {
      running: Boolean(rawTimer?.running),
      startedAt: typeof rawTimer?.startedAt === "string" ? rawTimer.startedAt : "",
      elapsedMs,
      updatedAt: typeof rawTimer?.updatedAt === "string" && rawTimer.updatedAt ? rawTimer.updatedAt : new Date().toISOString(),
    };
  }

  function createEmptyTabletopDirectorState() {
    return {
      sessionTimer: createEmptyTabletopSessionTimer(),
      soundCue: null,
    };
  }

  function normalizeTabletopDirectorState(rawDirector) {
    if (!rawDirector || typeof rawDirector !== "object") {
      return createEmptyTabletopDirectorState();
    }

    return {
      sessionTimer: normalizeTabletopSessionTimer(rawDirector.sessionTimer),
      soundCue: rawDirector.soundCue && typeof rawDirector.soundCue === "object"
        ? {
          id: typeof rawDirector.soundCue.id === "string" ? rawDirector.soundCue.id : "",
          preset: typeof rawDirector.soundCue.preset === "string" ? rawDirector.soundCue.preset : "alert",
          audioDataUrl: typeof rawDirector.soundCue.audioDataUrl === "string" ? rawDirector.soundCue.audioDataUrl : "",
          soundId: typeof rawDirector.soundCue.soundId === "string" ? rawDirector.soundCue.soundId : "",
          label: typeof rawDirector.soundCue.label === "string" ? rawDirector.soundCue.label : "",
          createdAt: typeof rawDirector.soundCue.createdAt === "string" ? rawDirector.soundCue.createdAt : "",
          playAt: typeof rawDirector.soundCue.playAt === "string" ? rawDirector.soundCue.playAt : "",
          by: typeof rawDirector.soundCue.by === "string" ? rawDirector.soundCue.by : "",
          roomId: typeof rawDirector.soundCue.roomId === "string" ? rawDirector.soundCue.roomId : "",
        }
        : null,
    };
  }

  function createTabletopScene(name = "", overrides = {}) {
    const rawName = String(name || overrides.name || "").trim() || "Cena";
    const tokens = normalizeTabletopTokens(overrides.tokens);
    return {
      id: ensureId(overrides.id, "scene"),
      name: rawName,
      notes: String(overrides.notes || ""),
      mapImage: String(overrides.mapImage || ""),
      mapAssetId: String(overrides.mapAssetId || ""),
      playerVisible: overrides.playerVisible !== false,
      gridEnabled: overrides.gridEnabled !== false,
      gridSize: clampNumber(Number.parseInt(String(overrides.gridSize ?? TABLETOP_DEFAULT_GRID_SIZE), 10) || TABLETOP_DEFAULT_GRID_SIZE, TABLETOP_MIN_GRID_SIZE, TABLETOP_MAX_GRID_SIZE),
      zoom: clampNumber(Number(overrides.zoom ?? 1) || 1, TABLETOP_MIN_ZOOM, TABLETOP_MAX_ZOOM),
      fogEnabled: Boolean(overrides.fogEnabled),
      fogBrushSize: clampNumber(Number.parseInt(String(overrides.fogBrushSize ?? 160), 10) || 160, 48, 360),
      fogOpacity: clampNumber(Number(overrides.fogOpacity ?? 0.88) || 0.88, 0.35, 0.95),
      fogReveals: normalizeFogReveals(overrides.fogReveals),
      tokens,
      props: normalizeSceneProps(overrides.props),
      pins: normalizeScenePins(overrides.pins),
      areas: normalizeSceneAreas(overrides.areas),
      initiative: normalizeSceneInitiative(overrides.initiative, tokens),
      pings: normalizeScenePings(overrides.pings),
      createdAt: String(overrides.createdAt || new Date().toISOString()),
      updatedAt: String(overrides.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeTabletopState(rawState) {
    if (!rawState || typeof rawState !== "object") {
      return createDefaultTabletopState();
    }
    const scenes = Array.isArray(rawState.scenes) && rawState.scenes.length
      ? rawState.scenes.map((scene, index) => normalizeTabletopScene(scene, index))
      : [createTabletopScene("Cena 01")];
    const activeSceneId = scenes.some((scene) => scene.id === rawState.activeSceneId)
      ? rawState.activeSceneId
      : scenes[0].id;
    return {
      version: Number.parseInt(String(rawState.version ?? "3"), 10) || 3,
      activeSceneId,
      scenes,
      library: normalizeTabletopLibrary(rawState.library),
      director: normalizeTabletopDirectorState(rawState.director),
      updatedAt: String(rawState.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeTabletopScene(rawScene, index = 0) {
    const fallbackName = `Cena ${String(index + 1).padStart(2, "0")}`;
    return createTabletopScene(rawScene?.name || fallbackName, rawScene || {});
  }

  function normalizeTabletopTokens(rawTokens) {
    return Array.isArray(rawTokens)
      ? rawTokens.map((token, index) => normalizeTabletopToken(token, index)).filter(Boolean)
      : [];
  }

  function normalizeTabletopToken(rawToken, index = 0) {
    if (!rawToken || typeof rawToken !== "object") {
      return null;
    }
    const tokenRole = normalizeTokenRole(rawToken.tokenRole || rawToken.role || guessTokenRole(rawToken.name || rawToken.kind || ""));
    const size = normalizeTokenSize(rawToken.size, tokenRole);
    return {
      id: ensureId(rawToken.id, "token"),
      sourceKey: String(rawToken.sourceKey || ""),
      ownerUid: String(rawToken.ownerUid || ""),
      ownerCharacterId: String(rawToken.ownerCharacterId || ""),
      kind: String(rawToken.kind || "custom"),
      tokenRole,
      name: String(rawToken.name || `Token ${index + 1}`).trim() || "Token",
      color: normalizeColor(rawToken.color || pickTokenColor(rawToken.name || index)),
      image: String(rawToken.image || ""),
      imageFit: typeof normalizeImageFit === "function" ? normalizeImageFit(rawToken.imageFit) : String(rawToken.imageFit || "cover"),
      marker: String(rawToken.marker || ""),
      conditions: normalizeTokenConditions(rawToken.conditions),
      size,
      x: clampTokenCoordinate(rawToken.x, size, TABLETOP_STAGE_WIDTH),
      y: clampTokenCoordinate(rawToken.y, size, TABLETOP_STAGE_HEIGHT),
      createdAt: String(rawToken.createdAt || new Date().toISOString()),
      updatedAt: String(rawToken.updatedAt || new Date().toISOString()),
    };
  }

  function createEmptyTabletopLibrary() {
    return {
      assets: [],
      presets: [],
    };
  }

  function normalizeTabletopLibrary(rawLibrary) {
    if (!rawLibrary || typeof rawLibrary !== "object") {
      return createEmptyTabletopLibrary();
    }
    return {
      assets: Array.isArray(rawLibrary.assets)
        ? rawLibrary.assets.map((asset, index) => normalizeTabletopAsset(asset, index)).filter(Boolean)
        : [],
      presets: Array.isArray(rawLibrary.presets)
        ? rawLibrary.presets.map((preset, index) => normalizeTabletopPreset(preset, index)).filter(Boolean)
        : [],
    };
  }

  function normalizeTabletopAsset(rawAsset, index = 0) {
    if (!rawAsset || typeof rawAsset !== "object") {
      return null;
    }
    const type = normalizeAssetType(rawAsset.type);
    return {
      id: ensureId(rawAsset.id, "asset"),
      type,
      name: String(rawAsset.name || `${type === "map" ? "Mapa" : type === "token" ? "Token" : "Objeto"} ${index + 1}`).trim() || `Asset ${index + 1}`,
      image: String(rawAsset.image || ""),
      tags: Array.isArray(rawAsset.tags) ? rawAsset.tags.map((tag) => String(tag || "").trim()).filter(Boolean).slice(0, 8) : [],
      createdAt: String(rawAsset.createdAt || new Date().toISOString()),
      updatedAt: String(rawAsset.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeTabletopPreset(rawPreset, index = 0) {
    if (!rawPreset || typeof rawPreset !== "object") {
      return null;
    }
    const tokens = normalizeTabletopTokens(rawPreset.tokens);
    return {
      id: ensureId(rawPreset.id, "preset"),
      name: String(rawPreset.name || `Preset ${index + 1}`).trim() || `Preset ${index + 1}`,
      mapImage: String(rawPreset.mapImage || ""),
      mapAssetId: String(rawPreset.mapAssetId || ""),
      notes: String(rawPreset.notes || ""),
      playerVisible: rawPreset.playerVisible !== false,
      gridEnabled: rawPreset.gridEnabled !== false,
      gridSize: clampNumber(Number.parseInt(String(rawPreset.gridSize ?? TABLETOP_DEFAULT_GRID_SIZE), 10) || TABLETOP_DEFAULT_GRID_SIZE, TABLETOP_MIN_GRID_SIZE, TABLETOP_MAX_GRID_SIZE),
      zoom: clampNumber(Number(rawPreset.zoom ?? 1) || 1, TABLETOP_MIN_ZOOM, TABLETOP_MAX_ZOOM),
      fogEnabled: Boolean(rawPreset.fogEnabled),
      fogBrushSize: clampNumber(Number.parseInt(String(rawPreset.fogBrushSize ?? 160), 10) || 160, 48, 360),
      fogOpacity: clampNumber(Number(rawPreset.fogOpacity ?? 0.88) || 0.88, 0.35, 0.95),
      fogReveals: normalizeFogReveals(rawPreset.fogReveals),
      tokens,
      props: normalizeSceneProps(rawPreset.props),
      pins: normalizeScenePins(rawPreset.pins),
      areas: normalizeSceneAreas(rawPreset.areas),
      initiative: normalizeSceneInitiative(rawPreset.initiative, tokens),
      createdAt: String(rawPreset.createdAt || new Date().toISOString()),
      updatedAt: String(rawPreset.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeAssetType(value) {
    const rawValue = String(value || "").toLowerCase();
    if (rawValue === "map" || rawValue === "token" || rawValue === "prop") {
      return rawValue;
    }
    return "prop";
  }

  function normalizeTokenConditions(rawConditions) {
    const allowed = new Set(TABLETOP_CONDITIONS.map((condition) => condition.key));
    if (!Array.isArray(rawConditions)) {
      return [];
    }
    return Array.from(new Set(rawConditions
      .map((condition) => typeof condition === "string" ? condition : condition?.key)
      .map((condition) => String(condition || "").trim().toLowerCase())
      .filter((condition) => allowed.has(condition))))
      .slice(0, 6);
  }

  function normalizeFogReveals(rawReveals) {
    return Array.isArray(rawReveals)
      ? rawReveals.map((reveal, index) => normalizeFogReveal(reveal, index)).filter(Boolean)
      : [];
  }

  function normalizeFogReveal(rawReveal, index = 0) {
    if (!rawReveal || typeof rawReveal !== "object") {
      return null;
    }
    const radius = clampNumber(Number.parseInt(String(rawReveal.radius ?? 96), 10) || 96, 24, 420);
    return {
      id: ensureId(rawReveal.id, "fog"),
      x: clampNumber(Number(rawReveal.x) || 0, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber(Number(rawReveal.y) || 0, 0, TABLETOP_STAGE_HEIGHT),
      radius,
      createdAt: String(rawReveal.createdAt || new Date().toISOString()),
    };
  }

  function normalizeSceneProps(rawProps) {
    return Array.isArray(rawProps)
      ? rawProps.map((prop, index) => normalizeSceneProp(prop, index)).filter(Boolean)
      : [];
  }

  function normalizeSceneProp(rawProp, index = 0) {
    if (!rawProp || typeof rawProp !== "object") {
      return null;
    }
    const width = clampNumber(Number.parseInt(String(rawProp.width ?? 120), 10) || 120, 32, TABLETOP_STAGE_WIDTH);
    const height = clampNumber(Number.parseInt(String(rawProp.height ?? 120), 10) || 120, 32, TABLETOP_STAGE_HEIGHT);
    return {
      id: ensureId(rawProp.id, "prop"),
      assetId: String(rawProp.assetId || ""),
      name: String(rawProp.name || `Objeto ${index + 1}`).trim() || `Objeto ${index + 1}`,
      image: String(rawProp.image || ""),
      layer: normalizeSceneLayer(rawProp.layer),
      playerVisible: rawProp.playerVisible !== false,
      x: clampTokenCoordinate(rawProp.x, width, TABLETOP_STAGE_WIDTH),
      y: clampTokenCoordinate(rawProp.y, height, TABLETOP_STAGE_HEIGHT),
      width,
      height,
      rotation: clampNumber(Number(rawProp.rotation) || 0, -180, 180),
      locked: Boolean(rawProp.locked),
      createdAt: String(rawProp.createdAt || new Date().toISOString()),
      updatedAt: String(rawProp.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeScenePins(rawPins) {
    return Array.isArray(rawPins)
      ? rawPins.map((pin, index) => normalizeScenePin(pin, index)).filter(Boolean)
      : [];
  }

  function normalizeScenePin(rawPin, index = 0) {
    if (!rawPin || typeof rawPin !== "object") {
      return null;
    }
    return {
      id: ensureId(rawPin.id, "pin"),
      title: String(rawPin.title || `Nota ${index + 1}`).trim() || `Nota ${index + 1}`,
      body: String(rawPin.body || ""),
      color: normalizeColor(rawPin.color || "#c5a36a"),
      playerVisible: Boolean(rawPin.playerVisible),
      layer: normalizeSceneLayer(rawPin.layer),
      x: clampNumber(Number(rawPin.x) || 0, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber(Number(rawPin.y) || 0, 0, TABLETOP_STAGE_HEIGHT),
      createdAt: String(rawPin.createdAt || new Date().toISOString()),
      updatedAt: String(rawPin.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeSceneAreas(rawAreas) {
    return Array.isArray(rawAreas)
      ? rawAreas.map((area, index) => normalizeSceneArea(area, index)).filter(Boolean)
      : [];
  }

  function normalizeSceneArea(rawArea, index = 0) {
    if (!rawArea || typeof rawArea !== "object") {
      return null;
    }
    return {
      id: ensureId(rawArea.id, "area"),
      name: String(rawArea.name || `Area ${index + 1}`).trim() || `Area ${index + 1}`,
      shape: normalizeAreaShape(rawArea.shape),
      color: normalizeColor(rawArea.color || "#d16f6f"),
      playerVisible: rawArea.playerVisible !== false,
      layer: normalizeSceneLayer(rawArea.layer === "object" ? "object" : rawArea.layer),
      x: clampNumber(Number(rawArea.x) || 0, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber(Number(rawArea.y) || 0, 0, TABLETOP_STAGE_HEIGHT),
      radius: clampNumber(Number.parseInt(String(rawArea.radius ?? 120), 10) || 120, 24, 620),
      width: clampNumber(Number.parseInt(String(rawArea.width ?? 120), 10) || 120, 8, 620),
      length: clampNumber(Number.parseInt(String(rawArea.length ?? 220), 10) || 220, 24, 900),
      angle: clampNumber(Number(rawArea.angle) || 0, -180, 180),
      createdAt: String(rawArea.createdAt || new Date().toISOString()),
      updatedAt: String(rawArea.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeAreaShape(value) {
    const rawValue = String(value || "").toLowerCase();
    if (rawValue === "cone" || rawValue === "line" || rawValue === "circle") {
      return rawValue;
    }
    return "circle";
  }

  function normalizeSceneLayer(value) {
    const rawValue = String(value || "").toLowerCase();
    if (rawValue === "gm" || rawValue === "object" || rawValue === "effect") {
      return rawValue;
    }
    return "object";
  }

  function normalizeSceneInitiative(rawInitiative, tokens = []) {
    const entries = Array.isArray(rawInitiative?.entries)
      ? rawInitiative.entries.map((entry, index) => normalizeInitiativeEntry(entry, index)).filter(Boolean)
      : [];
    const tokenIds = new Set(tokens.map((token) => token.id));
    const filtered = entries.filter((entry) => tokenIds.has(entry.tokenId));
    tokens.forEach((token) => {
      if (!filtered.some((entry) => entry.tokenId === token.id)) {
        filtered.push({
          id: makeId("init"),
          tokenId: token.id,
          value: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    });
    return {
      round: Math.max(1, Number.parseInt(String(rawInitiative?.round ?? 1), 10) || 1),
      activeIndex: clampNumber(Number.parseInt(String(rawInitiative?.activeIndex ?? 0), 10) || 0, 0, Math.max(0, filtered.length - 1)),
      entries: filtered,
    };
  }

  function normalizeInitiativeEntry(rawEntry, index = 0) {
    if (!rawEntry || typeof rawEntry !== "object" || !rawEntry.tokenId) {
      return null;
    }
    return {
      id: ensureId(rawEntry.id, `init-${index}`),
      tokenId: String(rawEntry.tokenId),
      value: clampNumber(Number.parseInt(String(rawEntry.value ?? 0), 10) || 0, -99, 999),
      createdAt: String(rawEntry.createdAt || new Date().toISOString()),
      updatedAt: String(rawEntry.updatedAt || new Date().toISOString()),
    };
  }

  function normalizeScenePings(rawPings) {
    return Array.isArray(rawPings)
      ? rawPings.map((ping, index) => normalizeScenePing(ping, index)).filter(Boolean)
      : [];
  }

  function normalizeScenePing(rawPing, index = 0) {
    if (!rawPing || typeof rawPing !== "object") {
      return null;
    }
    const createdAt = String(rawPing.createdAt || new Date().toISOString());
    const expiresAt = String(rawPing.expiresAt || new Date(Date.parse(createdAt) + TABLETOP_PING_DURATION_MS).toISOString());
    return {
      id: ensureId(rawPing.id, `ping-${index}`),
      x: clampNumber(Number(rawPing.x) || 0, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber(Number(rawPing.y) || 0, 0, TABLETOP_STAGE_HEIGHT),
      label: String(rawPing.label || ""),
      color: normalizeColor(rawPing.color || "#ffe0a7"),
      by: String(rawPing.by || ""),
      createdAt,
      expiresAt,
    };
  }

  function getActiveScene(remoteSource = getTabletopRemoteSource()) {
    const accessibleScenes = getAccessibleScenes(remoteSource);
    if (!accessibleScenes.length) {
      return null;
    }

    const activeSceneId = syncTabletopViewerSceneId(remoteSource);
    return accessibleScenes.find((scene) => scene.id === activeSceneId) || accessibleScenes[0] || null;
  }

  function getSelectedToken(scene = getActiveScene()) {
    return scene && tabletopSelectedTokenId
      ? scene.tokens.find((token) => token.id === tabletopSelectedTokenId) || null
      : null;
  }

  function ensureTabletopSelection() {
    const scene = getActiveScene();
    if (!scene) {
      tabletopSelectedTokenId = "";
      return null;
    }
    if (tabletopSelectedTokenId && scene.tokens.some((token) => token.id === tabletopSelectedTokenId)) {
      return getSelectedToken(scene);
    }
    tabletopSelectedTokenId = scene.tokens[0]?.id || "";
    return getSelectedToken(scene);
  }

  function renderTabletopView(options = {}) {
    syncTabletopPermissions();
    syncTokenSourcePicker();
    renderLibraryPanel();
    updateToolButtons();
    const scene = getActiveScene();
    if (!scene) {
      tabletopSceneConfigSceneId = "";
      tabletopSelectedTokenId = "";
      renderSceneList(null);
      syncSceneEditor(null);
      renderTokenSelectionPanel(null);
      renderTokenList(null);
      syncTokenEditor(null);
      renderInitiativePanel(null);
      renderSceneTools(null);
      renderStage(null);
      renderMasterPhone();
      return;
    }
    if (!canEditCurrentTabletop()) {
      tabletopSceneConfigSceneId = "";
    } else if (tabletopSceneConfigSceneId && !tabletopState.scenes.some((entry) => entry.id === tabletopSceneConfigSceneId)) {
      tabletopSceneConfigSceneId = "";
    }
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    ensureTabletopSelection();
    renderSceneList(scene);
    syncSceneEditor(scene);
    renderTokenSelectionPanel(scene);
    renderTokenList(scene);
    syncTokenEditor(scene);
    renderInitiativePanel(scene);
    renderSceneTools(scene);
    renderStage(scene);
    renderMasterPhone();
    if (options.centerStage) {
      window.requestAnimationFrame(() => centerTabletopFrame());
    }
  }

  function renderSceneList(activeScene) {
    if (!tabletopElements.sceneList) {
      return;
    }
    const canEdit = canEditCurrentTabletop();
    const scenes = getAccessibleScenes();
    tabletopElements.sceneList.innerHTML = "";
    if (!scenes.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-empty-list";
      empty.innerHTML = "<strong>Nenhum mapa disponivel agora.</strong><p>O mestre ainda nao liberou uma cena para os jogadores.</p>";
      tabletopElements.sceneList.appendChild(empty);
      return;
    }

    scenes.forEach((scene) => {
      const sceneOrder = tabletopState.scenes.findIndex((entry) => entry.id === scene.id) + 1;
      const summaryText = String(scene.notes || "").replace(/\s+/g, " ").trim();
      const shortSummary = summaryText
        ? (summaryText.length > 120 ? `${summaryText.slice(0, 117)}...` : summaryText)
        : (scene.mapImage ? "Mapa pronto para a sessao." : "Escolha esta cena para montar o mapa e os detalhes.");
      const roleCounts = scene.tokens.reduce((accumulator, token) => {
        const role = normalizeTokenRole(token.role);
        accumulator[role] += 1;
        return accumulator;
      }, { player: 0, npc: 0, enemy: 0 });
      const card = document.createElement("article");
      card.className = scene.id === activeScene?.id ? "tabletop-scene-card active" : "tabletop-scene-card";
      card.classList.toggle("is-hidden", canEdit && scene.playerVisible === false);
      card.classList.toggle("is-config-open", canEdit && tabletopSceneConfigSceneId === scene.id);

      const mainButton = document.createElement("button");
      mainButton.type = "button";
      mainButton.className = "tabletop-scene-main";
      mainButton.addEventListener("click", () => {
        let shouldCenterStage = true;
        let shouldSaveSceneSelection = false;
        if (canEdit) {
          if (!ensureTabletopCanEdit(true)) {
            return;
          }
          const isSameScene = tabletopState.activeSceneId === scene.id;
          tabletopState.activeSceneId = scene.id;
          tabletopSceneConfigSceneId = isSameScene && tabletopSceneConfigSceneId === scene.id
            ? ""
            : scene.id;
          shouldCenterStage = !isSameScene;
          shouldSaveSceneSelection = !isSameScene;
        } else {
          tabletopViewerSceneId = scene.id;
        }
        tabletopSelectedTokenId = scene.tokens[0]?.id || "";
        if (canEdit && shouldSaveSceneSelection) {
          saveTabletopState();
        }
        renderTabletopView({ centerStage: shouldCenterStage });
      });

      const preview = document.createElement("div");
      preview.className = scene.mapImage ? "tabletop-scene-preview" : "tabletop-scene-preview is-empty";
      if (scene.mapImage) {
        preview.style.backgroundImage = `linear-gradient(180deg, rgba(8, 8, 10, 0.08), rgba(8, 8, 10, 0.78)), url("${scene.mapImage}")`;
      }

      const previewBadges = document.createElement("div");
      previewBadges.className = "tabletop-scene-preview-badges";

      const orderBadge = document.createElement("span");
      orderBadge.className = "tabletop-scene-badge";
      orderBadge.textContent = `Cena ${String(Math.max(sceneOrder, 1)).padStart(2, "0")}`;
      previewBadges.appendChild(orderBadge);

      const statusBadge = document.createElement("span");
      statusBadge.className = scene.id === activeScene?.id
        ? "tabletop-scene-badge is-active"
        : "tabletop-scene-badge";
      statusBadge.textContent = scene.id === activeScene?.id ? "Em uso" : "Selecionar";
      previewBadges.appendChild(statusBadge);

      if (canEdit) {
        const visibilityBadge = document.createElement("span");
        visibilityBadge.className = scene.playerVisible === false
          ? "tabletop-scene-badge is-gm"
          : "tabletop-scene-badge is-public";
        visibilityBadge.textContent = scene.playerVisible === false ? "So mestre" : "Jogadores veem";
        previewBadges.appendChild(visibilityBadge);
      }

      preview.appendChild(previewBadges);

      if (!scene.mapImage) {
        const emptyLabel = document.createElement("span");
        emptyLabel.className = "tabletop-scene-empty-label";
        emptyLabel.textContent = "Sem mapa";
        preview.appendChild(emptyLabel);
      }

      const copy = document.createElement("div");
      copy.className = "tabletop-scene-copy";

      const eyebrow = document.createElement("span");
      eyebrow.className = "tabletop-scene-eyebrow";
      eyebrow.textContent = scene.id === activeScene?.id
        ? "Cena ativa na mesa"
        : "Clique para focar esta cena";

      const title = document.createElement("strong");
      title.textContent = scene.name;

      const summary = document.createElement("p");
      summary.className = "tabletop-scene-summary";
      summary.textContent = shortSummary;

      const tags = document.createElement("div");
      tags.className = "tabletop-scene-tags";
      [
        scene.mapImage ? "Mapa pronto" : "Mapa pendente",
        `${scene.tokens.length} token(ns)`,
        roleCounts.player ? `${roleCounts.player} jogador(es)` : "",
        roleCounts.enemy ? `${roleCounts.enemy} inimigo(s)` : "",
        roleCounts.npc ? `${roleCounts.npc} NPC(s)` : "",
      ].filter(Boolean).forEach((label) => {
        const tag = document.createElement("span");
        tag.className = "tabletop-scene-tag";
        tag.textContent = label;
        tags.appendChild(tag);
      });

      mainButton.appendChild(preview);
      copy.appendChild(eyebrow);
      copy.appendChild(title);
      copy.appendChild(summary);
      copy.appendChild(tags);

      const meta = document.createElement("p");
      meta.className = "tabletop-scene-meta";
      meta.textContent = [
        `${scene.gridSize || TABLETOP_DEFAULT_GRID_SIZE}px por celula`,
        `${Math.round((scene.zoom || 1) * 100)}% de zoom`,
        summaryText ? "com anotacoes" : "sem anotacoes",
      ].join(" | ");
      copy.appendChild(meta);

      mainButton.appendChild(copy);

      card.appendChild(mainButton);
      if (canEdit) {
        const actions = document.createElement("div");
        actions.className = "tabletop-scene-actions";
        const duplicateButton = document.createElement("button");
        duplicateButton.type = "button";
        duplicateButton.className = "secondary";
        duplicateButton.textContent = "Duplicar";
        duplicateButton.addEventListener("click", () => duplicateScene(scene.id));
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "secondary";
        deleteButton.textContent = "Excluir";
        deleteButton.disabled = tabletopState.scenes.length <= 1;
        deleteButton.addEventListener("click", () => deleteScene(scene.id));
        actions.appendChild(duplicateButton);
        actions.appendChild(deleteButton);
        card.appendChild(actions);
      }
      tabletopElements.sceneList.appendChild(card);
    });
  }

  function syncSceneEditor(scene) {
    const canEdit = canEditCurrentTabletop();
    const showConfig = canEdit && Boolean(scene) && tabletopSceneConfigSceneId === scene.id;
    if (tabletopElements.configCard) {
      tabletopElements.configCard.classList.toggle("hidden", !showConfig);
    }
    if (tabletopElements.sceneName) {
      tabletopElements.sceneName.value = scene?.name || "";
    }
    if (tabletopElements.sceneNotes) {
      tabletopElements.sceneNotes.value = canEdit && scene ? scene.notes : "";
    }
    if (tabletopElements.sceneVisible) {
      tabletopElements.sceneVisible.checked = scene ? scene.playerVisible !== false : false;
      tabletopElements.sceneVisible.disabled = !scene || !canEdit;
    }
    if (tabletopElements.gridEnabled) {
      tabletopElements.gridEnabled.checked = Boolean(scene?.gridEnabled);
    }
    if (tabletopElements.gridSize) {
      tabletopElements.gridSize.value = String(scene?.gridSize || TABLETOP_DEFAULT_GRID_SIZE);
    }
    if (tabletopElements.gridSizeOutput) {
      tabletopElements.gridSizeOutput.textContent = `${scene?.gridSize || TABLETOP_DEFAULT_GRID_SIZE} px por celula`;
    }
    if (tabletopElements.zoom) {
      tabletopElements.zoom.value = String(Math.round(getSceneRenderZoom(scene) * 100));
    }
    if (tabletopElements.zoomOutput) {
      tabletopElements.zoomOutput.textContent = `${Math.round(getSceneRenderZoom(scene) * 100)}%`;
    }
    if (tabletopElements.zoomReset) {
      tabletopElements.zoomReset.textContent = `${Math.round(getSceneRenderZoom(scene) * 100)}%`;
      tabletopElements.zoomReset.disabled = !scene;
    }
    if (tabletopElements.zoomOut) {
      tabletopElements.zoomOut.disabled = !scene;
    }
    if (tabletopElements.zoomIn) {
      tabletopElements.zoomIn.disabled = !scene;
    }
    if (tabletopElements.mapClear) {
      tabletopElements.mapClear.disabled = !scene?.mapImage || !canEdit;
    }
  }

  function getTabletopLibrary() {
    if (!tabletopState.library || typeof tabletopState.library !== "object") {
      tabletopState.library = createEmptyTabletopLibrary();
    }
    return tabletopState.library;
  }

  function renderTokenConditionsPicker(token) {
    if (!tabletopElements.tokenConditions) {
      return;
    }
    tabletopElements.tokenConditions.innerHTML = "";
    if (!token) {
      const empty = document.createElement("span");
      empty.className = "tabletop-editor-empty";
      empty.textContent = "Selecione um token para marcar condicoes.";
      tabletopElements.tokenConditions.appendChild(empty);
      return;
    }
    const activeConditions = new Set(normalizeTokenConditions(token.conditions));
    TABLETOP_CONDITIONS.forEach((condition) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = activeConditions.has(condition.key) ? "tabletop-condition-chip active" : "tabletop-condition-chip";
      button.textContent = condition.label;
      button.style.setProperty("--condition-color", condition.color);
      button.addEventListener("click", () => {
        const nextConditions = new Set(normalizeTokenConditions(token.conditions));
        if (nextConditions.has(condition.key)) {
          nextConditions.delete(condition.key);
        } else {
          nextConditions.add(condition.key);
        }
        patchSelectedToken({ conditions: Array.from(nextConditions) });
      });
      tabletopElements.tokenConditions.appendChild(button);
    });
  }

  function getCurrentTurnEntry(scene) {
    if (!scene?.initiative?.entries?.length) {
      return null;
    }
    const index = clampNumber(scene.initiative.activeIndex, 0, scene.initiative.entries.length - 1);
    return scene.initiative.entries[index] || null;
  }

  function getCurrentTurnTokenId(scene) {
    return getCurrentTurnEntry(scene)?.tokenId || "";
  }

  function renderInitiativePanel(scene) {
    if (!tabletopElements.initList) {
      return;
    }
    tabletopElements.initList.innerHTML = "";
    if (tabletopElements.initRound) {
      tabletopElements.initRound.value = String(scene?.initiative?.round || 1);
    }
    if (!scene) {
      const empty = document.createElement("div");
      empty.className = "tabletop-empty-list";
      empty.innerHTML = "<strong>Nenhuma cena ativa.</strong><p>Escolha um mapa para montar a ordem de combate.</p>";
      tabletopElements.initList.appendChild(empty);
      return;
    }
    const entries = scene.initiative?.entries || [];
    if (!entries.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-empty-list";
      empty.innerHTML = "<strong>Sem tokens na iniciativa.</strong><p>Adicione tokens a cena para controlar turnos.</p>";
      tabletopElements.initList.appendChild(empty);
      return;
    }
    const activeEntry = getCurrentTurnEntry(scene);
    entries.forEach((entry, index) => {
      const token = scene.tokens.find((item) => item.id === entry.tokenId);
      if (!token) {
        return;
      }
      const row = document.createElement("div");
      row.className = activeEntry?.id === entry.id ? "tabletop-init-item active" : "tabletop-init-item";

      const info = document.createElement("div");
      info.className = "tabletop-init-copy";
      const title = document.createElement("strong");
      title.textContent = token.name;
      const meta = document.createElement("span");
      meta.textContent = [getTokenRoleLabel(token.tokenRole), `turno ${index + 1}`].join(" | ");
      info.appendChild(title);
      info.appendChild(meta);

      const valueInput = document.createElement("input");
      valueInput.type = "number";
      valueInput.min = "-99";
      valueInput.max = "999";
      valueInput.step = "1";
      valueInput.value = String(entry.value);
      valueInput.addEventListener("change", () => patchInitiativeEntryValue(entry.id, valueInput.value));

      const activateButton = document.createElement("button");
      activateButton.type = "button";
      activateButton.className = activeEntry?.id === entry.id ? "primary" : "secondary";
      activateButton.textContent = activeEntry?.id === entry.id ? "Ativo" : "Ativar";
      activateButton.addEventListener("click", () => setInitiativeActiveEntry(entry.id));

      row.appendChild(info);
      row.appendChild(valueInput);
      row.appendChild(activateButton);
      tabletopElements.initList.appendChild(row);
    });
  }

  function renderSceneTools(scene) {
    if (tabletopElements.fogEnabled) {
      tabletopElements.fogEnabled.checked = Boolean(scene?.fogEnabled);
    }
    if (tabletopElements.fogBrush) {
      tabletopElements.fogBrush.value = String(scene?.fogBrushSize || 160);
    }
    if (tabletopElements.fogBrushOutput) {
      tabletopElements.fogBrushOutput.textContent = `${scene?.fogBrushSize || 160} px de revelacao`;
    }
    renderPinList(scene);
    renderAreaList(scene);
    renderPropList(scene);
  }

  function renderPinList(scene) {
    if (!tabletopElements.pinList) {
      return;
    }
    tabletopElements.pinList.innerHTML = "";
    if (!scene) {
      return;
    }
    if (!scene.pins.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-editor-empty";
      empty.textContent = "Nenhuma nota ancorada nesta cena.";
      tabletopElements.pinList.appendChild(empty);
      return;
    }
    scene.pins.forEach((pin) => {
      const item = document.createElement("article");
      item.className = "tabletop-editor-card";

      const head = document.createElement("div");
      head.className = "tabletop-editor-card-head";
      const title = document.createElement("strong");
      title.textContent = pin.title;
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "menu-delete-btn";
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => deleteScenePin(pin.id));
      head.appendChild(title);
      head.appendChild(deleteButton);

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = pin.title;
      titleInput.placeholder = "Titulo da nota";
      titleInput.addEventListener("change", () => patchScenePin(pin.id, { title: titleInput.value }));

      const bodyInput = document.createElement("textarea");
      bodyInput.rows = 3;
      bodyInput.value = pin.body;
      bodyInput.placeholder = "Pista, gatilho, observacao...";
      bodyInput.addEventListener("change", () => patchScenePin(pin.id, { body: bodyInput.value }));

      const grid = document.createElement("div");
      grid.className = "tabletop-editor-grid compact";
      grid.appendChild(createMiniNumberField("X", pin.x, (value) => patchScenePin(pin.id, { x: value })));
      grid.appendChild(createMiniNumberField("Y", pin.y, (value) => patchScenePin(pin.id, { y: value })));
      grid.appendChild(createMiniColorField("Cor", pin.color, (value) => patchScenePin(pin.id, { color: value })));
      grid.appendChild(createMiniToggleField("Jogadores veem", pin.playerVisible, (checked) => patchScenePin(pin.id, { playerVisible: checked })));

      item.appendChild(head);
      item.appendChild(titleInput);
      item.appendChild(bodyInput);
      item.appendChild(grid);
      tabletopElements.pinList.appendChild(item);
    });
  }

  function renderAreaList(scene) {
    if (!tabletopElements.areaList) {
      return;
    }
    tabletopElements.areaList.innerHTML = "";
    if (!scene) {
      return;
    }
    if (!scene.areas.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-editor-empty";
      empty.textContent = "Nenhuma area de efeito nesta cena.";
      tabletopElements.areaList.appendChild(empty);
      return;
    }
    scene.areas.forEach((area) => {
      const item = document.createElement("article");
      item.className = "tabletop-editor-card";

      const head = document.createElement("div");
      head.className = "tabletop-editor-card-head";
      const title = document.createElement("strong");
      title.textContent = area.name;
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "menu-delete-btn";
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => deleteSceneArea(area.id));
      head.appendChild(title);
      head.appendChild(deleteButton);

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = area.name;
      titleInput.placeholder = "Nome da area";
      titleInput.addEventListener("change", () => patchSceneArea(area.id, { name: titleInput.value }));

      const grid = document.createElement("div");
      grid.className = "tabletop-editor-grid compact";
      grid.appendChild(createMiniSelectField("Forma", area.shape, [
        { value: "circle", label: "Circulo" },
        { value: "cone", label: "Cone" },
        { value: "line", label: "Linha" },
      ], (value) => patchSceneArea(area.id, { shape: value })));
      grid.appendChild(createMiniColorField("Cor", area.color, (value) => patchSceneArea(area.id, { color: value })));
      grid.appendChild(createMiniToggleField("Jogadores veem", area.playerVisible, (checked) => patchSceneArea(area.id, { playerVisible: checked })));
      grid.appendChild(createMiniNumberField("Angulo", area.angle, (value) => patchSceneArea(area.id, { angle: value }), -180, 180));
      grid.appendChild(createMiniNumberField("X", area.x, (value) => patchSceneArea(area.id, { x: value })));
      grid.appendChild(createMiniNumberField("Y", area.y, (value) => patchSceneArea(area.id, { y: value })));
      grid.appendChild(createMiniNumberField("Raio", area.radius, (value) => patchSceneArea(area.id, { radius: value }), 24, 620));
      grid.appendChild(createMiniNumberField("Comprimento", area.length, (value) => patchSceneArea(area.id, { length: value }), 24, 900));

      item.appendChild(head);
      item.appendChild(titleInput);
      item.appendChild(grid);
      tabletopElements.areaList.appendChild(item);
    });
  }

  function renderPropList(scene) {
    if (!tabletopElements.propList) {
      return;
    }
    tabletopElements.propList.innerHTML = "";
    if (!scene) {
      return;
    }
    if (!scene.props.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-editor-empty";
      empty.textContent = "Nenhum objeto em camada nesta cena.";
      tabletopElements.propList.appendChild(empty);
      return;
    }
    scene.props.forEach((prop) => {
      const item = document.createElement("article");
      item.className = "tabletop-editor-card";

      const head = document.createElement("div");
      head.className = "tabletop-editor-card-head";
      const title = document.createElement("strong");
      title.textContent = prop.name;
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "menu-delete-btn";
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => deleteSceneProp(prop.id));
      head.appendChild(title);
      head.appendChild(deleteButton);

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = prop.name;
      titleInput.placeholder = "Nome do objeto";
      titleInput.addEventListener("change", () => patchSceneProp(prop.id, { name: titleInput.value }));

      const grid = document.createElement("div");
      grid.className = "tabletop-editor-grid compact";
      grid.appendChild(createMiniSelectField("Camada", prop.layer, [
        { value: "object", label: "Objetos" },
        { value: "gm", label: "Oculto mestre" },
      ], (value) => patchSceneProp(prop.id, { layer: value })));
      grid.appendChild(createMiniToggleField("Jogadores veem", prop.playerVisible, (checked) => patchSceneProp(prop.id, { playerVisible: checked })));
      grid.appendChild(createMiniNumberField("X", prop.x, (value) => patchSceneProp(prop.id, { x: value })));
      grid.appendChild(createMiniNumberField("Y", prop.y, (value) => patchSceneProp(prop.id, { y: value })));
      grid.appendChild(createMiniNumberField("Largura", prop.width, (value) => patchSceneProp(prop.id, { width: value }), 32, TABLETOP_STAGE_WIDTH));
      grid.appendChild(createMiniNumberField("Altura", prop.height, (value) => patchSceneProp(prop.id, { height: value }), 32, TABLETOP_STAGE_HEIGHT));
      grid.appendChild(createMiniNumberField("Rotacao", prop.rotation, (value) => patchSceneProp(prop.id, { rotation: value }), -180, 180));
      grid.appendChild(createMiniToggleField("Travado", prop.locked, (checked) => patchSceneProp(prop.id, { locked: checked })));

      item.appendChild(head);
      item.appendChild(titleInput);
      item.appendChild(grid);
      tabletopElements.propList.appendChild(item);
    });
  }

  function renderLibraryPanel() {
    const library = getTabletopLibrary();
    if (tabletopElements.presetSelect) {
      const currentValue = String(tabletopElements.presetSelect.value || "");
      tabletopElements.presetSelect.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Escolha um preset";
      tabletopElements.presetSelect.appendChild(placeholder);
      library.presets.forEach((preset) => {
        const option = document.createElement("option");
        option.value = preset.id;
        option.textContent = preset.name;
        tabletopElements.presetSelect.appendChild(option);
      });
      tabletopElements.presetSelect.value = library.presets.some((preset) => preset.id === currentValue) ? currentValue : "";
    }
    if (!tabletopElements.libraryList) {
      return;
    }
    tabletopElements.libraryList.innerHTML = "";
    if (!library.assets.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-empty-list";
      empty.innerHTML = "<strong>Biblioteca vazia.</strong><p>Envie mapas, tokens ou objetos para reutilizar nas proximas cenas.</p>";
      tabletopElements.libraryList.appendChild(empty);
      return;
    }
    library.assets.forEach((asset) => {
      const item = document.createElement("article");
      item.className = "tabletop-library-item";

      const preview = document.createElement("div");
      preview.className = "tabletop-library-preview";
      preview.style.backgroundImage = toCssUrl(asset.image);

      const copy = document.createElement("div");
      copy.className = "tabletop-library-copy";
      const title = document.createElement("strong");
      title.textContent = asset.name;
      const meta = document.createElement("span");
      meta.textContent = asset.type === "map" ? "Mapa" : asset.type === "token" ? "Token" : "Objeto";
      copy.appendChild(title);
      copy.appendChild(meta);

      const actions = document.createElement("div");
      actions.className = "tabletop-library-actions";
      if (asset.type === "map") {
        actions.appendChild(createLibraryActionButton("Usar no mapa", () => applyAssetAsSceneMap(asset.id)));
        actions.appendChild(createLibraryActionButton("Como objeto", () => addScenePropFromAsset(asset.id)));
      } else if (asset.type === "token") {
        actions.appendChild(createLibraryActionButton("Como token", () => createTokenFromLibraryAsset(asset.id)));
        actions.appendChild(createLibraryActionButton("Como objeto", () => addScenePropFromAsset(asset.id)));
      } else {
        actions.appendChild(createLibraryActionButton("Como objeto", () => addScenePropFromAsset(asset.id)));
        actions.appendChild(createLibraryActionButton("Como token", () => createTokenFromLibraryAsset(asset.id)));
      }
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "menu-delete-btn";
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => deleteLibraryAsset(asset.id));
      actions.appendChild(deleteButton);

      item.appendChild(preview);
      item.appendChild(copy);
      item.appendChild(actions);
      tabletopElements.libraryList.appendChild(item);
    });
  }

  function createLibraryActionButton(label, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function createMiniNumberField(label, value, onChange, min = 0, max = 9999) {
    const wrapper = document.createElement("label");
    wrapper.className = "tabletop-mini-field";
    const title = document.createElement("span");
    title.textContent = label;
    const input = document.createElement("input");
    input.type = "number";
    input.min = String(min);
    input.max = String(max);
    input.step = "1";
    input.value = String(Math.round(Number(value) || 0));
    input.addEventListener("change", () => onChange(Number.parseInt(input.value || "0", 10) || 0));
    wrapper.appendChild(title);
    wrapper.appendChild(input);
    return wrapper;
  }

  function createMiniColorField(label, value, onChange) {
    const wrapper = document.createElement("label");
    wrapper.className = "tabletop-mini-field";
    const title = document.createElement("span");
    title.textContent = label;
    const input = document.createElement("input");
    input.type = "color";
    input.value = normalizeColor(value);
    input.addEventListener("input", () => onChange(input.value));
    wrapper.appendChild(title);
    wrapper.appendChild(input);
    return wrapper;
  }

  function createMiniToggleField(label, checked, onChange) {
    const wrapper = document.createElement("label");
    wrapper.className = "tabletop-mini-field tabletop-mini-toggle";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(checked);
    input.addEventListener("change", () => onChange(input.checked));
    const title = document.createElement("span");
    title.textContent = label;
    wrapper.appendChild(input);
    wrapper.appendChild(title);
    return wrapper;
  }

  function createMiniSelectField(label, value, options, onChange) {
    const wrapper = document.createElement("label");
    wrapper.className = "tabletop-mini-field";
    const title = document.createElement("span");
    title.textContent = label;
    const select = document.createElement("select");
    options.forEach((option) => {
      const element = document.createElement("option");
      element.value = option.value;
      element.textContent = option.label;
      select.appendChild(element);
    });
    select.value = value;
    select.addEventListener("change", () => onChange(select.value));
    wrapper.appendChild(title);
    wrapper.appendChild(select);
    return wrapper;
  }

  function setTabletopToolMode(nextMode = "") {
    const allowedModes = new Set(["", "measure", "ping", "fog-reveal", "fog-hide"]);
    tabletopToolMode = allowedModes.has(nextMode) ? nextMode : "";
    updateToolButtons();
  }

  function updateToolButtons() {
    const bindings = [
      [tabletopElements.toolMeasure, "measure"],
      [tabletopElements.toolPing, "ping"],
      [tabletopElements.fogRevealTool, "fog-reveal"],
      [tabletopElements.fogHideTool, "fog-hide"],
    ];
    bindings.forEach(([button, mode]) => {
      if (!button) {
        return;
      }
      button.classList.toggle("active", tabletopToolMode === mode);
      button.setAttribute("aria-pressed", tabletopToolMode === mode ? "true" : "false");
    });
    if (tabletopElements.toolGrid) {
      const scene = getActiveScene();
      const isActive = getSceneGridEnabled(scene);
      tabletopElements.toolGrid.classList.toggle("active", isActive);
      tabletopElements.toolGrid.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function toggleSceneGridVisibility() {
    const scene = getActiveScene();
    if (!scene) {
      return;
    }
    const remoteSource = getTabletopRemoteSource();
    const nextVisible = !getSceneGridEnabled(scene, remoteSource);
    if (canEditCurrentTabletop(remoteSource)) {
      scene.gridEnabled = nextVisible;
      scene.updatedAt = new Date().toISOString();
      saveTabletopState();
      syncSceneEditor(scene);
    } else {
      tabletopViewerGridByScene[scene.id] = nextVisible;
    }
    updateToolButtons();
    renderStage(scene);
  }

  function handleInitiativeRoundChange() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.initRound || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.initiative.round = Math.max(1, Number.parseInt(tabletopElements.initRound.value || "1", 10) || 1);
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderInitiativePanel(scene);
    renderStage(scene);
  }

  function patchInitiativeEntryValue(entryId, nextValue) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const entry = scene.initiative.entries.find((item) => item.id === entryId);
    if (!entry) {
      return;
    }
    entry.value = clampNumber(Number.parseInt(String(nextValue || "0"), 10) || 0, -99, 999);
    entry.updatedAt = new Date().toISOString();
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderInitiativePanel(scene);
  }

  function setInitiativeActiveEntry(entryId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const index = scene.initiative.entries.findIndex((entry) => entry.id === entryId);
    if (index < 0) {
      return;
    }
    scene.initiative.activeIndex = index;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderInitiativePanel(scene);
    renderStage(scene);
  }

  function sortInitiativeEntries() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const currentTokenId = getCurrentTurnTokenId(scene);
    scene.initiative.entries.sort((left, right) => {
      if (right.value !== left.value) {
        return right.value - left.value;
      }
      const leftToken = scene.tokens.find((token) => token.id === left.tokenId);
      const rightToken = scene.tokens.find((token) => token.id === right.tokenId);
      return String(leftToken?.name || "").localeCompare(String(rightToken?.name || ""));
    });
    scene.initiative.activeIndex = Math.max(0, scene.initiative.entries.findIndex((entry) => entry.tokenId === currentTokenId));
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderInitiativePanel(scene);
    renderStage(scene);
  }

  function clearInitiativeEntries() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.initiative.entries = scene.tokens.map((token) => ({
      id: makeId("init"),
      tokenId: token.id,
      value: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    scene.initiative.activeIndex = 0;
    scene.initiative.round = 1;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderInitiativePanel(scene);
    renderStage(scene);
  }

  function stepInitiative(delta) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true) || !scene.initiative.entries.length) {
      return;
    }
    const total = scene.initiative.entries.length;
    const currentIndex = clampNumber(scene.initiative.activeIndex, 0, total - 1);
    let nextIndex = currentIndex + delta;
    if (nextIndex >= total) {
      nextIndex = 0;
      scene.initiative.round += 1;
    } else if (nextIndex < 0) {
      nextIndex = total - 1;
      scene.initiative.round = Math.max(1, scene.initiative.round - 1);
    }
    scene.initiative.activeIndex = nextIndex;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderInitiativePanel(scene);
    renderStage(scene);
  }

  function handleFogEnabledChange() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.fogEnabled || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.fogEnabled = tabletopElements.fogEnabled.checked;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function handleFogBrushInput() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.fogBrush || !ensureTabletopCanEdit()) {
      return;
    }
    scene.fogBrushSize = clampNumber(Number.parseInt(tabletopElements.fogBrush.value || "160", 10) || 160, 48, 360);
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
  }

  function clearFogReveals() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.fogReveals = [];
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderStage(scene);
  }

  function addScenePin() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const center = getViewportCenterLogical(scene);
    scene.pins.push(normalizeScenePin({
      title: `Nota ${scene.pins.length + 1}`,
      body: "",
      color: "#c5a36a",
      playerVisible: false,
      layer: "gm",
      x: center.x,
      y: center.y,
    }, scene.pins.length));
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function patchScenePin(pinId, patch = {}) {
    const scene = getActiveScene();
    const pin = scene?.pins.find((item) => item.id === pinId);
    if (!scene || !pin || !ensureTabletopCanEdit()) {
      return;
    }
    if (patch.title != null) {
      pin.title = String(patch.title || "").trim() || pin.title;
    }
    if (patch.body != null) {
      pin.body = String(patch.body || "");
    }
    if (patch.color != null) {
      pin.color = normalizeColor(patch.color || pin.color);
    }
    if (patch.playerVisible != null) {
      pin.playerVisible = Boolean(patch.playerVisible);
      pin.layer = pin.playerVisible ? "object" : "gm";
    }
    if (patch.x != null) {
      pin.x = clampNumber(Number(patch.x) || 0, 0, TABLETOP_STAGE_WIDTH);
    }
    if (patch.y != null) {
      pin.y = clampNumber(Number(patch.y) || 0, 0, TABLETOP_STAGE_HEIGHT);
    }
    pin.updatedAt = new Date().toISOString();
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function deleteScenePin(pinId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.pins = scene.pins.filter((pin) => pin.id !== pinId);
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function addSceneArea(shape = "circle") {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const center = getViewportCenterLogical(scene);
    scene.areas.push(normalizeSceneArea({
      name: shape === "cone" ? "Cone" : shape === "line" ? "Linha" : "Area",
      shape,
      color: shape === "line" ? "#7fb3a6" : "#d16f6f",
      playerVisible: true,
      layer: "effect",
      x: center.x,
      y: center.y,
      radius: 120,
      length: 220,
      angle: 0,
    }, scene.areas.length));
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function patchSceneArea(areaId, patch = {}) {
    const scene = getActiveScene();
    const area = scene?.areas.find((item) => item.id === areaId);
    if (!scene || !area || !ensureTabletopCanEdit()) {
      return;
    }
    if (patch.name != null) {
      area.name = String(patch.name || "").trim() || area.name;
    }
    if (patch.shape != null) {
      area.shape = normalizeAreaShape(patch.shape);
    }
    if (patch.color != null) {
      area.color = normalizeColor(patch.color || area.color);
    }
    if (patch.playerVisible != null) {
      area.playerVisible = Boolean(patch.playerVisible);
      area.layer = area.playerVisible ? "effect" : "gm";
    }
    if (patch.x != null) {
      area.x = clampNumber(Number(patch.x) || 0, 0, TABLETOP_STAGE_WIDTH);
    }
    if (patch.y != null) {
      area.y = clampNumber(Number(patch.y) || 0, 0, TABLETOP_STAGE_HEIGHT);
    }
    if (patch.radius != null) {
      area.radius = clampNumber(Number.parseInt(String(patch.radius || area.radius), 10) || area.radius, 24, 620);
    }
    if (patch.length != null) {
      area.length = clampNumber(Number.parseInt(String(patch.length || area.length), 10) || area.length, 24, 900);
    }
    if (patch.angle != null) {
      area.angle = clampNumber(Number(patch.angle) || 0, -180, 180);
    }
    area.updatedAt = new Date().toISOString();
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function deleteSceneArea(areaId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.areas = scene.areas.filter((area) => area.id !== areaId);
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function patchSceneProp(propId, patch = {}) {
    const scene = getActiveScene();
    const prop = scene?.props.find((item) => item.id === propId);
    if (!scene || !prop || !ensureTabletopCanEdit()) {
      return;
    }
    const nextWidth = patch.width != null
      ? clampNumber(Number.parseInt(String(patch.width || prop.width), 10) || prop.width, 32, TABLETOP_STAGE_WIDTH)
      : prop.width;
    const nextHeight = patch.height != null
      ? clampNumber(Number.parseInt(String(patch.height || prop.height), 10) || prop.height, 32, TABLETOP_STAGE_HEIGHT)
      : prop.height;
    if (patch.name != null) {
      prop.name = String(patch.name || "").trim() || prop.name;
    }
    if (patch.layer != null) {
      prop.layer = normalizeSceneLayer(patch.layer);
    }
    if (patch.playerVisible != null) {
      prop.playerVisible = Boolean(patch.playerVisible);
    }
    if (patch.locked != null) {
      prop.locked = Boolean(patch.locked);
    }
    prop.width = nextWidth;
    prop.height = nextHeight;
    if (patch.rotation != null) {
      prop.rotation = clampNumber(Number(patch.rotation) || 0, -180, 180);
    }
    prop.x = clampTokenCoordinate(patch.x != null ? patch.x : prop.x, prop.width, TABLETOP_STAGE_WIDTH);
    prop.y = clampTokenCoordinate(patch.y != null ? patch.y : prop.y, prop.height, TABLETOP_STAGE_HEIGHT);
    prop.updatedAt = new Date().toISOString();
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function deleteSceneProp(propId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.props = scene.props.filter((prop) => prop.id !== propId);
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  async function handleLibraryFileChange(event) {
    const files = Array.from(event.target?.files || []);
    if (!files.length || !ensureTabletopCanEdit(true)) {
      if (event.target) {
        event.target.value = "";
      }
      return;
    }
    const library = getTabletopLibrary();
    const assetType = normalizeAssetType(tabletopElements.libraryType?.value);
    try {
      const assets = await Promise.all(files.map(async (file, index) => normalizeTabletopAsset({
        type: assetType,
        name: getTokenNameFromFileName(file.name, index),
        image: await readFileAsDataUrl(file),
      }, library.assets.length + index)));
      library.assets.unshift(...assets);
      tabletopState.updatedAt = new Date().toISOString();
      saveTabletopState();
      renderLibraryPanel();
      notifyTabletop(`${assets.length} asset(s) salvo(s) na biblioteca.`, "success");
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel ler um dos arquivos da biblioteca.", "danger");
    } finally {
      if (event.target) {
        event.target.value = "";
      }
    }
  }

  function deleteLibraryAsset(assetId) {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const library = getTabletopLibrary();
    const asset = library.assets.find((item) => item.id === assetId);
    if (!asset || !window.confirm(`Excluir o asset "${asset.name}" da biblioteca?`)) {
      return;
    }
    library.assets = library.assets.filter((item) => item.id !== assetId);
    tabletopState.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderLibraryPanel();
  }

  function applyAssetAsSceneMap(assetId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const asset = getTabletopLibrary().assets.find((item) => item.id === assetId);
    if (!asset) {
      return;
    }
    scene.mapImage = asset.image;
    scene.mapAssetId = asset.id;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneList(scene);
    renderStage(scene);
    syncSceneEditor(scene);
  }

  function createTokenFromLibraryAsset(assetId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const asset = getTabletopLibrary().assets.find((item) => item.id === assetId);
    if (!asset) {
      return;
    }
    const tokenRole = asset.type === "prop" ? "npc" : asset.type === "map" ? "npc" : "player";
    const size = getTokenMinimumSizeForRole(tokenRole);
    const placement = getPlacementForIndex(scene, scene.tokens.length, size);
    const token = createTabletopToken(asset.name || "Token", {
      tokenRole,
      kind: "custom",
      image: asset.image,
      imageFit: "cover",
      size,
      color: pickTokenColor(asset.name || asset.id),
      x: placement.x,
      y: placement.y,
    });
    scene.tokens.push(token);
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    scene.updatedAt = new Date().toISOString();
    tabletopSelectedTokenId = token.id;
    saveTabletopState();
    renderTabletopView();
  }

  function addScenePropFromAsset(assetId) {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const asset = getTabletopLibrary().assets.find((item) => item.id === assetId);
    if (!asset) {
      return;
    }
    const center = getViewportCenterLogical(scene);
    scene.props.push(normalizeSceneProp({
      assetId: asset.id,
      name: asset.name || `Objeto ${scene.props.length + 1}`,
      image: asset.image,
      layer: asset.type === "prop" ? "object" : "object",
      playerVisible: true,
      x: clampTokenCoordinate(center.x - 60, 120, TABLETOP_STAGE_WIDTH),
      y: clampTokenCoordinate(center.y - 60, 120, TABLETOP_STAGE_HEIGHT),
      width: 120,
      height: 120,
      rotation: 0,
      locked: false,
    }, scene.props.length));
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneTools(scene);
    renderStage(scene);
  }

  function saveScenePreset() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    const presetName = window.prompt("Nome do preset:", scene.name || "Preset da cena");
    if (!presetName) {
      return;
    }
    const library = getTabletopLibrary();
    const trimmedName = String(presetName || "").trim();
    if (!trimmedName) {
      return;
    }
    const existing = library.presets.find((preset) => normalizeTabletopSearchText(preset.name || "") === normalizeTabletopSearchText(trimmedName));
    const payload = normalizeTabletopPreset({
      id: existing?.id,
      name: trimmedName,
      mapImage: scene.mapImage,
      mapAssetId: scene.mapAssetId,
      notes: scene.notes,
      playerVisible: scene.playerVisible,
      gridEnabled: scene.gridEnabled,
      gridSize: scene.gridSize,
      zoom: scene.zoom,
      fogEnabled: scene.fogEnabled,
      fogBrushSize: scene.fogBrushSize,
      fogOpacity: scene.fogOpacity,
      fogReveals: scene.fogReveals,
      tokens: scene.tokens,
      props: scene.props,
      pins: scene.pins,
      areas: scene.areas,
      initiative: scene.initiative,
    }, library.presets.length);
    if (existing) {
      Object.assign(existing, payload, { updatedAt: new Date().toISOString() });
    } else {
      library.presets.unshift(payload);
    }
    tabletopState.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderLibraryPanel();
    if (tabletopElements.presetSelect) {
      tabletopElements.presetSelect.value = payload.id;
    }
    notifyTabletop(`Preset "${trimmedName}" salvo.`, "success");
  }

  function applySelectedPreset(options = {}) {
    const presetId = String(tabletopElements.presetSelect?.value || "");
    if (!presetId || !ensureTabletopCanEdit(true)) {
      return;
    }
    const preset = getTabletopLibrary().presets.find((item) => item.id === presetId);
    if (!preset) {
      return;
    }
    if (options.createScene) {
      const scene = createTabletopScene(preset.name, {
        name: preset.name,
        notes: preset.notes,
        mapImage: preset.mapImage,
        mapAssetId: preset.mapAssetId,
        playerVisible: preset.playerVisible,
        gridEnabled: preset.gridEnabled,
        gridSize: preset.gridSize,
        zoom: preset.zoom,
        fogEnabled: preset.fogEnabled,
        fogBrushSize: preset.fogBrushSize,
        fogOpacity: preset.fogOpacity,
        fogReveals: preset.fogReveals,
        tokens: preset.tokens,
        props: preset.props,
        pins: preset.pins,
        areas: preset.areas,
        initiative: preset.initiative,
      });
      tabletopState.scenes.push(scene);
      tabletopState.activeSceneId = scene.id;
      tabletopSelectedTokenId = scene.tokens[0]?.id || "";
      saveTabletopState();
      renderTabletopView({ centerStage: true });
      return;
    }
    const scene = getActiveScene();
    if (!scene) {
      return;
    }
    scene.notes = preset.notes;
    scene.mapImage = preset.mapImage;
    scene.mapAssetId = preset.mapAssetId;
    scene.playerVisible = preset.playerVisible;
    scene.gridEnabled = preset.gridEnabled;
    scene.gridSize = preset.gridSize;
    scene.zoom = preset.zoom;
    scene.fogEnabled = preset.fogEnabled;
    scene.fogBrushSize = preset.fogBrushSize;
    scene.fogOpacity = preset.fogOpacity;
    scene.fogReveals = normalizeFogReveals(preset.fogReveals);
    scene.tokens = normalizeTabletopTokens(preset.tokens);
    scene.props = normalizeSceneProps(preset.props);
    scene.pins = normalizeScenePins(preset.pins);
    scene.areas = normalizeSceneAreas(preset.areas);
    scene.initiative = normalizeSceneInitiative(preset.initiative, scene.tokens);
    scene.pings = [];
    tabletopSelectedTokenId = scene.tokens[0]?.id || "";
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderTabletopView({ centerStage: true });
  }

  function deleteSelectedPreset() {
    const presetId = String(tabletopElements.presetSelect?.value || "");
    if (!presetId || !ensureTabletopCanEdit(true)) {
      return;
    }
    const library = getTabletopLibrary();
    const preset = library.presets.find((item) => item.id === presetId);
    if (!preset || !window.confirm(`Excluir o preset "${preset.name}"?`)) {
      return;
    }
    library.presets = library.presets.filter((item) => item.id !== presetId);
    tabletopState.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderLibraryPanel();
  }

  function openTokenSelection(entries, label) {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    if (!Array.isArray(entries) || !entries.length) {
      notifyTabletop(`Nenhum dado disponivel para selecionar de ${label}.`, "warning");
      return;
    }

    tabletopSelectionState = {
      label,
      entries: entries.map((entry, index) => ({
        ...entry,
        selectionKey: String(entry?.sourceKey || `entry-${index}-${entry?.name || "token"}`),
      })),
      selectedKeys: new Set(),
    };
    renderTabletopView();
  }

  function closeTokenSelection(shouldRender = true) {
    tabletopSelectionState = null;
    if (shouldRender && !tabletopElements.view.classList.contains("hidden")) {
      renderTabletopView();
    }
  }

  function renderTokenSelectionPanel(scene) {
    if (!tabletopElements.tokenSelection || !tabletopElements.tokenSelectionList) {
      return;
    }

    if (!tabletopSelectionState || !Array.isArray(tabletopSelectionState.entries) || !tabletopSelectionState.entries.length) {
      tabletopElements.tokenSelection.classList.add("hidden");
      tabletopElements.tokenSelectionList.innerHTML = "";
      return;
    }

    const canEdit = canEditCurrentTabletop();
    tabletopElements.tokenSelection.classList.remove("hidden");
    if (tabletopElements.tokenSelectionTitle) {
      tabletopElements.tokenSelectionTitle.textContent = `Selecionar tokens de ${tabletopSelectionState.label}`;
    }

    const total = tabletopSelectionState.entries.length;
    const selectedCount = tabletopSelectionState.selectedKeys.size;
    if (tabletopElements.tokenSelectionMeta) {
      tabletopElements.tokenSelectionMeta.textContent = `${selectedCount}/${total} marcado(s). Somente os confirmados entram na cena.`;
    }
    if (tabletopElements.tokenSelectionAll) {
      tabletopElements.tokenSelectionAll.disabled = !canEdit || total === 0;
    }
    if (tabletopElements.tokenSelectionClear) {
      tabletopElements.tokenSelectionClear.disabled = !canEdit || selectedCount === 0;
    }
    if (tabletopElements.tokenSelectionConfirm) {
      tabletopElements.tokenSelectionConfirm.disabled = !canEdit || selectedCount === 0;
    }
    if (tabletopElements.tokenSelectionCancel) {
      tabletopElements.tokenSelectionCancel.disabled = !canEdit;
    }

    tabletopElements.tokenSelectionList.innerHTML = "";
    tabletopSelectionState.entries.forEach((entry) => {
      const option = document.createElement("label");
      option.className = "tabletop-token-selection-option";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tabletopSelectionState.selectedKeys.has(entry.selectionKey);
      checkbox.disabled = !canEdit;
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          tabletopSelectionState.selectedKeys.add(entry.selectionKey);
        } else {
          tabletopSelectionState.selectedKeys.delete(entry.selectionKey);
        }
        renderTokenSelectionPanel(scene);
      });

      const copy = document.createElement("span");
      copy.className = "tabletop-token-selection-copy";
      const title = document.createElement("strong");
      title.textContent = entry.name || "Token";
      const meta = document.createElement("span");
      const alreadyInScene = scene?.tokens.some((token) => String(token.sourceKey || "") === String(entry.sourceKey || ""));
      meta.textContent = [
        getTokenRoleLabel(entry.tokenRole || "player"),
        (normalizeTokenRole(entry.tokenRole) === "enemy" ? "" : entry.marker) || "sem marcador",
        alreadyInScene ? "ja esta na cena" : "novo na cena",
      ].join(" | ");
      copy.appendChild(title);
      copy.appendChild(meta);

      option.appendChild(checkbox);
      option.appendChild(copy);
      tabletopElements.tokenSelectionList.appendChild(option);
    });
  }

  function renderStage(scene) {
    if (!tabletopElements.stage || !tabletopElements.mapLayer || !tabletopElements.grid || !tabletopElements.tokensLayer) {
      return;
    }
    const remoteSource = getTabletopRemoteSource();
    const canEdit = canEditCurrentTabletop(remoteSource);
    const canMoveTokens = canMoveTokensCurrentTabletop(remoteSource);
    if (!scene) {
      tabletopElements.stage.style.width = `${TABLETOP_STAGE_WIDTH}px`;
      tabletopElements.stage.style.height = `${TABLETOP_STAGE_HEIGHT}px`;
      tabletopElements.mapLayer.style.backgroundImage = "none";
      tabletopElements.grid.classList.add("hidden");
      tabletopElements.tokensLayer.innerHTML = "";
      if (tabletopElements.propsLayer) {
        tabletopElements.propsLayer.innerHTML = "";
      }
      if (tabletopElements.areasLayer) {
        tabletopElements.areasLayer.innerHTML = "";
      }
      if (tabletopElements.notesLayer) {
        tabletopElements.notesLayer.innerHTML = "";
      }
      if (tabletopElements.fogLayer) {
        tabletopElements.fogLayer.innerHTML = "";
      }
      if (tabletopElements.pingsLayer) {
        tabletopElements.pingsLayer.innerHTML = "";
      }
      if (tabletopElements.rulerLayer) {
        tabletopElements.rulerLayer.innerHTML = "";
      }
      if (tabletopElements.stageTitle) {
        tabletopElements.stageTitle.textContent = "Mesa tatica";
      }
      if (tabletopElements.stageMeta) {
        tabletopElements.stageMeta.textContent = remoteSource
          ? "Nenhum mapa foi liberado para os jogadores no momento."
          : "Crie uma cena para montar o mapa.";
      }
      if (tabletopElements.stageNotes) {
        tabletopElements.stageNotes.textContent = canEdit
          ? "Sem notas na cena. Use este campo para resumir clima, pista, objetivo ou condicoes especiais."
          : "Somente o mestre visualiza as notas internas da cena.";
      }
      if (tabletopElements.stageTurn) {
        tabletopElements.stageTurn.textContent = "Nenhuma iniciativa ativa.";
      }
      if (tabletopElements.stageEmpty) {
        tabletopElements.stageEmpty.classList.remove("hidden");
        tabletopElements.stageEmpty.innerHTML = remoteSource
          ? "<strong>Nenhum mapa disponivel.</strong><p>O mestre ainda nao liberou uma cena para os jogadores.</p>"
          : "<strong>Mapa pronto para a sessao.</strong><p>Envie uma imagem, crie tokens e arraste tudo pela mesa.</p>";
      }
      updateStageSelection();
      return;
    }
    const renderZoom = getSceneRenderZoom(scene, remoteSource);
    const gridVisible = getSceneGridEnabled(scene, remoteSource);
    tabletopElements.stage.style.width = `${TABLETOP_STAGE_WIDTH * renderZoom}px`;
    tabletopElements.stage.style.height = `${TABLETOP_STAGE_HEIGHT * renderZoom}px`;
    tabletopElements.mapLayer.style.backgroundImage = scene.mapImage ? toCssUrl(scene.mapImage) : "none";
    tabletopElements.grid.classList.toggle("hidden", !gridVisible);
    tabletopElements.grid.style.backgroundSize = `${scene.gridSize * renderZoom}px ${scene.gridSize * renderZoom}px`;
    tabletopElements.grid.style.opacity = gridVisible ? "1" : "0";
    tabletopElements.tokensLayer.innerHTML = "";
    renderScenePropsLayer(scene, renderZoom, canEdit);
    renderSceneAreasLayer(scene, renderZoom, canEdit);
    scene.tokens.forEach((token) => tabletopElements.tokensLayer.appendChild(buildStageTokenElement(token, scene, renderZoom)));
    renderSceneNotesLayer(scene, renderZoom, canEdit);
    renderSceneFogLayer(scene, renderZoom, canEdit);
    renderScenePingsLayer(scene, renderZoom);
    renderSceneRulerLayer(scene, renderZoom);
    if (tabletopElements.stageTitle) {
      tabletopElements.stageTitle.textContent = scene.name;
    }
    if (tabletopElements.stageMeta) {
      tabletopElements.stageMeta.textContent = [
        scene.mapImage ? "Mapa ativo" : "Sem mapa base",
        gridVisible ? `${scene.gridSize}px de grade` : "Grade oculta",
        `${scene.tokens.length} token(ns)`,
        `${Math.round(renderZoom * 100)}% de zoom`,
        remoteSource ? `Compartilhado em ${remoteSource.roomId}` : "Mesa local",
        canEdit
          ? (scene.playerVisible === false ? "oculto dos jogadores" : "visivel aos jogadores")
          : (remoteSource
            ? (canMoveTokens
              ? "voce move somente o token da sua ficha; o mestre gerencia a mesa"
              : "visualizacao sincronizada; somente o mestre controla a mesa")
            : "mesa local"),
      ].filter(Boolean).join(" | ");
    }
    if (tabletopElements.stageNotes) {
      tabletopElements.stageNotes.textContent = canEdit
        ? (scene.notes || "Sem notas na cena. Use este campo para resumir clima, pista, objetivo ou condicoes especiais.")
        : "Somente o mestre visualiza as notas internas da cena.";
    }
    if (tabletopElements.stageTurn) {
      const stageTurnToken = scene.tokens.find((token) => token.id === getCurrentTurnTokenId(scene));
      tabletopElements.stageTurn.textContent = stageTurnToken
        ? `Rodada ${scene.initiative.round} | vez de ${stageTurnToken.name}`
        : "Nenhuma iniciativa ativa.";
    }
    if (tabletopElements.stageEmpty) {
      tabletopElements.stageEmpty.classList.toggle("hidden", Boolean(scene.mapImage) || scene.tokens.length > 0);
      tabletopElements.stageEmpty.innerHTML = canEdit
        ? "<strong>Mapa pronto para a sessao.</strong><p>Envie uma imagem, crie tokens e arraste tudo pela mesa.</p>"
        : (canMoveTokens
          ? "<strong>Mesa pronta.</strong><p>Escolha uma cena liberada pelo mestre e mova somente o token da sua ficha.</p>"
          : "<strong>Mesa pronta.</strong><p>Acompanhe a cena liberada pelo mestre em tempo real.</p>");
    }
    updateStageSelection();
    schedulePingCleanup(scene);
  }

  function renderScenePropsLayer(scene, renderZoom, canEdit) {
    if (!tabletopElements.propsLayer) {
      return;
    }
    tabletopElements.propsLayer.innerHTML = "";
    scene.props
      .filter((prop) => canEdit || (prop.playerVisible && prop.layer !== "gm"))
      .forEach((prop) => {
        const element = document.createElement("button");
        element.type = "button";
        element.className = prop.layer === "gm" ? "tabletop-scene-prop gm" : "tabletop-scene-prop";
        element.dataset.tabletopPropId = prop.id;
        element.style.left = `${prop.x * renderZoom}px`;
        element.style.top = `${prop.y * renderZoom}px`;
        element.style.width = `${prop.width * renderZoom}px`;
        element.style.height = `${prop.height * renderZoom}px`;
        element.style.transform = `rotate(${prop.rotation}deg)`;
        element.style.backgroundImage = toCssUrl(prop.image);
        element.style.pointerEvents = canEdit && !prop.locked ? "auto" : "none";
        element.title = prop.name;
        tabletopElements.propsLayer.appendChild(element);
      });
  }

  function renderSceneAreasLayer(scene, renderZoom, canEdit) {
    if (!tabletopElements.areasLayer) {
      return;
    }
    tabletopElements.areasLayer.innerHTML = "";
    scene.areas
      .filter((area) => canEdit || (area.playerVisible && area.layer !== "gm"))
      .forEach((area) => {
        const element = document.createElement("div");
        element.className = `tabletop-scene-area shape-${area.shape}${area.layer === "gm" ? " gm" : ""}`;
        element.dataset.tabletopAreaId = area.id;
        element.style.setProperty("--area-color", area.color);
        if (area.shape === "circle") {
          element.style.left = `${(area.x - area.radius) * renderZoom}px`;
          element.style.top = `${(area.y - area.radius) * renderZoom}px`;
          element.style.width = `${area.radius * 2 * renderZoom}px`;
          element.style.height = `${area.radius * 2 * renderZoom}px`;
        } else if (area.shape === "line") {
          element.style.left = `${area.x * renderZoom}px`;
          element.style.top = `${(area.y - 8) * renderZoom}px`;
          element.style.width = `${area.length * renderZoom}px`;
          element.style.height = `${Math.max(10, area.radius * 0.18) * renderZoom}px`;
          element.style.transform = `rotate(${area.angle}deg)`;
        } else {
          element.style.left = `${area.x * renderZoom}px`;
          element.style.top = `${(area.y - area.radius) * renderZoom}px`;
          element.style.width = `${area.length * renderZoom}px`;
          element.style.height = `${area.radius * 2 * renderZoom}px`;
          element.style.transform = `rotate(${area.angle}deg)`;
        }
        const label = document.createElement("span");
        label.className = "tabletop-scene-area-label";
        label.textContent = area.name;
        element.appendChild(label);
        tabletopElements.areasLayer.appendChild(element);
      });
  }

  function renderSceneNotesLayer(scene, renderZoom, canEdit) {
    if (!tabletopElements.notesLayer) {
      return;
    }
    tabletopElements.notesLayer.innerHTML = "";
    scene.pins
      .filter((pin) => canEdit || (pin.playerVisible && pin.layer !== "gm"))
      .forEach((pin) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = pin.layer === "gm" ? "tabletop-scene-pin gm" : "tabletop-scene-pin";
        button.dataset.tabletopPinId = pin.id;
        button.style.left = `${pin.x * renderZoom}px`;
        button.style.top = `${pin.y * renderZoom}px`;
        button.style.setProperty("--pin-color", pin.color);
        button.title = pin.title;
        const badge = document.createElement("span");
        badge.className = "tabletop-scene-pin-badge";
        badge.textContent = "N";
        const label = document.createElement("span");
        label.className = "tabletop-scene-pin-label";
        label.textContent = pin.title;
        button.appendChild(badge);
        button.appendChild(label);
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          showScenePinDetails(pin);
        });
        tabletopElements.notesLayer.appendChild(button);
      });
  }

  function renderSceneFogLayer(scene, renderZoom, canEdit) {
    if (!tabletopElements.fogLayer) {
      return;
    }
    if (!scene.fogEnabled) {
      tabletopElements.fogLayer.innerHTML = "";
      tabletopElements.fogLayer.classList.add("hidden");
      return;
    }
    tabletopElements.fogLayer.classList.remove("hidden");
    const overlayOpacity = canEdit ? Math.max(0.25, scene.fogOpacity * 0.65) : scene.fogOpacity;
    const maskId = `tabletop-fog-mask-${scene.id}`;
    const circles = scene.fogReveals.map((reveal) => `<circle cx="${reveal.x}" cy="${reveal.y}" r="${reveal.radius}" fill="black"></circle>`).join("");
    tabletopElements.fogLayer.innerHTML = `
      <svg viewBox="0 0 ${TABLETOP_STAGE_WIDTH} ${TABLETOP_STAGE_HEIGHT}" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <mask id="${maskId}">
            <rect x="0" y="0" width="${TABLETOP_STAGE_WIDTH}" height="${TABLETOP_STAGE_HEIGHT}" fill="white"></rect>
            ${circles}
          </mask>
        </defs>
        <rect x="0" y="0" width="${TABLETOP_STAGE_WIDTH}" height="${TABLETOP_STAGE_HEIGHT}" fill="#050507" fill-opacity="${overlayOpacity.toFixed(3)}" mask="url(#${maskId})"></rect>
      </svg>`;
    tabletopElements.fogLayer.style.width = `${TABLETOP_STAGE_WIDTH * renderZoom}px`;
    tabletopElements.fogLayer.style.height = `${TABLETOP_STAGE_HEIGHT * renderZoom}px`;
  }

  function renderScenePingsLayer(scene, renderZoom) {
    if (!tabletopElements.pingsLayer) {
      return;
    }
    tabletopElements.pingsLayer.innerHTML = "";
    getVisibleScenePings(scene).forEach((ping) => {
      const element = document.createElement("div");
      element.className = "tabletop-scene-ping";
      element.style.left = `${ping.x * renderZoom}px`;
      element.style.top = `${ping.y * renderZoom}px`;
      element.style.setProperty("--ping-color", ping.color);
      if (ping.label) {
        const label = document.createElement("span");
        label.className = "tabletop-scene-ping-label";
        label.textContent = ping.label;
        element.appendChild(label);
      }
      tabletopElements.pingsLayer.appendChild(element);
    });
  }

  function renderSceneRulerLayer(scene, renderZoom) {
    if (!tabletopElements.rulerLayer) {
      return;
    }
    tabletopElements.rulerLayer.innerHTML = "";
    if (!tabletopMeasurement || tabletopMeasurement.sceneId !== scene.id) {
      return;
    }
    const startX = tabletopMeasurement.startX;
    const startY = tabletopMeasurement.startY;
    const endX = tabletopMeasurement.endX;
    const endY = tabletopMeasurement.endY;
    const distanceLabel = formatRulerDistance(scene, startX, startY, endX, endY);
    tabletopElements.rulerLayer.innerHTML = `
      <svg viewBox="0 0 ${TABLETOP_STAGE_WIDTH} ${TABLETOP_STAGE_HEIGHT}" preserveAspectRatio="none" aria-hidden="true">
        <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="rgba(255, 224, 167, 0.95)" stroke-width="4" stroke-dasharray="14 8"></line>
        <circle cx="${startX}" cy="${startY}" r="12" fill="rgba(255, 224, 167, 0.88)"></circle>
        <circle cx="${endX}" cy="${endY}" r="12" fill="rgba(255, 224, 167, 0.88)"></circle>
      </svg>`;
    const label = document.createElement("div");
    label.className = "tabletop-ruler-label";
    label.textContent = distanceLabel;
    label.style.left = `${((startX + endX) / 2) * renderZoom}px`;
    label.style.top = `${((startY + endY) / 2) * renderZoom}px`;
    tabletopElements.rulerLayer.appendChild(label);
  }

  function showScenePinDetails(pin) {
    const title = String(pin?.title || "Nota");
    const body = String(pin?.body || "Sem detalhes.");
    notifyTabletop(`${title}: ${body}`, "status");
  }

  function getVisibleScenePings(scene) {
    const now = Date.now();
    return (scene?.pings || []).filter((ping) => Date.parse(ping.expiresAt || "") > now);
  }

  function schedulePingCleanup(scene) {
    if (tabletopPingCleanupTimer) {
      window.clearTimeout(tabletopPingCleanupTimer);
      tabletopPingCleanupTimer = 0;
    }
    const visiblePings = getVisibleScenePings(scene);
    if (!visiblePings.length) {
      return;
    }
    const nextExpiry = Math.min(...visiblePings.map((ping) => Date.parse(ping.expiresAt || "")).filter(Number.isFinite));
    if (!Number.isFinite(nextExpiry)) {
      return;
    }
    tabletopPingCleanupTimer = window.setTimeout(() => {
      if (!tabletopElements.view.classList.contains("hidden")) {
        renderTabletopView();
      }
    }, Math.max(200, nextExpiry - Date.now() + 40));
  }

  function formatRulerDistance(scene, startX, startY, endX, endY) {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt((dx ** 2) + (dy ** 2));
    if (scene?.gridEnabled && scene.gridSize > 0) {
      return `${(distance / scene.gridSize).toFixed(1)} quadrados`;
    }
    return `${Math.round(distance)} px`;
  }

  function handleTabletopSceneAdd() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const newScene = createTabletopScene(`Cena ${String(tabletopState.scenes.length + 1).padStart(2, "0")}`);
    tabletopState.scenes.push(newScene);
    tabletopState.activeSceneId = newScene.id;
    tabletopSelectedTokenId = "";
    saveTabletopState();
    renderTabletopView({ centerStage: true });
  }

  function duplicateScene(sceneId) {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const source = tabletopState.scenes.find((scene) => scene.id === sceneId);
    if (!source) {
      return;
    }
    const clone = normalizeTabletopScene({
      ...source,
      id: makeId("scene"),
      name: `${source.name} (Copia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tokens: source.tokens.map((token, index) => ({
        ...token,
        id: makeId(`token-${index}`),
        x: clampTokenCoordinate(token.x + 24, token.size, TABLETOP_STAGE_WIDTH),
        y: clampTokenCoordinate(token.y + 24, token.size, TABLETOP_STAGE_HEIGHT),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    });
    const tokenIdMap = new Map();
    source.tokens.forEach((token, index) => {
      const cloneToken = clone.tokens[index];
      if (cloneToken) {
        tokenIdMap.set(token.id, cloneToken.id);
      }
    });
    clone.initiative = normalizeSceneInitiative({
      ...source.initiative,
      entries: (source.initiative?.entries || []).map((entry) => ({
        ...entry,
        id: makeId("init"),
        tokenId: tokenIdMap.get(entry.tokenId) || entry.tokenId,
      })),
    }, clone.tokens);
    clone.pings = [];
    tabletopState.scenes.push(clone);
    tabletopState.activeSceneId = clone.id;
    tabletopSelectedTokenId = clone.tokens[0]?.id || "";
    saveTabletopState();
    renderTabletopView({ centerStage: true });
  }

  function deleteScene(sceneId) {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    if (tabletopState.scenes.length <= 1) {
      notifyTabletop("A mesa precisa ter pelo menos uma cena.", "warning");
      return;
    }
    const target = tabletopState.scenes.find((scene) => scene.id === sceneId);
    if (!target || !window.confirm(`Excluir a cena "${target.name}"?`)) {
      return;
    }
    tabletopState.scenes = tabletopState.scenes.filter((scene) => scene.id !== sceneId);
    tabletopState.activeSceneId = tabletopState.scenes[0]?.id || "";
    tabletopSelectedTokenId = tabletopState.scenes[0]?.tokens[0]?.id || "";
    saveTabletopState();
    renderTabletopView({ centerStage: true });
  }

  function handleSceneNameInput() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.sceneName || !ensureTabletopCanEdit()) {
      return;
    }
    scene.name = tabletopElements.sceneName.value.trim() || "Cena";
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneList(scene);
    if (tabletopElements.stageTitle) {
      tabletopElements.stageTitle.textContent = scene.name;
    }
  }

  function handleSceneNotesInput() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.sceneNotes || !ensureTabletopCanEdit()) {
      return;
    }
    scene.notes = tabletopElements.sceneNotes.value;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    if (tabletopElements.stageNotes) {
      tabletopElements.stageNotes.textContent = scene.notes || "Sem notas na cena. Use este campo para resumir clima, pista, objetivo ou condicoes especiais.";
    }
  }

  function handleSceneVisibilityChange() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.sceneVisible || !ensureTabletopCanEdit()) {
      return;
    }
    scene.playerVisible = tabletopElements.sceneVisible.checked;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneList(scene);
    renderStage(scene);
  }

  function handleGridEnabledChange() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.gridEnabled || !ensureTabletopCanEdit()) {
      return;
    }
    scene.gridEnabled = tabletopElements.gridEnabled.checked;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderStage(scene);
    syncSceneEditor(scene);
  }

  function handleGridSizeInput() {
    const scene = getActiveScene();
    if (!scene || !tabletopElements.gridSize || !ensureTabletopCanEdit()) {
      return;
    }
    scene.gridSize = clampNumber(Number.parseInt(tabletopElements.gridSize.value || String(TABLETOP_DEFAULT_GRID_SIZE), 10) || TABLETOP_DEFAULT_GRID_SIZE, TABLETOP_MIN_GRID_SIZE, TABLETOP_MAX_GRID_SIZE);
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderStage(scene);
    syncSceneEditor(scene);
  }

  function handleZoomRangeInput() {
    if (tabletopElements.zoom) {
      setSceneZoom(Number.parseInt(tabletopElements.zoom.value || "100", 10) / 100);
    }
  }

  function stepSceneZoom(delta) {
    const scene = getActiveScene();
    if (scene) {
      setSceneZoom(getSceneRenderZoom(scene) + delta);
    }
  }

  function setSceneZoom(nextZoom, options = {}) {
    const scene = getActiveScene();
    if (!scene) {
      return;
    }
    applySceneZoomValue(scene, nextZoom, options);
  }

  function renderTokenList(scene) {
    if (!tabletopElements.tokenList) {
      return;
    }
    const canEdit = canEditCurrentTabletop();
    tabletopElements.tokenList.innerHTML = "";
    if (!scene) {
      const empty = document.createElement("div");
      empty.className = "tabletop-empty-list";
      empty.innerHTML = "<strong>Nenhuma cena disponivel.</strong><p>O mestre ainda nao liberou um mapa para interagir.</p>";
      tabletopElements.tokenList.appendChild(empty);
      return;
    }
    if (!scene.tokens.length) {
      const empty = document.createElement("div");
      empty.className = "tabletop-empty-list";
      empty.innerHTML = "<strong>Nenhum token nesta cena.</strong><p>Crie um token manualmente ou importe fichas e NPCs para montar a mesa.</p>";
      tabletopElements.tokenList.appendChild(empty);
      return;
    }
    scene.tokens.forEach((token) => {
      const item = document.createElement("article");
      item.className = "tabletop-token-item";
      const row = document.createElement("button");
      row.type = "button";
      row.className = token.id === tabletopSelectedTokenId ? "tabletop-token-row active" : "tabletop-token-row";
      row.addEventListener("click", () => {
        tabletopSelectedTokenId = token.id;
        renderTokenList(scene);
        syncTokenEditor(scene);
        updateStageSelection();
      });

      const swatch = document.createElement("span");
      swatch.className = token.image ? `tabletop-token-swatch has-image role-${normalizeTokenRole(token.tokenRole)}` : `tabletop-token-swatch role-${normalizeTokenRole(token.tokenRole)}`;
      swatch.style.setProperty("--tabletop-token-color", token.color);
      swatch.style.setProperty("--tabletop-token-ring", getTokenRoleRingColor(token.tokenRole));
      swatch.style.setProperty("--tabletop-token-image-fit", typeof normalizeImageFit === "function" ? normalizeImageFit(token.imageFit) : String(token.imageFit || "cover"));
      if (token.image) {
        swatch.style.backgroundImage = toCssUrl(token.image);
        swatch.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openTabletopImageViewer({ src: token.image, title: token.name });
        });
      } else {
        swatch.textContent = getTokenInitials(token.name);
      }

      const labels = document.createElement("span");
      labels.className = "tabletop-token-labels";
      const title = document.createElement("strong");
      title.textContent = token.name;
      const meta = document.createElement("span");
      meta.className = "tabletop-token-source";
      meta.textContent = [
        getTokenRoleLabel(token.tokenRole),
        getTokenVisibleMarker(token) || `(${Math.round(token.x)}, ${Math.round(token.y)})`,
        getTokenConditionSummary(token),
      ].filter(Boolean).join(" | ");
      labels.appendChild(title);
      labels.appendChild(meta);
      row.appendChild(swatch);
      row.appendChild(labels);

      const quickDelete = document.createElement("button");
      quickDelete.type = "button";
      quickDelete.className = "menu-delete-btn tabletop-token-quick-delete";
      quickDelete.textContent = "Excluir";
      quickDelete.disabled = !canEdit;
      quickDelete.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleteTokenById(token.id);
      });

      item.appendChild(row);
      item.appendChild(quickDelete);
      tabletopElements.tokenList.appendChild(item);
    });
  }

  function syncTokenEditor(scene) {
    const token = getSelectedToken(scene);
    const canEdit = canEditCurrentTabletop();
    if (!tabletopElements.tokenEditor) {
      return;
    }
    if (!token || !canEdit) {
      tabletopElements.tokenEditor.classList.add("hidden");
      renderTokenConditionsPicker(null);
      return;
    }
    tabletopElements.tokenEditor.classList.remove("hidden");
    syncTokenLinkSelector(token);
    if (tabletopElements.tokenEditorTitle) {
      tabletopElements.tokenEditorTitle.textContent = token.name;
    }
    if (tabletopElements.tokenEditorMeta) {
      tabletopElements.tokenEditorMeta.textContent = getTokenEditorMetaText(token);
    }
    if (tabletopElements.tokenName) {
      tabletopElements.tokenName.value = token.name;
    }
    if (tabletopElements.tokenColor) {
      tabletopElements.tokenColor.value = normalizeColor(token.color);
    }
    if (tabletopElements.tokenMarker) {
      tabletopElements.tokenMarker.value = token.marker;
    }
    if (tabletopElements.tokenRole) {
      tabletopElements.tokenRole.value = normalizeTokenRole(token.tokenRole);
    }
    if (tabletopElements.tokenImageFit) {
      tabletopElements.tokenImageFit.value = typeof normalizeImageFit === "function"
        ? normalizeImageFit(token.imageFit)
        : String(token.imageFit || "cover");
    }
    if (tabletopElements.tokenSize) {
      tabletopElements.tokenSize.min = String(getTokenMinimumSizeForRole(token.tokenRole));
      tabletopElements.tokenSize.value = String(token.size);
    }
    if (tabletopElements.tokenX) {
      tabletopElements.tokenX.value = String(Math.round(token.x));
    }
    if (tabletopElements.tokenY) {
      tabletopElements.tokenY.value = String(Math.round(token.y));
    }
    if (tabletopElements.tokenImageClear) {
      tabletopElements.tokenImageClear.disabled = !token.image || !canEdit;
    }
    renderTokenConditionsPicker(token);
  }

  function syncTokenLinkSelector(token) {
    if (!tabletopElements.tokenLink) {
      return;
    }

    const options = buildLinkedSourceOptions();
    const activeSourceKey = String(token?.sourceKey || "");
    if (activeSourceKey && !options.some((option) => option.value === activeSourceKey)) {
      options.push({
        value: activeSourceKey,
        label: `Vinculo ausente: ${activeSourceKey}`,
      });
    }

    tabletopElements.tokenLink.innerHTML = "";
    options.forEach((option) => {
      const element = document.createElement("option");
      element.value = option.value;
      element.textContent = option.label;
      tabletopElements.tokenLink.appendChild(element);
    });
    tabletopElements.tokenLink.value = activeSourceKey;
  }

  function syncTokenSourcePicker() {
    if (!tabletopElements.tokenSourceSelect) {
      return;
    }

    if (!canEditCurrentTabletop()) {
      tabletopElements.tokenSourceSelect.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Disponivel apenas no modo mestre";
      tabletopElements.tokenSourceSelect.appendChild(placeholder);
      tabletopElements.tokenSourceSelect.value = "";
      return;
    }

    const currentValue = String(tabletopElements.tokenSourceSelect.value || "");
    const options = buildLinkedSourceOptions("Escolha uma ficha, NPC ou participante");
    tabletopElements.tokenSourceSelect.innerHTML = "";
    options.forEach((option) => {
      const element = document.createElement("option");
      element.value = option.value;
      element.textContent = option.label;
      tabletopElements.tokenSourceSelect.appendChild(element);
    });
    tabletopElements.tokenSourceSelect.value = options.some((option) => option.value === currentValue)
      ? currentValue
      : "";
  }

  function buildLinkedSourceOptions(emptyLabel = "Token personalizado") {
    const options = [{ value: "", label: emptyLabel }];
    const seen = new Set([""]);

    addLinkedSourceOptionGroup(options, seen, buildCharacterImportEntries(), "Ficha");
    addLinkedSourceOptionGroup(options, seen, buildNpcImportEntries(), "NPC");
    addLinkedSourceOptionGroup(options, seen, buildMissionImportEntries(), "Missao");

    return options;
  }

  function addLinkedSourceOptionGroup(options, seen, entries, labelPrefix) {
    entries.forEach((entry) => {
      const sourceKey = String(entry?.sourceKey || "");
      if (!sourceKey || seen.has(sourceKey)) {
        return;
      }
      seen.add(sourceKey);
      options.push({
        value: sourceKey,
        label: `${labelPrefix}: ${String(entry?.name || "Token")}`,
      });
    });
  }

  function getLinkedSourceLabel(sourceKey = "") {
    return buildLinkedSourceOptions().find((option) => option.value === String(sourceKey || ""))?.label
      || String(sourceKey || "token personalizado");
  }

  function getTokenEditorMetaText(token) {
    return [
      getTokenRoleLabel(token.tokenRole),
      getTokenKindLabel(token.kind),
      token.image ? "com imagem" : "sem imagem",
      `(${Math.round(token.x)}, ${Math.round(token.y)})`,
      getTokenConditionSummary(token),
      normalizeTokenRole(token.tokenRole) === "enemy" ? "marcador oculto na mesa" : "",
      token.sourceKey ? `vinculo: ${getLinkedSourceLabel(token.sourceKey)}` : "token livre",
    ].filter(Boolean).join(" | ");
  }

  function buildStageTokenElement(token, scene, renderZoom = getSceneRenderZoom(scene)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = token.id === tabletopSelectedTokenId
      ? `tabletop-token active role-${normalizeTokenRole(token.tokenRole)}`
      : `tabletop-token role-${normalizeTokenRole(token.tokenRole)}`;
    button.dataset.tabletopTokenId = token.id;

    const avatar = document.createElement("span");
    avatar.className = token.image ? "tabletop-token-avatar has-image" : "tabletop-token-avatar";
    avatar.style.setProperty("--tabletop-token-color", token.color);
    if (token.image) {
      avatar.style.backgroundImage = toCssUrl(token.image);
    } else {
      avatar.textContent = getTokenInitials(token.name);
    }

    const markerText = getTokenStageMarker(token);
    const marker = document.createElement("span");
    marker.className = "tabletop-token-marker";
    marker.textContent = markerText;
    marker.classList.toggle("hidden", !markerText);

    const nameplate = document.createElement("span");
    nameplate.className = "tabletop-token-nameplate";
    nameplate.textContent = token.name;

    const conditions = document.createElement("span");
    conditions.className = "tabletop-token-conditions";
    buildTokenConditionBadges(token).forEach((badge) => conditions.appendChild(badge));

    button.appendChild(avatar);
    button.appendChild(marker);
    button.appendChild(conditions);
    button.appendChild(nameplate);
    button.addEventListener("click", (event) => {
      if (!token.image || Date.now() < tabletopSuppressImagePreviewUntil) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      openTabletopImageViewer({ src: token.image, title: token.name });
    });
    applyTokenElementState(button, token, scene, renderZoom);
    return button;
  }

  function applyTokenElementState(element, token, scene, renderZoom = getSceneRenderZoom(scene)) {
    element.style.left = `${token.x * renderZoom}px`;
    element.style.top = `${token.y * renderZoom}px`;
    element.style.width = `${token.size * renderZoom}px`;
    element.style.height = `${token.size * renderZoom}px`;
    element.style.setProperty("--tabletop-token-color", token.color);
    element.style.setProperty("--tabletop-token-ring", getTokenRoleRingColor(token.tokenRole));
    element.style.setProperty("--tabletop-token-image-fit", typeof normalizeImageFit === "function" ? normalizeImageFit(token.imageFit) : String(token.imageFit || "cover"));
    element.classList.add("tabletop-token");
    element.classList.remove("role-player", "role-npc", "role-enemy");
    element.classList.add(`role-${normalizeTokenRole(token.tokenRole)}`);
    element.classList.toggle("active", token.id === tabletopSelectedTokenId);
    element.classList.toggle("is-turn", getCurrentTurnTokenId(scene) === token.id);
    element.classList.toggle("is-movable", canMoveSpecificTokenCurrentTabletop(token));
    element.classList.toggle("is-player-locked", !canMoveSpecificTokenCurrentTabletop(token) && !canEditCurrentTabletop());

    const avatar = element.querySelector(".tabletop-token-avatar");
    if (avatar) {
      avatar.classList.toggle("has-image", Boolean(token.image));
      avatar.style.setProperty("--tabletop-token-color", token.color);
      avatar.style.backgroundImage = token.image ? toCssUrl(token.image) : "none";
      avatar.textContent = token.image ? "" : getTokenInitials(token.name);
    }

    const marker = element.querySelector(".tabletop-token-marker");
    if (marker) {
      const markerText = getTokenStageMarker(token);
      marker.textContent = markerText;
      marker.classList.toggle("hidden", !markerText);
    }

    const conditions = element.querySelector(".tabletop-token-conditions");
    if (conditions) {
      conditions.innerHTML = "";
      buildTokenConditionBadges(token).forEach((badge) => conditions.appendChild(badge));
    }

    const nameplate = element.querySelector(".tabletop-token-nameplate");
    if (nameplate) {
      nameplate.textContent = token.name;
    }
  }

  function updateStageSelection() {
    if (!tabletopElements.tokensLayer) {
      return;
    }
    Array.from(tabletopElements.tokensLayer.querySelectorAll("[data-tabletop-token-id]")).forEach((element) => {
      const tokenId = element.getAttribute("data-tabletop-token-id") || "";
      element.classList.toggle("active", tokenId === tabletopSelectedTokenId);
    });
  }

  function handleTabletopTokenAdd() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const scene = getActiveScene();
    if (!scene) {
      return;
    }
    const position = getPlacementForIndex(scene, scene.tokens.length, 64);
    const token = createTabletopToken("Novo token", { x: position.x, y: position.y, color: pickTokenColor(`token-${scene.tokens.length}`) });
    scene.tokens.push(token);
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    scene.updatedAt = new Date().toISOString();
    tabletopSelectedTokenId = token.id;
    saveTabletopState();
    renderTabletopView();
  }

  async function handleTokenUploadFileChange(event) {
    const scene = getActiveScene();
    const files = Array.from(event.target?.files || []);
    if (!files.length || !scene || !ensureTabletopCanEdit(true)) {
      if (event.target) {
        event.target.value = "";
      }
      return;
    }

    try {
      const createdTokens = await Promise.all(files.map(async (file, index) => {
        const tokenRole = guessTokenRole(file.name);
        const size = getTokenMinimumSizeForRole(tokenRole);
        const placement = getPlacementForIndex(scene, scene.tokens.length + index, size);
        return createTabletopToken(getTokenNameFromFileName(file.name, index), {
          kind: "custom",
          tokenRole,
          color: pickTokenColor(file.name || `token-${index}`),
          image: await readFileAsDataUrl(file),
          imageFit: "cover",
          size,
          x: placement.x,
          y: placement.y,
        });
      }));

      scene.tokens.push(...createdTokens);
      scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
      scene.updatedAt = new Date().toISOString();
      tabletopSelectedTokenId = createdTokens[createdTokens.length - 1]?.id || tabletopSelectedTokenId;
      saveTabletopState();
      renderTabletopView();
      notifyTabletop(`${createdTokens.length} token(ns) enviado(s) para a cena.`, "success");
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel ler uma das imagens de token.", "danger");
    } finally {
      if (event.target) {
        event.target.value = "";
      }
    }
  }

  function handleAddSelectedLinkedToken() {
    const scene = getActiveScene();
    const sourceKey = String(tabletopElements.tokenSourceSelect?.value || "");
    if (!scene || !sourceKey || !ensureTabletopCanEdit(true)) {
      return;
    }

    const existing = scene.tokens.find((token) => String(token.sourceKey || "") === sourceKey);
    if (existing) {
      tabletopSelectedTokenId = existing.id;
      renderTabletopView();
      notifyTabletop("Esse vinculo ja esta nesta cena. Selecionei o token existente.", "status");
      return;
    }

    const entry = buildLinkedSourceEntryMap().get(sourceKey);
    if (!entry) {
      notifyTabletop("Nao encontrei essa ficha ou NPC para adicionar agora.", "warning");
      syncTokenSourcePicker();
      return;
    }

    const placement = getPlacementForIndex(scene, scene.tokens.length, Number(entry.size) || 64);
    const token = createTabletopToken(entry.name || "Token", {
      sourceKey,
      kind: entry.kind || "custom",
      tokenRole: entry.tokenRole,
      color: entry.color,
      image: entry.image,
      imageFit: entry.imageFit,
      marker: entry.marker,
      ownerUid: entry.ownerUid,
      ownerCharacterId: entry.ownerCharacterId,
      size: entry.size,
      x: placement.x,
      y: placement.y,
    });
    scene.tokens.push(token);
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    scene.updatedAt = new Date().toISOString();
    tabletopSelectedTokenId = token.id;
    saveTabletopState();
    renderTabletopView();
    notifyTabletop(`${entry.name || "Token"} adicionado(a) a cena.`, "success");
  }

  function toggleAllTokenSelections(nextChecked) {
    if (!tabletopSelectionState || !ensureTabletopCanEdit(true)) {
      return;
    }
    tabletopSelectionState.selectedKeys = nextChecked
      ? new Set(tabletopSelectionState.entries.map((entry) => entry.selectionKey))
      : new Set();
    renderTabletopView();
  }

  function handleConfirmTokenSelection() {
    if (!tabletopSelectionState || !ensureTabletopCanEdit(true)) {
      return;
    }

    const selectedEntries = tabletopSelectionState.entries.filter((entry) => tabletopSelectionState.selectedKeys.has(entry.selectionKey));
    if (!selectedEntries.length) {
      notifyTabletop("Selecione pelo menos um token antes de confirmar.", "warning");
      return;
    }

    const label = tabletopSelectionState.label;
    tabletopSelectionState = null;
    importEntriesToActiveScene(selectedEntries, label);
  }

  function handleTokenLinkChange() {
    const scene = getActiveScene();
    const token = getSelectedToken(scene);
    if (!scene || !token || !tabletopElements.tokenLink || !ensureTabletopCanEdit(true)) {
      return;
    }

    const nextSourceKey = String(tabletopElements.tokenLink.value || "");
    const previousSourceKey = String(token.sourceKey || "");
    token.sourceKey = nextSourceKey;

    if (!nextSourceKey) {
      token.kind = "custom";
      token.ownerUid = "";
      token.ownerCharacterId = "";
    } else {
      const linkedEntry = buildLinkedSourceEntryMap().get(nextSourceKey);
      syncLinkedTokenWithEntry(token, linkedEntry);
    }

    if (previousSourceKey !== token.sourceKey) {
      token.updatedAt = new Date().toISOString();
    }
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderTabletopView();
  }

  function deleteTokenById(tokenId) {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const scene = getActiveScene();
    const token = scene?.tokens.find((item) => item.id === tokenId);
    if (!scene || !token || !window.confirm(`Excluir o token "${token.name}"?`)) {
      return;
    }
    scene.tokens = scene.tokens.filter((item) => item.id !== token.id);
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    scene.updatedAt = new Date().toISOString();
    if (tabletopSelectedTokenId === token.id) {
      tabletopSelectedTokenId = scene.tokens[0]?.id || "";
    }
    saveTabletopState();
    renderTabletopView();
  }

  function createTabletopToken(name = "Token", overrides = {}) {
    const tokenRole = normalizeTokenRole(overrides.tokenRole || guessTokenRole(name));
    const size = normalizeTokenSize(overrides.size, tokenRole);
    return {
      id: makeId("token"),
      sourceKey: String(overrides.sourceKey || ""),
      ownerUid: String(overrides.ownerUid || ""),
      ownerCharacterId: String(overrides.ownerCharacterId || ""),
      kind: String(overrides.kind || "custom"),
      tokenRole,
      name: String(name || "Token").trim() || "Token",
      color: normalizeColor(overrides.color || pickTokenColor(name)),
      image: String(overrides.image || ""),
      imageFit: typeof normalizeImageFit === "function" ? normalizeImageFit(overrides.imageFit) : String(overrides.imageFit || "cover"),
      marker: String(overrides.marker || ""),
      conditions: normalizeTokenConditions(overrides.conditions),
      size,
      x: clampTokenCoordinate(overrides.x ?? 96, size, TABLETOP_STAGE_WIDTH),
      y: clampTokenCoordinate(overrides.y ?? 96, size, TABLETOP_STAGE_HEIGHT),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  function patchSelectedToken(patch) {
    const scene = getActiveScene();
    const token = getSelectedToken(scene);
    if (!scene || !token || !patch || typeof patch !== "object" || !ensureTabletopCanEdit()) {
      return;
    }
    const nextTokenRole = patch.tokenRole != null
      ? normalizeTokenRole(patch.tokenRole, token.tokenRole)
      : normalizeTokenRole(token.tokenRole);
    let nextSize = patch.size != null
      ? normalizeTokenSize(patch.size, nextTokenRole)
      : token.size;
    if (patch.tokenRole != null) {
      nextSize = Math.max(nextSize, getTokenMinimumSizeForRole(nextTokenRole));
      token.tokenRole = nextTokenRole;
    }
    if (patch.name != null) {
      token.name = String(patch.name || "").trim() || "Token";
    }
    if (patch.color != null) {
      token.color = normalizeColor(patch.color || token.color);
    }
    if (patch.marker != null) {
      token.marker = String(patch.marker || "");
    }
    if (patch.conditions != null) {
      token.conditions = normalizeTokenConditions(patch.conditions);
    }
    if (patch.image != null) {
      token.image = String(patch.image || "");
    }
    if (patch.imageFit != null) {
      token.imageFit = typeof normalizeImageFit === "function"
        ? normalizeImageFit(patch.imageFit, token.imageFit || "cover")
        : String(patch.imageFit || token.imageFit || "cover");
    }
    token.size = nextSize;
    token.x = clampTokenCoordinate(patch.x != null ? patch.x : token.x, token.size, TABLETOP_STAGE_WIDTH);
    token.y = clampTokenCoordinate(patch.y != null ? patch.y : token.y, token.size, TABLETOP_STAGE_HEIGHT);
    token.updatedAt = new Date().toISOString();
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderTokenList(scene);
    syncTokenEditor(scene);
    renderSceneList(scene);
    renderStage(scene);
  }

  async function handleTokenImageFileChange(event) {
    const [file] = event.target.files || [];
    if (!file || !ensureTabletopCanEdit(true)) {
      return;
    }
    try {
      patchSelectedToken({ image: await readFileAsDataUrl(file) });
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel ler essa imagem do token.", "danger");
    } finally {
      event.target.value = "";
    }
  }

  function clearSelectedTokenImage() {
    patchSelectedToken({ image: "" });
  }

  function duplicateSelectedToken() {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const scene = getActiveScene();
    const token = getSelectedToken(scene);
    if (!scene || !token) {
      return;
    }
    const clone = createTabletopToken(`${token.name} (Copia)`, {
      kind: token.kind,
      tokenRole: token.tokenRole,
      color: token.color,
      image: token.image,
      imageFit: token.imageFit,
      marker: token.marker,
      conditions: token.conditions,
      size: token.size,
      x: clampTokenCoordinate(token.x + 24, token.size, TABLETOP_STAGE_WIDTH),
      y: clampTokenCoordinate(token.y + 24, token.size, TABLETOP_STAGE_HEIGHT),
    });
    scene.tokens.push(clone);
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    scene.updatedAt = new Date().toISOString();
    tabletopSelectedTokenId = clone.id;
    saveTabletopState();
    renderTabletopView();
  }

  function deleteSelectedToken() {
    const token = getSelectedToken();
    if (token) {
      deleteTokenById(token.id);
    }
  }

  function handleTabletopExport() {
    const activeScene = getActiveScene();
    if (!activeScene) {
      return;
    }
    const filename = `${slugifySafe(activeScene.name || "mesa-tatica") || "mesa-tatica"}.json`;
    if (typeof downloadJsonFile === "function") {
      downloadJsonFile(filename, tabletopState);
      return;
    }
    notifyTabletop("Nao foi possivel exportar a mesa neste navegador.", "danger");
  }

  function handleTabletopImportFile(event) {
    const [file] = event.target.files || [];
    if (!file || !ensureTabletopCanEdit(true)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        const payload = parsed?.tabletop && typeof parsed.tabletop === "object" ? parsed.tabletop : parsed;
        tabletopState = normalizeTabletopState(payload);
        tabletopSelectedTokenId = "";
        saveTabletopState();
        ensureTabletopSelection();
        renderTabletopView({ centerStage: true });
        notifyTabletop("Mesa importada com sucesso.", "success");
      } catch (error) {
        console.error(error);
        notifyTabletop("Nao foi possivel importar esse JSON da mesa.", "danger");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  async function handleSceneMapFileChange(event) {
    const [file] = event.target.files || [];
    const scene = getActiveScene();
    if (!file || !scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    try {
      scene.mapImage = await readFileAsDataUrl(file);
      scene.updatedAt = new Date().toISOString();
      saveTabletopState();
      renderSceneList(scene);
      renderStage(scene);
      syncSceneEditor(scene);
      notifyTabletop("Mapa carregado na cena.", "success");
    } catch (error) {
      console.error(error);
      notifyTabletop("Nao foi possivel ler essa imagem de mapa.", "danger");
    } finally {
      event.target.value = "";
    }
  }

  function clearSceneMap() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.mapImage = "";
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderSceneList(scene);
    renderStage(scene);
    syncSceneEditor(scene);
  }

  function getPointerScenePoint(event, scene) {
    if (!tabletopElements.stage) {
      return { x: 0, y: 0 };
    }
    const rect = tabletopElements.stage.getBoundingClientRect();
    const renderZoom = getSceneRenderZoom(scene);
    return {
      x: clampNumber((event.clientX - rect.left) / renderZoom, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber((event.clientY - rect.top) / renderZoom, 0, TABLETOP_STAGE_HEIGHT),
    };
  }

  function getClientScenePoint(scene, clientX, clientY, renderZoom = getSceneRenderZoom(scene)) {
    if (!tabletopElements.stage) {
      return { x: 0, y: 0 };
    }
    const rect = tabletopElements.stage.getBoundingClientRect();
    return {
      x: clampNumber((clientX - rect.left) / renderZoom, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber((clientY - rect.top) / renderZoom, 0, TABLETOP_STAGE_HEIGHT),
    };
  }

  function getStageFrameViewportClientPoint() {
    if (!tabletopElements.stageFrame) {
      return { x: 0, y: 0 };
    }
    const rect = tabletopElements.stageFrame.getBoundingClientRect();
    return {
      x: rect.left + (tabletopElements.stageFrame.clientWidth / 2),
      y: rect.top + (tabletopElements.stageFrame.clientHeight / 2),
    };
  }

  function restoreViewportToLogicalPoint(logicalPoint, clientPoint, scene, renderZoom = getSceneRenderZoom(scene)) {
    if (!tabletopElements.stageFrame || !logicalPoint || !clientPoint) {
      return;
    }
    const rect = tabletopElements.stageFrame.getBoundingClientRect();
    tabletopElements.stageFrame.scrollLeft = Math.max(0, (logicalPoint.x * renderZoom) - (clientPoint.x - rect.left));
    tabletopElements.stageFrame.scrollTop = Math.max(0, (logicalPoint.y * renderZoom) - (clientPoint.y - rect.top));
  }

  function getTouchDistance(touchA, touchB) {
    const deltaX = Number(touchA?.clientX || 0) - Number(touchB?.clientX || 0);
    const deltaY = Number(touchA?.clientY || 0) - Number(touchB?.clientY || 0);
    return Math.hypot(deltaX, deltaY);
  }

  function getTouchCenter(touchA, touchB) {
    return {
      x: ((Number(touchA?.clientX || 0) + Number(touchB?.clientX || 0)) / 2),
      y: ((Number(touchA?.clientY || 0) + Number(touchB?.clientY || 0)) / 2),
    };
  }

  function applySceneZoomValue(scene, nextZoom, options = {}) {
    if (!scene) {
      return;
    }
    const remoteSource = getTabletopRemoteSource();
    const canEdit = canEditCurrentTabletop(remoteSource);
    const previousZoom = getSceneRenderZoom(scene, remoteSource);
    const anchorClient = options.anchorClient || getStageFrameViewportClientPoint();
    const anchorLogical = options.anchorLogical || getClientScenePoint(scene, anchorClient.x, anchorClient.y, previousZoom);
    const resolvedZoom = clampNumber(nextZoom, TABLETOP_MIN_ZOOM, TABLETOP_MAX_ZOOM);

    if (canEdit) {
      scene.zoom = resolvedZoom;
      if (options.persist !== false) {
        scene.updatedAt = new Date().toISOString();
        saveTabletopState();
      }
    } else {
      tabletopViewerZoomByScene[scene.id] = resolvedZoom;
    }

    renderStage(scene);
    syncSceneEditor(scene);
    restoreViewportToLogicalPoint(anchorLogical, anchorClient, scene, resolvedZoom);
  }

  function applyFogBrushAt(scene, x, y, mode = "reveal") {
    if (!scene?.fogEnabled) {
      return false;
    }
    const radius = clampNumber(Number(scene.fogBrushSize) || 160, 48, 360);
    if (mode === "hide") {
      const before = scene.fogReveals.length;
      scene.fogReveals = scene.fogReveals.filter((reveal) => {
        const dx = reveal.x - x;
        const dy = reveal.y - y;
        return Math.sqrt((dx ** 2) + (dy ** 2)) > (reveal.radius + radius * 0.72);
      });
      return before !== scene.fogReveals.length;
    }
    if (scene.fogReveals.some((reveal) => Math.abs(reveal.x - x) < radius * 0.25 && Math.abs(reveal.y - y) < radius * 0.25)) {
      return false;
    }
    scene.fogReveals.push(normalizeFogReveal({ x, y, radius }, scene.fogReveals.length));
    return true;
  }

  function createScenePingAt(scene, x, y) {
    if (!scene || !ensureTabletopCanMoveTokens(true)) {
      return;
    }
    scene.pings = (scene.pings || []).filter((ping) => Date.parse(ping.expiresAt || "") > Date.now());
    scene.pings.push(normalizeScenePing({
      x,
      y,
      label: "",
      color: "#ffe0a7",
      by: typeof firebaseUser !== "undefined" ? String(firebaseUser?.uid || "") : "",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + TABLETOP_PING_DURATION_MS).toISOString(),
    }, scene.pings.length));
    scene.updatedAt = new Date().toISOString();
    saveTabletopState(tabletopState, {
      remoteSync: {
        allowPlayerMove: !canEditCurrentTabletop(),
      },
    });
    renderStage(scene);
  }

  function clearScenePings() {
    const scene = getActiveScene();
    if (!scene || !ensureTabletopCanEdit(true)) {
      return;
    }
    scene.pings = [];
    scene.updatedAt = new Date().toISOString();
    saveTabletopState();
    renderStage(scene);
  }

  function queueMeasurementClear() {
    if (tabletopMeasurementClearTimer) {
      window.clearTimeout(tabletopMeasurementClearTimer);
    }
    tabletopMeasurementClearTimer = window.setTimeout(() => {
      tabletopMeasurement = null;
      tabletopMeasurementClearTimer = 0;
      if (!tabletopElements.view.classList.contains("hidden")) {
        renderTabletopView();
      }
    }, 1200);
  }

  function handleStageTouchStart(event) {
    if (!tabletopElements.stageFrame || event.touches.length < 2) {
      return;
    }

    const scene = getActiveScene();
    if (!scene) {
      return;
    }

    const touchA = event.touches[0];
    const touchB = event.touches[1];
    const center = getTouchCenter(touchA, touchB);
    const currentZoom = getSceneRenderZoom(scene);

    finishStageDrag();
    tabletopPinch = {
      sceneId: scene.id,
      startDistance: Math.max(1, getTouchDistance(touchA, touchB)),
      startZoom: currentZoom,
      anchorLogical: getClientScenePoint(scene, center.x, center.y, currentZoom),
    };
    event.preventDefault();
  }

  function handleStageTouchMove(event) {
    if (!tabletopPinch || event.touches.length < 2) {
      return;
    }

    const scene = getActiveScene();
    if (!scene || scene.id !== tabletopPinch.sceneId) {
      tabletopPinch = null;
      return;
    }

    const touchA = event.touches[0];
    const touchB = event.touches[1];
    const center = getTouchCenter(touchA, touchB);
    const distance = Math.max(1, getTouchDistance(touchA, touchB));
    const scale = distance / tabletopPinch.startDistance;
    applySceneZoomValue(scene, tabletopPinch.startZoom * scale, {
      persist: false,
      anchorLogical: tabletopPinch.anchorLogical,
      anchorClient: center,
    });
    event.preventDefault();
  }

  function handleStageTouchEnd(event) {
    if (!tabletopPinch) {
      return;
    }

    if (event.touches.length >= 2) {
      handleStageTouchMove(event);
      return;
    }

    const scene = getActiveScene();
    const shouldPersist = Boolean(scene && scene.id === tabletopPinch.sceneId && canEditCurrentTabletop());
    tabletopPinch = null;

    if (shouldPersist && scene) {
      scene.updatedAt = new Date().toISOString();
      saveTabletopState();
      renderSceneList(scene);
      renderStage(scene);
      syncSceneEditor(scene);
    }

    event.preventDefault();
  }

  function handleStagePointerDown(event) {
    if (tabletopPinch) {
      event.preventDefault();
      return;
    }
    const scene = getActiveScene();
    if (!scene || !tabletopElements.stageFrame) {
      return;
    }
    if (event.pointerType === "mouse" && event.button !== 0 && event.button !== 1) {
      return;
    }
    const tokenElement = event.target instanceof Element ? event.target.closest("[data-tabletop-token-id]") : null;
    const propElement = event.target instanceof Element ? event.target.closest("[data-tabletop-prop-id]") : null;
    const pinElement = event.target instanceof Element ? event.target.closest("[data-tabletop-pin-id]") : null;
    const logicalPoint = getPointerScenePoint(event, scene);
    const capturePointer = () => {
      if (!tabletopElements.stageFrame || typeof tabletopElements.stageFrame.setPointerCapture !== "function") {
        return;
      }
      try {
        tabletopElements.stageFrame.setPointerCapture(event.pointerId);
        tabletopCapturedPointerId = event.pointerId;
      } catch {
        tabletopCapturedPointerId = null;
      }
    };
    if (tabletopToolMode === "measure" && event.button === 0) {
      if (tabletopMeasurementClearTimer) {
        window.clearTimeout(tabletopMeasurementClearTimer);
        tabletopMeasurementClearTimer = 0;
      }
      tabletopMeasurement = {
        sceneId: scene.id,
        startX: logicalPoint.x,
        startY: logicalPoint.y,
        endX: logicalPoint.x,
        endY: logicalPoint.y,
      };
      tabletopDrag = {
        type: "measure",
        sceneId: scene.id,
        pointerId: event.pointerId,
      };
      capturePointer();
      renderSceneRulerLayer(scene, getSceneRenderZoom(scene));
      event.preventDefault();
      return;
    }
    if (tabletopToolMode === "ping" && event.button === 0) {
      createScenePingAt(scene, logicalPoint.x, logicalPoint.y);
      event.preventDefault();
      return;
    }
    if ((tabletopToolMode === "fog-reveal" || tabletopToolMode === "fog-hide") && ensureTabletopCanEdit(true)) {
      if (!scene.fogEnabled) {
        scene.fogEnabled = true;
      }
      applyFogBrushAt(scene, logicalPoint.x, logicalPoint.y, tabletopToolMode === "fog-hide" ? "hide" : "reveal");
      tabletopDrag = {
        type: "fog",
        sceneId: scene.id,
        mode: tabletopToolMode === "fog-hide" ? "hide" : "reveal",
        pointerId: event.pointerId,
      };
      capturePointer();
      renderSceneFogLayer(scene, getSceneRenderZoom(scene), true);
      event.preventDefault();
      return;
    }
    if (propElement && ensureTabletopCanEdit() && event.button === 0) {
      const propId = propElement.getAttribute("data-tabletop-prop-id") || "";
      const prop = scene.props.find((item) => item.id === propId);
      if (prop && !prop.locked) {
        tabletopDrag = {
          type: "prop",
          sceneId: scene.id,
          propId,
          offsetX: logicalPoint.x - prop.x,
          offsetY: logicalPoint.y - prop.y,
          pointerId: event.pointerId,
        };
        capturePointer();
        event.preventDefault();
        return;
      }
    }
    if (pinElement && ensureTabletopCanEdit() && event.button === 0) {
      const pinId = pinElement.getAttribute("data-tabletop-pin-id") || "";
      const pin = scene.pins.find((item) => item.id === pinId);
      if (pin) {
        tabletopDrag = {
          type: "pin",
          sceneId: scene.id,
          pinId,
          offsetX: logicalPoint.x - pin.x,
          offsetY: logicalPoint.y - pin.y,
          pointerId: event.pointerId,
        };
        capturePointer();
        event.preventDefault();
        return;
      }
    }
    const isEmptyStageTouch = !tokenElement && !propElement && !pinElement;
    const shouldPanStage = isEmptyStageTouch || (event.pointerType === "mouse" && event.button === 1);
    if (shouldPanStage) {
      tabletopDrag = {
        type: "pan",
        sceneId: scene.id,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startScrollLeft: tabletopElements.stageFrame.scrollLeft,
        startScrollTop: tabletopElements.stageFrame.scrollTop,
        moved: false,
        pointerId: event.pointerId,
      };
      capturePointer();
      tabletopElements.stageFrame.classList.add("is-dragging");
      event.preventDefault();
      return;
    }
    const tokenId = tokenElement?.getAttribute("data-tabletop-token-id") || "";
    const token = scene.tokens.find((item) => item.id === tokenId);
    if (!token) {
      return;
    }
    tabletopSelectedTokenId = tokenId;
    renderTokenList(scene);
    syncTokenEditor(scene);
    updateStageSelection();
    if (!ensureTabletopCanMoveToken(token, true)) {
      return;
    }
    const rect = tokenElement.getBoundingClientRect();
    const renderZoom = getSceneRenderZoom(scene);
    tabletopDrag = {
      type: "token",
      sceneId: scene.id,
      tokenId,
      offsetX: (event.clientX - rect.left) / renderZoom,
      offsetY: (event.clientY - rect.top) / renderZoom,
      moved: false,
      pointerId: event.pointerId,
    };
    capturePointer();
    tokenElement.classList.add("dragging");
    event.preventDefault();
  }

  function handleStagePointerMove(event) {
    if (tabletopPinch || !tabletopDrag) {
      return;
    }
    if (tabletopDrag.pointerId !== undefined && tabletopDrag.pointerId !== null && event.pointerId !== tabletopDrag.pointerId) {
      return;
    }
    if (tabletopDrag.type === "pan") {
      if (!tabletopElements.stageFrame) {
        tabletopDrag = null;
        return;
      }
      const nextScrollLeft = tabletopDrag.startScrollLeft - (event.clientX - tabletopDrag.startClientX);
      const nextScrollTop = tabletopDrag.startScrollTop - (event.clientY - tabletopDrag.startClientY);
      tabletopDrag.moved = tabletopDrag.moved || Math.abs(nextScrollLeft - tabletopDrag.startScrollLeft) > 2 || Math.abs(nextScrollTop - tabletopDrag.startScrollTop) > 2;
      tabletopElements.stageFrame.scrollLeft = nextScrollLeft;
      tabletopElements.stageFrame.scrollTop = nextScrollTop;
      event.preventDefault();
      return;
    }
    if (tabletopDrag.type === "measure") {
      const scene = getActiveScene();
      if (!scene) {
        tabletopDrag = null;
        return;
      }
      const logicalPoint = getPointerScenePoint(event, scene);
      tabletopMeasurement = {
        ...tabletopMeasurement,
        sceneId: scene.id,
        endX: logicalPoint.x,
        endY: logicalPoint.y,
      };
      renderSceneRulerLayer(scene, getSceneRenderZoom(scene));
      event.preventDefault();
      return;
    }
    const scene = getActiveScene();
    if (!scene || scene.id !== tabletopDrag.sceneId || !tabletopElements.stage) {
      tabletopDrag = null;
      return;
    }
    if (tabletopDrag.type === "fog") {
      const logicalPoint = getPointerScenePoint(event, scene);
      if (applyFogBrushAt(scene, logicalPoint.x, logicalPoint.y, tabletopDrag.mode)) {
        renderSceneFogLayer(scene, getSceneRenderZoom(scene), canEditCurrentTabletop());
      }
      event.preventDefault();
      return;
    }
    if (tabletopDrag.type === "prop") {
      const prop = scene.props.find((item) => item.id === tabletopDrag.propId);
      if (!prop) {
        tabletopDrag = null;
        return;
      }
      const logicalPoint = getPointerScenePoint(event, scene);
      prop.x = clampTokenCoordinate(logicalPoint.x - tabletopDrag.offsetX, prop.width, TABLETOP_STAGE_WIDTH);
      prop.y = clampTokenCoordinate(logicalPoint.y - tabletopDrag.offsetY, prop.height, TABLETOP_STAGE_HEIGHT);
      prop.updatedAt = new Date().toISOString();
      renderScenePropsLayer(scene, getSceneRenderZoom(scene), true);
      event.preventDefault();
      return;
    }
    if (tabletopDrag.type === "pin") {
      const pin = scene.pins.find((item) => item.id === tabletopDrag.pinId);
      if (!pin) {
        tabletopDrag = null;
        return;
      }
      const logicalPoint = getPointerScenePoint(event, scene);
      pin.x = clampNumber(logicalPoint.x - tabletopDrag.offsetX, 0, TABLETOP_STAGE_WIDTH);
      pin.y = clampNumber(logicalPoint.y - tabletopDrag.offsetY, 0, TABLETOP_STAGE_HEIGHT);
      pin.updatedAt = new Date().toISOString();
      renderSceneNotesLayer(scene, getSceneRenderZoom(scene), true);
      event.preventDefault();
      return;
    }
    const token = scene.tokens.find((item) => item.id === tabletopDrag.tokenId);
    if (!token) {
      return;
    }
    const rect = tabletopElements.stage.getBoundingClientRect();
    const renderZoom = getSceneRenderZoom(scene);
    let nextX = (event.clientX - rect.left) / renderZoom - tabletopDrag.offsetX;
    let nextY = (event.clientY - rect.top) / renderZoom - tabletopDrag.offsetY;
    if (scene.gridEnabled) {
      nextX = Math.round(nextX / scene.gridSize) * scene.gridSize;
      nextY = Math.round(nextY / scene.gridSize) * scene.gridSize;
    }
    const previousX = token.x;
    const previousY = token.y;
    token.x = clampTokenCoordinate(nextX, token.size, TABLETOP_STAGE_WIDTH);
    token.y = clampTokenCoordinate(nextY, token.size, TABLETOP_STAGE_HEIGHT);
    tabletopDrag.moved = tabletopDrag.moved || previousX !== token.x || previousY !== token.y;
    token.updatedAt = new Date().toISOString();
    const tokenElement = tabletopElements.tokensLayer?.querySelector(`[data-tabletop-token-id="${token.id}"]`);
    if (tokenElement) {
      applyTokenElementState(tokenElement, token, scene, renderZoom);
    }
    if (token.id === tabletopSelectedTokenId) {
      if (tabletopElements.tokenX) {
        tabletopElements.tokenX.value = String(Math.round(token.x));
      }
      if (tabletopElements.tokenY) {
        tabletopElements.tokenY.value = String(Math.round(token.y));
      }
      if (tabletopElements.tokenEditorMeta) {
        tabletopElements.tokenEditorMeta.textContent = getTokenEditorMetaText(token);
      }
    }
    event.preventDefault();
  }

  function finishStageDrag(event) {
    if (tabletopPinch) {
      return;
    }
    if (!tabletopDrag) {
      return;
    }
    if (
      event
      && tabletopDrag.pointerId !== undefined
      && tabletopDrag.pointerId !== null
      && event.pointerId !== undefined
      && event.pointerId !== tabletopDrag.pointerId
    ) {
      return;
    }
    const scene = getActiveScene();
    const dragState = tabletopDrag;
    const dragType = dragState.type;
    tabletopDrag = null;
    if (
      tabletopCapturedPointerId !== null
      && tabletopElements.stageFrame
      && typeof tabletopElements.stageFrame.releasePointerCapture === "function"
    ) {
      try {
        tabletopElements.stageFrame.releasePointerCapture(tabletopCapturedPointerId);
      } catch {
        // Ignore release failures when the browser already dropped the pointer.
      }
    }
    tabletopCapturedPointerId = null;
    tabletopElements.stageFrame?.classList.remove("is-dragging");
    tabletopElements.tokensLayer?.querySelectorAll(".dragging").forEach((element) => element.classList.remove("dragging"));
    if (!scene) {
      return;
    }
    if (dragType === "measure") {
      queueMeasurementClear();
      return;
    }
    if (dragType === "fog") {
      scene.updatedAt = new Date().toISOString();
      saveTabletopState();
      renderSceneTools(scene);
      renderStage(scene);
      return;
    }
    if (dragType === "prop") {
      scene.updatedAt = new Date().toISOString();
      saveTabletopState();
      renderSceneTools(scene);
      renderStage(scene);
      return;
    }
    if (dragType === "pin") {
      scene.updatedAt = new Date().toISOString();
      saveTabletopState();
      renderSceneTools(scene);
      renderStage(scene);
      return;
    }
    if (dragType !== "token") {
      return;
    }
    if (!dragState.moved) {
      return;
    }
    tabletopSuppressImagePreviewUntil = Date.now() + 220;
    scene.updatedAt = new Date().toISOString();
    saveTabletopState(tabletopState, {
      remoteSync: {
        allowPlayerMove: !canEditCurrentTabletop(),
      },
    });
    renderTokenList(scene);
    syncTokenEditor(scene);
    renderSceneList(scene);
    renderStage(scene);
  }

  function handleTabletopStorageEvent(event) {
    if (event.key === MASTER_PHONE_LIBRARY_STORAGE_KEY) {
      tabletopMasterPhoneLibrary = loadMasterPhoneLibrary();
      renderMasterPhone();
      return;
    }
    if (event.key !== TABLETOP_STORAGE_KEY) {
      return;
    }
    tabletopState = normalizeTabletopState(loadTabletopState());
    ensureTabletopSelection();
    if (!tabletopElements.view.classList.contains("hidden")) {
      renderTabletopView();
    }
    syncMasterPhoneLiveReadouts();
  }

  function importEntriesToActiveScene(entries, label) {
    if (!ensureTabletopCanEdit(true)) {
      return;
    }
    const scene = getActiveScene();
    if (!scene) {
      return;
    }
    if (!Array.isArray(entries) || !entries.length) {
      notifyTabletop(`Nenhum dado disponivel para importar de ${label}.`, "warning");
      return;
    }
    const existingBySource = new Map(scene.tokens.filter((token) => token.sourceKey).map((token) => [token.sourceKey, token]));
    let createdCount = 0;
    let updatedCount = 0;
    let lastTokenId = tabletopSelectedTokenId;
    entries.forEach((entry, index) => {
      const sourceKey = String(entry.sourceKey || "");
      const existing = sourceKey ? existingBySource.get(sourceKey) : null;
      if (existing) {
        existing.name = entry.name || existing.name;
        existing.kind = entry.kind || existing.kind;
        existing.tokenRole = normalizeTokenRole(entry.tokenRole || existing.tokenRole);
        existing.color = normalizeColor(entry.color || existing.color);
        existing.image = entry.image || existing.image;
        existing.imageFit = typeof normalizeImageFit === "function"
          ? normalizeImageFit(entry.imageFit, existing.imageFit || "cover")
          : String(entry.imageFit || existing.imageFit || "cover");
        existing.marker = entry.marker || existing.marker;
        existing.ownerUid = String(entry.ownerUid || "");
        existing.ownerCharacterId = String(entry.ownerCharacterId || "");
        existing.size = normalizeTokenSize(entry.size ?? existing.size, existing.tokenRole);
        existing.x = clampTokenCoordinate(existing.x, existing.size, TABLETOP_STAGE_WIDTH);
        existing.y = clampTokenCoordinate(existing.y, existing.size, TABLETOP_STAGE_HEIGHT);
        existing.updatedAt = new Date().toISOString();
        updatedCount += 1;
        lastTokenId = existing.id;
        return;
      }
      const placement = getPlacementForIndex(scene, createdCount + index, Number(entry.size) || 64);
      const token = createTabletopToken(entry.name || "Token", {
        sourceKey,
        kind: entry.kind || "custom",
        tokenRole: entry.tokenRole,
        color: entry.color,
        image: entry.image,
        imageFit: entry.imageFit,
        marker: entry.marker,
        ownerUid: entry.ownerUid,
        ownerCharacterId: entry.ownerCharacterId,
        size: entry.size,
        x: placement.x,
        y: placement.y,
      });
      scene.tokens.push(token);
      createdCount += 1;
      lastTokenId = token.id;
    });
    scene.updatedAt = new Date().toISOString();
    scene.initiative = normalizeSceneInitiative(scene.initiative, scene.tokens);
    tabletopSelectedTokenId = lastTokenId || scene.tokens[0]?.id || "";
    saveTabletopState();
    renderTabletopView();
    notifyTabletop(`${createdCount} token(ns) criados e ${updatedCount} atualizado(s) a partir de ${label}.`, "success");
  }

  function buildCharacterImportEntries() {
    const room = getMissionRoomSource();
    const participants = room?.participants && typeof room.participants === "object"
      ? Object.entries(room.participants)
      : [];
    return getCurrentCharacters().map((character) => ({
      sourceKey: `character:${character.id || makeId("character")}`,
      ownerUid: String(
        participants.find(([, participant]) => {
          const snapshot = participant?.snapshot && typeof participant.snapshot === "object" ? participant.snapshot : {};
          return String(snapshot.id || "") === String(character.id || "")
            || (
              character.masterShareId
              && String(snapshot.masterShareId || "") === String(character.masterShareId || "")
            );
        })?.[0] || ""
      ),
      ownerCharacterId: String(character.id || ""),
      kind: "character",
      tokenRole: "player",
      name: character.name || "Personagem",
      color: pickTokenColor(`${character.class || ""}-${character.name || ""}`),
      image: String(character.profileImage || ""),
      imageFit: typeof normalizeImageFit === "function" ? normalizeImageFit(character.profileImageFit) : String(character.profileImageFit || "cover"),
      marker: getCharacterPvMarker(character) || String(character.class || ""),
      size: getTokenMinimumSizeForRole("player"),
    }));
  }

  function buildNpcImportEntries() {
    return getCurrentMasterNpcs().map((npc) => {
      const tokenRole = getNpcTokenRole(npc);
      return {
      sourceKey: `npc:${npc.id || makeId("npc")}`,
      kind: "npc",
      tokenRole,
      name: npc.name || "NPC",
      color: pickTokenColor(`${npc.role || npc.name || "npc"}`),
      image: String(npc.profileImage || ""),
      imageFit: typeof normalizeImageFit === "function" ? normalizeImageFit(npc.profileImageFit) : String(npc.profileImageFit || "cover"),
      marker: getNpcPvMarker(npc) || String(npc.role || ""),
      size: getTokenMinimumSizeForRole(tokenRole),
    };
    });
  }

  function buildMissionImportEntries() {
    const room = getMissionRoomSource();
    if (!room) {
      return [];
    }
    const roomId = String(room.id || room.roomId || room.code || "missao");
    const participantEntries = room.participants && typeof room.participants === "object"
      ? Object.entries(room.participants).map(([uid, participant]) => {
        const snapshot = participant?.snapshot && typeof participant.snapshot === "object" ? participant.snapshot : {};
        return {
          sourceKey: `mission:${roomId}:participant:${uid}`,
          ownerUid: String(uid || ""),
          ownerCharacterId: String(snapshot.id || ""),
          kind: "mission",
          tokenRole: "player",
          name: participant?.name || snapshot.name || "Participante",
          color: pickTokenColor(`${participant?.team || participant?.role || participant?.name || uid}`),
          image: String(snapshot.profileImage || ""),
          imageFit: typeof normalizeImageFit === "function" ? normalizeImageFit(snapshot.profileImageFit) : String(snapshot.profileImageFit || "cover"),
          marker: getCharacterPvMarker(snapshot) || String(participant?.team || participant?.role || ""),
          size: getTokenMinimumSizeForRole("player"),
        };
      })
      : [];
    const npcEntries = room.npcs && typeof room.npcs === "object"
      ? Object.values(room.npcs).filter((npc) => npc && typeof npc === "object").map((npc, index) => {
        const tokenRole = getNpcTokenRole(npc);
        return {
        sourceKey: `mission:${roomId}:npc:${npc.id || index}`,
        kind: "mission-npc",
        tokenRole,
        name: npc.name || "NPC",
        color: pickTokenColor(`${npc.role || npc.threatType || npc.name || index}`),
        image: String(npc.profileImage || ""),
        imageFit: typeof normalizeImageFit === "function" ? normalizeImageFit(npc.profileImageFit) : String(npc.profileImageFit || "cover"),
        marker: getNpcPvMarker(npc) || String(npc.role || ""),
        size: getTokenMinimumSizeForRole(tokenRole),
      };
      })
      : [];
    return [...participantEntries, ...npcEntries];
  }

  function getPlacementForIndex(scene, index, size) {
    const base = getViewportAnchor(scene);
    const offset = size + 18;
    const column = index % TABLETOP_IMPORT_COLUMNS;
    const row = Math.floor(index / TABLETOP_IMPORT_COLUMNS);
    return {
      x: clampTokenCoordinate(base.x + (column * offset), size, TABLETOP_STAGE_WIDTH),
      y: clampTokenCoordinate(base.y + (row * offset), size, TABLETOP_STAGE_HEIGHT),
    };
  }

  function getViewportAnchor(scene, renderZoom = getSceneRenderZoom(scene)) {
    if (!tabletopElements.stageFrame) {
      return { x: 96, y: 96 };
    }
    return {
      x: clampNumber((tabletopElements.stageFrame.scrollLeft / renderZoom) + 96, 0, TABLETOP_STAGE_WIDTH - 96),
      y: clampNumber((tabletopElements.stageFrame.scrollTop / renderZoom) + 96, 0, TABLETOP_STAGE_HEIGHT - 96),
    };
  }

  function centerTabletopFrame() {
    if (!tabletopElements.stageFrame || !tabletopElements.stage) {
      return;
    }
    tabletopElements.stageFrame.scrollLeft = Math.max(0, (tabletopElements.stage.scrollWidth - tabletopElements.stageFrame.clientWidth) / 2);
    tabletopElements.stageFrame.scrollTop = Math.max(0, (tabletopElements.stage.scrollHeight - tabletopElements.stageFrame.clientHeight) / 2);
  }

  function getViewportCenterLogical(scene, renderZoom = getSceneRenderZoom(scene)) {
    if (!tabletopElements.stageFrame) {
      return { x: TABLETOP_STAGE_WIDTH / 2, y: TABLETOP_STAGE_HEIGHT / 2 };
    }
    return {
      x: clampNumber((tabletopElements.stageFrame.scrollLeft + (tabletopElements.stageFrame.clientWidth / 2)) / renderZoom, 0, TABLETOP_STAGE_WIDTH),
      y: clampNumber((tabletopElements.stageFrame.scrollTop + (tabletopElements.stageFrame.clientHeight / 2)) / renderZoom, 0, TABLETOP_STAGE_HEIGHT),
    };
  }

  function restoreViewportCenter(logicalCenter, scene, renderZoom = getSceneRenderZoom(scene)) {
    if (!tabletopElements.stageFrame || !logicalCenter) {
      return;
    }
    tabletopElements.stageFrame.scrollLeft = Math.max(0, (logicalCenter.x * renderZoom) - (tabletopElements.stageFrame.clientWidth / 2));
    tabletopElements.stageFrame.scrollTop = Math.max(0, (logicalCenter.y * renderZoom) - (tabletopElements.stageFrame.clientHeight / 2));
  }

  function getMissionRoomSource() {
    if (typeof selectedMissionData !== "undefined" && selectedMissionData) {
      return selectedMissionData;
    }
    if (typeof currentRoomData !== "undefined" && currentRoomData) {
      return currentRoomData;
    }
    return null;
  }

  function getCurrentCharacters() {
    if (typeof loadCharacters === "function") {
      try {
        return Array.isArray(loadCharacters()) ? loadCharacters() : [];
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  function getCurrentMasterNpcs() {
    if (typeof loadMasterNpcs === "function") {
      try {
        return Array.isArray(loadMasterNpcs()) ? loadMasterNpcs() : [];
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  function notifyTabletop(message, kind = "status") {
    if (typeof pushUiToast === "function") {
      pushUiToast(message, kind, 3200);
      return;
    }
    if (kind === "danger") {
      alert(message);
    }
  }

  function runMenuButtonAnimation(button) {
    if (typeof triggerMenuButtonAnimation === "function") {
      triggerMenuButtonAnimation(button);
    }
  }

  function getCharacterPvMarker(character) {
    const track = getTrackSnapshot(character?.resources, "pd", "pv");
    return track ? `PV ${track.current}/${track.max}` : "";
  }

  function getNpcPvMarker(npc) {
    const current = Number.parseInt(String(npc?.pv ?? ""), 10);
    const max = Number.parseInt(String(npc?.pvMax ?? npc?.pv ?? ""), 10);
    if (!Number.isFinite(current) || !Number.isFinite(max) || max <= 0) {
      return "";
    }
    return `PV ${Math.max(0, current)}/${Math.max(0, max)}`;
  }

  function getTrackSnapshot(resources, primaryPrefix, fallbackPrefix = "") {
    if (!resources || typeof resources !== "object") {
      return null;
    }

    const max = pickFirstFiniteNumber(
      resources[`${primaryPrefix}Max`],
      fallbackPrefix ? resources[`${fallbackPrefix}Max`] : null
    );
    if (!Number.isFinite(max) || max <= 0) {
      return null;
    }

    const lost = pickFirstFiniteNumber(resources[`${primaryPrefix}Lost`]);
    const currentFallback = pickFirstFiniteNumber(
      resources[`${primaryPrefix}Current`],
      fallbackPrefix ? resources[`${fallbackPrefix}Current`] : null
    );
    const current = Number.isFinite(lost)
      ? Math.max(0, max - lost)
      : Number.isFinite(currentFallback)
        ? Math.max(0, currentFallback)
        : Math.max(0, max);

    return {
      max: Math.max(0, Math.round(max)),
      current: Math.max(0, Math.round(current)),
    };
  }

  function pickFirstFiniteNumber(...values) {
    for (const value of values) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    return null;
  }

  function normalizeColor(value) {
    const raw = String(value || "").trim();
    return /^#[0-9a-fA-F]{6}$/.test(raw) ? raw : "#c5a36a";
  }

  function getTokenNameFromFileName(fileName = "", index = 0) {
    const baseName = String(fileName || "")
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return baseName || `Token ${index + 1}`;
  }

  function getTokenInitials(name = "") {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.length ? parts.map((part) => part.charAt(0).toUpperCase()).join("") : "T";
  }

  function getTokenKindLabel(kind = "") {
    const labels = {
      custom: "Personalizado",
      character: "Ficha",
      npc: "NPC",
      mission: "Missao",
      "mission-npc": "NPC da missao",
    };
    return labels[kind] || "Token";
  }

  function getConditionDefinition(conditionKey = "") {
    return TABLETOP_CONDITIONS.find((condition) => condition.key === String(conditionKey || "").toLowerCase()) || null;
  }

  function getTokenConditionSummary(token) {
    const labels = normalizeTokenConditions(token?.conditions)
      .map((conditionKey) => getConditionDefinition(conditionKey)?.label)
      .filter(Boolean);
    return labels.length ? labels.join(", ") : "";
  }

  function buildTokenConditionBadges(token) {
    return normalizeTokenConditions(token?.conditions).map((conditionKey) => {
      const definition = getConditionDefinition(conditionKey);
      const badge = document.createElement("span");
      badge.className = "tabletop-token-condition-badge";
      badge.style.setProperty("--condition-color", definition?.color || "rgba(255, 224, 167, 0.86)");
      badge.textContent = definition?.short || conditionKey.slice(0, 2).toUpperCase();
      badge.title = definition?.label || conditionKey;
      return badge;
    });
  }

  function normalizeTokenRole(value, fallback = "player") {
    const rawValue = String(value || "").toLowerCase();
    if (rawValue === "enemy" || rawValue === "npc" || rawValue === "player") {
      return rawValue;
    }
    const nextFallback = String(fallback || "").toLowerCase();
    return nextFallback === "enemy" || nextFallback === "npc" ? nextFallback : "player";
  }

  function getTokenRoleLabel(tokenRole = "") {
    const labels = {
      player: "Jogador",
      npc: "NPC",
      enemy: "Inimigo",
    };
    return labels[normalizeTokenRole(tokenRole)] || "Jogador";
  }

  function getTokenMinimumSizeForRole(tokenRole = "") {
    return TABLETOP_TOKEN_ROLE_SIZES[normalizeTokenRole(tokenRole)] || TABLETOP_TOKEN_ROLE_SIZES.player;
  }

  function normalizeTokenSize(size, tokenRole = "player") {
    return clampNumber(
      Number.parseInt(String(size ?? getTokenMinimumSizeForRole(tokenRole)), 10) || getTokenMinimumSizeForRole(tokenRole),
      getTokenMinimumSizeForRole(tokenRole),
      TABLETOP_MAX_TOKEN_SIZE
    );
  }

  function getTokenRoleRingColor(tokenRole = "") {
    switch (normalizeTokenRole(tokenRole)) {
      case "enemy":
        return "rgba(227, 75, 75, 0.9)";
      case "npc":
        return "rgba(166, 171, 180, 0.86)";
      default:
        return "rgba(255, 245, 217, 0.18)";
    }
  }

  function getTokenVisibleMarker(token) {
    if (!token || normalizeTokenRole(token.tokenRole) === "enemy") {
      return "";
    }
    return String(token.marker || "");
  }

  function getTokenStageMarker(token) {
    const marker = getTokenVisibleMarker(token);
    return marker.replace(/^\s*pv[:\s-]*/i, "").trim();
  }

  function guessTokenRole(name = "") {
    const normalizedName = typeof normalize === "function"
      ? normalize(name)
      : String(name || "").toLowerCase();
    if (/(criatura|enemy|inimigo|boss|monstro|ameaca)/.test(normalizedName)) {
      return "enemy";
    }
    if (/\bnpc\b/.test(normalizedName)) {
      return "npc";
    }
    return "player";
  }

  function getNpcTokenRole(npc) {
    const race = typeof normalize === "function"
      ? normalize(npc?.race || "")
      : String(npc?.race || "").toLowerCase();
    const roleText = typeof normalize === "function"
      ? normalize(`${npc?.role || ""} ${npc?.threatType || ""}`)
      : String(npc?.role || npc?.threatType || "").toLowerCase();
    if (race === "criatura" || /(inimig|hostil|ameaca|predador|boss|monstro)/.test(roleText)) {
      return "enemy";
    }
    return "npc";
  }

  function getSceneRenderZoom(scene, remoteSource = getTabletopRemoteSource()) {
    if (!scene) {
      return 1;
    }
    const sceneZoom = clampNumber(scene.zoom || 1, TABLETOP_MIN_ZOOM, TABLETOP_MAX_ZOOM);
    if (canEditCurrentTabletop(remoteSource)) {
      return sceneZoom;
    }
    const localZoom = tabletopViewerZoomByScene[scene.id];
    return clampNumber(localZoom ?? sceneZoom, TABLETOP_MIN_ZOOM, TABLETOP_MAX_ZOOM);
  }

  function isMasterModeUnlocked() {
    if (typeof masterUnlocked !== "undefined") {
      return Boolean(masterUnlocked);
    }

    try {
      return sessionStorage.getItem("ficha-rpg.master-unlocked.v1") === "1";
    } catch (error) {
      return false;
    }
  }

  function pickTokenColor(seed = "") {
    const text = String(seed || "");
    let hash = 0;
    for (let index = 0; index < text.length; index += 1) {
      hash = ((hash * 31) + text.charCodeAt(index)) | 0;
    }
    return TABLETOP_TOKEN_PALETTE[Math.abs(hash) % TABLETOP_TOKEN_PALETTE.length];
  }

  function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, Number(value) || 0));
  }

  function clampTokenCoordinate(value, size, limit) {
    return clampNumber(Number(value) || 0, 0, Math.max(0, limit - size));
  }

  function ensureId(value, prefix) {
    const raw = String(value || "").trim();
    return raw || makeId(prefix);
  }

  function makeId(prefix = "tabletop") {
    if (typeof generateId === "function") {
      return generateId();
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function slugifySafe(value) {
    if (typeof slugify === "function") {
      return slugify(value);
    }
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function normalizeTabletopSearchText(value = "") {
    if (typeof normalize === "function") {
      return normalize(value);
    }
    return String(value || "").toLowerCase();
  }

  function toCssUrl(value) {
    const safe = String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `url("${safe}")`;
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Falha ao ler arquivo."));
      reader.readAsDataURL(file);
    });
  }
})();

