export default {
  SearchBulkActions: {
    PAGE_SIZES: [10, 20, 50],
    SORTBY_OPTIONS: [
      'Best Match',
      'Most No. of samples',
      'Least No. of samples',
      'Newest Experiment',
      'Oldest Experiment'
    ],
    totalResults: 120
  },
  SearchCardHeader: {
    title:
      'Transcription profiling of human neuroblast tumours reveals two distinct gene signatures identify malignant Neuroblast and Schwannian stromal cells',
    accessionId: 'GSE7530',
    inlineMessage: {
      successLabel: 'Added to Dataset',
      success: 'success',
      infoLabel: 'Platform not supported',
      infoLabel2: '4 samples already in My Dataset',
      info: 'info',
      info_learnmore: '#',
      errorLabel: 'Not available',
      error: 'error'
    },
    processInfo: {
      infoLabel: 'Processing Dataset',
      info: 'info'
    }
  },
  SearchCardMeta: [
    { id: 1, name: 'Organism', label: 'Homo sapiens' },
    { id: 2, name: 'Samples', label: '23 Downloadable Samples' },
    { id: 3, name: 'MicroArray', label: 'Affymetrix-335' }
  ],
  SearchCardBody: {
    url: '#',
    meta_fields: ['Sex', 'Age', ' Specimen part']
  },
  // For filters
  SearchFilters: {
    technology: {
      MICROARRAY: 613738,
      'RNA-SEQ': 359426
    },
    organism: {
      HOMO_SAPIENS: 511403,
      MUS_MUSCULUS: 288720,
      ARABIDOPSIS_THALIANA: 23767,
      RATTUS_NORVEGICUS: 38582,
      DROSOPHILA_MELANOGASTER: 17180,
      SACCHAROMYCES_CEREVISIAE: 12989,
      DANIO_RERIO: 28529,
      CAENORHABDITIS_ELEGANS: 7705,
      SUS_SCROFA: 5908,
      ZEA_MAYS: 3391,
      GLYCINE_MAX: 5153,
      GALLUS_GALLUS: 3950,
      ORYZA_SATIVA: 2520,
      PSEUDOMONAS_AERUGINOSA: 2261,
      BOS_TAURUS: 5493,
      ESCHERICHIA_COLI: 1387,
      MACACA_MULATTA: 2295,
      TRITICUM_AESTIVUM: 2083,
      XENOPUS_LAEVIS: 753,
      HORDEUM_VULGARE: 2206,
      POPULUS_TRICHOCARPA: 1680,
      ANOPHELES_GAMBIAE: 808,
      OVIS_ARIES: 925,
      PSEUDOMONAS_AERUGINOSA_PAO1: 338,
      STAPHYLOCOCCUS_AUREUS: 420,
      SCHIZOSACCHAROMYCES_POMBE: 310,
      VITIS_VINIFERA: 769,
      ORYZA_SATIVA_INDICA_GROUP: 706,
      MACACA_FASCICULARIS: 979,
      POPULUS_TREMULA_X_POPULUS_ALBA: 246,
      'ESCHERICHIA_COLI_STR._K-12_SUBSTR._MG1655': 551,
      GOSSYPIUM_HIRSUTUM: 318,
      CITRUS_SINENSIS: 248,
      'ESCHERICHIA_COLI_K-12': 152,
      EQUUS_CABALLUS: 227,
      MUSTELA_PUTORIUS_FURO: 217,
      PLASMODIUM_FALCIPARUM: 106,
      POPULUS_X_CANADENSIS: 143,
      BOS_INDICUS: 57,
      LEPIDIUM_SATIVUM: 139,
      VITIS_HYBRID_CULTIVAR: 251,
      VITIS_RIPARIA: 251
    },
    platforms: {
      '454GS20': '454 GS 20',
      '454GSFLX': '454 GS FLX',
      '454GSFLXTitanium': '454 GS FLX Titanium',
      AB5500GeneticAnalyzer: 'AB 5500 Genetic Analyzer',
      AB5500xlGeneticAnalyzer: 'AB 5500xl Genetic Analyzer',
      'AB5500xl-WGeneticAnalysisSystem': 'AB 5500xl-W Genetic Analysis System',
      ABSOLiD3PlusSystem: 'AB SOLiD 3 Plus System',
      ABSOLiD4System: 'AB SOLiD 4 System',
      ABSOLiDSystem: 'AB SOLiD System',
      'ABSOLiDSystem2.0': 'AB SOLiD System 2.0',
      'ABSOLiDSystem3.0': 'ABSOLiDSystem3.0',
      ag: '[AG] Affymetrix Arabidopsis Genome Array',
      aragene10st: '[AraGene-1_0-st] Arabidopsis Gene 1.0 ST Array',
      aragene11st: '[AraGene-1_1-st] Arabidopsis Gene 1.1 ST Array',
      ath1121501: '[ATH1-121501] Affymetrix Arabidopsis ATH1 Genome Array',
      barley1: '[Barley1] Affymetrix Barley Genome Array',
      'BGISEQ-500': 'BGISEQ-500',
      bovgene10st: '[BovGene-1_0-st] Bovine Gene 1.0 ST Array',
      bovgene11st: '[BovGene-1_1-st] Bovine Gene 1.1 ST Array',
      bovine: '[Bovine] Affymetrix Bovine Genome Array',
      bsubtilis: '[Bsubtilis] Affymetrix Bsubtilis Genome Array',
      canine2: '[Canine_2] Affymetrix Canine Genome 2.0 Array',
      celegans: '[Celegans] Affymetrix C. elegans Genome Array',
      chicken: '[Chicken] Affymetrix Chicken Genome Array',
      chigene10st: '[ChiGene-1_0-st] Affymetrix Chicken Gene 1.0 ST Array',
      chigene11st: '[ChiGene-1_1-st] Affymetrix Chicken Gene 1.1 ST Array',
      citrus: '[Citrus] Affymetrix Citrus Genome Array',
      clariomdhuman: '[Clariom_D_Human] Affymetrix Human Clariom D Assay',
      clariomshuman: '[Clariom_S_Human] Affymetrix Clariom S Human array',
      clariomshumanht:
        '[Clariom_S_Human_HT] Affymetrix Clariom S Pico Assay HT',
      clariomsmouse: '[Clariom_S_Mouse] Affymetrix Mouse Clariom S Array',
      clariomsrat: '[Clariom_S_Rat] Affymetrix Rat Clariom S Assay',
      cotton: '[Cotton] Affymetrix Cotton Genome Array',
      drogene10st: '[DroGene-1_0-st] Drosophila Gene 1.0 ST Array',
      drogene11st: '[DroGene-1_1-st] Drosophila Gene 1.1 ST Array',
      drosgenome1: '[DrosGenome1] Affymetrix Drosophila Genome Array',
      drosophila2: '[Drosophila_2] Affymetrix Drosophila Genome 2.0 Array',
      ecoli2: '[E_coli_2] Affymetrix E. coli Genome 2.0 Array',
      elegene10st: '[EleGene-1_0-st] Affymetrix C. elegans Gene 1.0 ST Array',
      elegene11st: 'Affymetrix C. elegans Gene 1.1 ST Array',
      equgene10st: '[EquGene-1_0-st] Equus caballus Gene 1.0 ST Array',
      equgene11st: '[EquGene-1_1-st] Equus caballus Gene 1.1 ST Array',
      felgene10st: '[FelGene-1_0] Feline Gene 1.0 ST Array',
      GPL10088: 'AB SOLiD System 3.0 (Arabidopsis thaliana)',
      GPL10123:
        'Agilent-022060 SurePrint G3 Human CGH Microarray 4x180K (Feature Number version)',
      GPL10177: 'Genotypic Candida albicans 15.7K',
      GPL10262: 'Renji Hospital ABI Human TaqMan MicroRNA Assays V2.0',
      GPL10314: 'AB SOLiD System 3.0 (Candida albicans)',
      GPL10372:
        'NimlbeGen C. albicans HX3 tiling array [091120_Candida19_CSU_ASU]',
      GPL10374: 'FhG_IGB_MBT Candida albicans oligo array V1',
      GPL10498: 'Agilent Custom Gene Expression Array for Candida albicans',
      GPL10526:
        '[HG-U133_Plus_2] Affymetrix GeneChip Human Genome HG-U133 Plus 2 Array [Brainarray Version 12]',
      GPL10567: '[MHC_MAP1_univ] Custom Affymetrix MHC Tiling Array',
      GPL10636: 'Agilent custom C. albicans tiling array - sense (Watson)',
      GPL10637: 'Agilent custom C. albicans tiling array - antisense (Crick)',
      GPL10708:
        'Applied Biosystems TaqMan MicroRNA Array (v 1.0, Early Access)',
      GPL10787:
        'Agilent-028005 SurePrint G3 Mouse GE 8x60K Microarray (Probe Name version)',
      GPL10903: 'Candida albicans 45K assembly 21',
      GPL10949:
        'Agilent-24598 Genotypic-designed C. albicans and C. dubliniensis Cross Species CGH Microarray 4x180k',
      GPL10989:
        'NimbleGen Mouse CGH 3x720K Whole-Genome Tiling Array (Build MM9) [080603_MM9_WG_CGH_HX3]',
      GPL11079: 'Spathaspora passalidarum 385K tiled array',
      GPL11083: 'Candida albicans 385K tiled array',
      GPL11093: '[scrGLYCO-v1F] Custom Affymetrix Glyco v1 GeneChip',
      GPL11157:
        '[Cytogenetics_Array] Affymetrix Cytogenetics Whole-Genome 2.7M Array',
      GPL11213: 'Candida albicans ENS oligo array version 1.0',
      GPL11444:
        'Derived from GPL9545 - The Genome Center at Washington University, Candida albicans 20K array',
      GPL1211: 'NIA MGC, Mammalian Genome Collection',
      GPL13118:
        'NimbleGen Human DNA Methylation 3x720K CpG Island Plus RefSeq Promoter Array [100718_HG18_CpG_Refseq_Prom_MeDIP]',
      GPL13147: '[MOUSEDIVm520650] Affymetrix Mouse Diversity Genotyping Array',
      GPL13328: 'TaqMan(r) Array Human MicroRNA A Cards v2.0',
      GPL13440:
        'Genotypic Technology Pvt. Ltd. designed Custom Whole Genome Candida albicans 8x15k GE Microarray (AMADID-026377)',
      GPL13497:
        'Agilent-026652 Whole Human Genome Microarray 4x44K v2 (Probe Name version)',
      GPL13503: 'CYL Calbicans 2.0',
      GPL1352: '[U133_X3P] Affymetrix Human X3P Array',
      GPL13534:
        'Illumina HumanMethylation450 BeadChip (HumanMethylation450_15017482)',
      GPL13685: 'Agilent-017075 human hg18 promoter 800-200',
      GPL13696: 'Candida albicans 181K tiling ChIP array (assembly Ca20)',
      GPL13813:
        'Agilent-020166 Candida albicans 8 x 15k Custom Expression Array v2',
      GPL13825:
        'Arraystar Human LncRNA microarray V2.0 (Agilent-033010 Feature Number version)',
      GPL13830: 'Agilent-020166 Ca21_GE_plus_tiling_2.0 [ORF-centered version]',
      GPL143: 'Atlas Human cDNA Expression Array (Cat. #7740-1)',
      GPL1444: 'Hopkins Tag Array',
      GPL14550:
        'Agilent-028004 SurePrint G3 Human GE 8x60K Microarray (Probe Name Version)',
      GPL14575:
        'Agilent-025480 Candida albicans Custom Expression Array (Feature Number version)',
      GPL14613: '[miRNA-2] Affymetrix Multispecies miRNA-2 Array',
      GPL15018:
        'Agilent-031181 Unrestricted_Human_miRNA_V16.0_Microarray 030840 (Feature Number version)',
      GPL15076:
        'Agilent-014695 Mouse Genome CGH Microarray 244A (G4415A)(Probe Name version)',
      GPL15140: 'febit Candida albicans',
      GPL1519: 'Soll albicans',
      GPL15236:
        '[HuEx-1_0-st] Affymetrix Human Exon 1.0 ST Array [CDF: Brainarray Version 12.1.0]',
      GPL15436:
        'NimbleGen Human CGH 3x720K Whole-Genome Tiling v3.0 Array [090527_HG18_WG_CGH_v3.1_HX3]',
      GPL15547:
        'Agilent-035430 mouse miRNA array (miRBase release 17 miRNA ID version)',
      GPL15811:
        'OPERON/QIAGEN Array-ready Oligo Set Candida albicans Version 1.1',
      GPL15843:
        'Derived from GPL9545 - The Genome Center at Washington University, Candida albicans 20K array',
      GPL15859: 'Candida albicans Custom Microarray Agilent [Agilent-028105]',
      GPL16131: '[CytoScanHD_Array] Affymetrix CytoScan HD Array',
      GPL16169:
        'Candida albicans ENS oligo array version 1.0 [Full array version]',
      GPL16192: 'Illumina MiSeq (Schizosaccharomyces pombe)',
      GPL16243:
        'Agilent-020166 Ca21_GE_plus_tiling_2.0 (Feature Number version)',
      GPL16260: 'Agilent-020166 Ca21_GE_plus_tiling_2.0 (Probe Name version)',
      GPL16275:
        'Agilent-035430 mouse miRNA array (miRNA_107_Sep09 miRNA ID version)',
      GPL16284:
        'NimbleGen Human DNA Methylation 2.1M Deluxe Promoter Array [100929_HG19_Deluxe_Prom_Meth_HX1]',
      GPL16304:
        'Illumina HumanMethylation450 BeadChip [UBC enhanced annotation v1.0]',
      GPL16365: 'Candida albicans tiling ChIP array',
      GPL16384: '[miRNA-3] Affymetrix Multispecies miRNA-3 Array',
      GPL16385:
        'Agilent-020166 Candida albicans 8 x 15k Custom Expression Array',
      GPL16417: 'Illumina MiSeq (Mus musculus)',
      GPL16558: 'AB 5500 Genetic Analyzer (Homo sapiens)',
      GPL16566: 'Applied Biosystems TaqMan Array Human microRNA A/B Cards v2.0',
      GPL16581: 'Agilent-020128 Ca21_GE_2.0 [Orf version]',
      GPL16792:
        'Agilent-025480 Candida albicans Custom Expression Array (Probe name version)',
      GPL17143: 'Illumina MiSeq (Saccharomyces cerevisiae)',
      GPL17199: 'Agilent-024768 TAL_calbicans',
      GPL17313: 'NimbleGen HX3 array [091120_Candida19_CSU_ASU]',
      GPL17327: 'Agilent-021441 NCode Human Long Non-coding RNA microarray',
      GPL17340: 'Agilent Genotypic Candida albicans 15.7K',
      GPL17420: 'Agilent-030094 Candida albicans 15k v2 Barcode microarray',
      GPL17687: 'OPERON CYL Calbicans 1.0',
      GPL17892:
        'Candida albicans 181K tiling ChIP array (assembly Ca20) (Probe version)',
      GPL18166:
        'Agilent-037557 C. albicans 12K (111122 Georgetown David on C Albicans)',
      GPL18251: 'AB SOLiD 4 System (Candida albicans)',
      GPL18270: 'Agilent-037264 mouse 400K custom CGH array',
      GPL18278: 'Agilent-024673 ORC_ChIP-chip_4x180K Array',
      GPL18602: '[OncoScan] Affymetrix OncoScan FFPE Assay',
      GPL18609:
        'miRCURY LNA microRNA Array, 5th and 7th generation combined - hsa, mmu & rno (miRBase 19.0)',
      GPL19026: 'Agilent-038464 CaSC5314_SnpCgh_v1_Santos 033626',
      GPL19049: 'Agilent-024282 Candida albicans 1245169391301',
      GPL19196: 'NRC-BRI C. albicans expression microarray V2.0',
      GPL19197: 'Agilent-041648 CMGG Human V1.1 60k [Probe Name Version]',
      GPL19289:
        'Agilent G2534A oligonucleotide-microarray (AMADID:026869) (Feature Number version)',
      GPL19574: 'Candida albicans MI-CA-8.2k',
      GPL19712:
        'Agilent-037331 Copy_of_C. albicans assembly 21_017942 (Feature ID)',
      GPL199: '[Ecoli_ASv2] Affymetrix E. coli Antisense Genome Array',
      GPL19932:
        'Agilent G2534A oligonucleotide-microarray (AMADID:026869) (Probe Name version)',
      GPL20: 'Incyte Drosophila LifeArray v1.0',
      GPL2004:
        '[Mapping50K_Hind240] Affymetrix Human Mapping 50K Hind240 SNP Array',
      GPL2005:
        '[Mapping50K_Xba240] Affymetrix Human Mapping 50K Xba240 SNP Array',
      GPL201: '[HG-Focus] Affymetrix Human HG-Focus Target Array',
      GPL2040: 'UHN Human CpG 12K Array (HCGI12K)',
      GPL20624:
        'Custom Agilent C. albicans 8x15k Gene expression (AMADID: 026377) designed by Genotypic Technology Private LTD',
      GPL21185:
        'Agilent-072363 SurePrint G3 Human GE v3 8x60K Microarray 039494 [Probe Name Version]',
      GPL21258:
        'Agilent-026377 Candida albicans 8x15K (AMADID: 026377) designed by Genotypic Technology Private Limited.',
      GPL21335:
        'Agilent-038045 Candida albicans 4X180K array (Probe name version)',
      GPL21450:
        'Agilent-026377 Candida albicans Custom Gene Expression Microarray 8x15K',
      GPL21572:
        '[miRNA-4] Affymetrix Multispecies miRNA-4 Array [ProbeSet ID version]',
      GPL21740: 'Agilent-062560 C. albicans whole genome probe G4499A',
      GPL22275:
        'Agilent-065138 8x15k C. albicans assembly 21 [Probe name version]',
      GPL223: 'SAGE:10:NlaIII:Bos taurus',
      GPL23041: 'Illumina MiSeq (Candida albicans)',
      GPL23148:
        '[MoEx-1_0-st] Affymetrix Mouse Exon 1.0 ST Array [gene-level version]',
      GPL23434:
        'Arraystar Human LncRNA microarray V2.0 (Agilent-033010; custom-annotation)',
      GPL23541:
        '[HuEx-1_0-st] Affymetrix Human Exon 1.0 ST Array [CDF: huex10st_Hs_ENSG_20.0]',
      GPL236: 'NIA_Mouse_15K_Array',
      GPL24041: 'Candida albicans 45K assembly 21 [Probe name version]',
      GPL24227:
        'Agilent-037557 C. albicans 12K (111122 Georgetown David on C Albicans) [ORF version]',
      GPL25267:
        'Illumina MiSeq ([Candida] glabrata; Candida albicans; Planoprotostelium fungivorum)',
      GPL26225: 'Agilent-071303 Candida albicans array',
      GPL2641: '[Mapping10K_Xba142] Affymetrix Human Mapping 10K 2.0 Array',
      GPL26840: 'Agilent-066939 Candida albicans microarray (CA5314L)',
      GPL2695: 'SHBB',
      GPL2700: 'Sentrix HumanRef-8 Expression BeadChip',
      GPL2705: 'SHBV',
      GPL2719: 'intestine-spleen combined array',
      GPL273: 'UCSF 3OPHs version 1 human long oligo array',
      GPL27468: 'CapitalBio 8K Candida albicans genome array',
      GPL28323: 'Illumina NovaSeq 6000 (Candida albicans)',
      GPL2891:
        'GE Healthcare/Amersham Biosciences CodeLink   UniSet Human 20K I Bioarray',
      GPL2894:
        'GE Healthcare/Amersham Biosciences CodeLink   UniSet Mouse 20K I Bioarray',
      GPL2995: 'ABI Mouse Genome Survey Microarray',
      GPL3254: 'SHCK',
      GPL3322: 'SHDL',
      GPL3541: 'Snyder - Nimblegen S.cerevisiae WGT 50-60; 50-120',
      GPL3562: 'Rosetta/Merck Mouse TOE 75k Array 1 microarray',
      GPL3576: 'Affymetrix custom microarray to profile mirna',
      GPL3718: '[Mapping250K_Nsp] Affymetrix Mapping 250K Nsp SNP Array',
      GPL3720: '[Mapping250K_Sty] Affymetrix Mapping 250K Sty2 SNP Array',
      GPL3727: 'Candida Albicans Eurogentec 13440',
      GPL3787: 'Nimblegen Human 1.5 kb promoter',
      GPL3839: 'Candida_albicans_ArrayI',
      GPL3930: 'Nimblegen human 5K promoter array 2',
      GPL4: 'SAGE:10:NlaIII:Homo sapiens',
      GPL4007: 'LA Biomed_candida albicans_6266_1.0',
      GPL4037: 'Snyder - Nimblegen C.albicans WGT 50-60; 50-120',
      GPL4091:
        'Agilent-014693 Human Genome CGH Microarray 244A (Feature number version)',
      GPL4092:
        'Agilent-014695 Mouse Genome CGH Microarray 244A (G4415A) (Feature Number version)',
      GPL4124:
        'Agilent-014706 Human Promoter ChIP-on-Chip Set 244K, Microarray 1 of 2 G4489A (Feature Number version)',
      GPL4126:
        'Agilent-014791 Human CpG Island ChIP-on-Chip Microarray 244K (G4492A) (Feature Number version)',
      GPL4128:
        'Agilent-014716 Mouse Promoter ChIP-on-Chip Set 244K, Microarray 1 of 2 (G4490A) (Feature Number version)',
      GPL4133:
        'Agilent-014850 Whole Human Genome Microarray 4x44K G4112F (Feature Number version)',
      GPL4134:
        'Agilent-014868 Whole Mouse Genome Microarray 4x44K G4122F (Feature Number version)',
      GPL4723: 'SWEGENE_BAC_32K_Full',
      GPL4751: 'Eurogentec Candida albicans 13k microarray',
      GPL4758: 'WUCGS Candida albicans 6K v1.0',
      GPL4861: 'Swegene Human 27K RAP (positions from file)',
      GPL4910: '[Hs35b_P01R] Affymetrix Human Tiling 2.0R Set, Array 1',
      GPL4920: 'Edgerton Lab Candida albicans SC5314 6k array_ORF6',
      GPL5082: '[Hs_PromPR] Affymetrix Human Promoter 1.0R Array',
      GPL5147: 'LLHoyer_Calbicans_6k_v1.0',
      GPL5175:
        '[HuEx-1_0-st] Affymetrix Human Exon 1.0 ST Array [transcript (gene) version]',
      GPL5373: 'Agilent Homo sapiens 44k custom array',
      GPL5441: 'UCSF Johnson Candida albicans tiling 185K v1.0 (assembly 20)',
      GPL560: 'Developmental Toxicity of the Mouse Embryo (DTME)',
      GPL5723: '[CAN04a530004N] Candida albicans affymetrix array',
      GPL5770: 'Operon Human V3.0.2 printed oligonucleotide array',
      GPL5811: '[Mm_PromPR] Affymetrix Mouse Promoter 1.0R Array',
      GPL5820:
        'NimbleGen Homo sapiens HG18 Whole Genome CGH Tiling Set (7 of 8)',
      GPL5826: 'DASL Human Cancer Panel by Probe',
      GPL6096:
        '[MoEx-1_0-st] Affymetrix Mouse Exon 1.0 ST Array [transcript (gene) version]',
      GPL6182: 'NimbleGen custom murine genomic tiling array',
      GPL6193:
        '[MoEx-1_0-st] Affymetrix Mouse Exon 1.0 ST Array [probe set (exon) version]',
      GPL6434: 'Illumina HumanHap550 Genotyping BeadChip v3',
      GPL6436: 'NimbleGen Mouse 2.1M NCBI36',
      GPL6453: 'Eurogentec Candida albicans 6k microarray (condensed)',
      GPL6457:
        'Agilent-019161 D. rerio (Zebrafish) Oligo Microarray (V2) G2519F (Feature Number version)',
      GPL6474: 'Candida albicans ChIP-CHIP array',
      GPL6475: 'Candida albicans expression array',
      GPL6480:
        'Agilent-014850 Whole Human Genome Microarray 4x44K G4112F (Probe Name version)',
      GPL6603: 'HGS17_min_promoter_set',
      GPL6604: 'HG17_HELP_Promoter',
      GPL6673: 'Nimblegen human 16MB custom tiling array (HG17) design1',
      GPL6782: 'MHP Human 1Mb-resolution CGH array',
      GPL6801: '[GenomeWideSNP_6] Affymetrix Genome-Wide Human SNP 6.0 Array',
      GPL6804: '[GenomeWideSNP_5] Affymetrix Genome-Wide Human SNP 5.0 Array',
      GPL6808:
        '[CAN07a520619F] Candida albicans 11-mer Affymetrix 10K array version1',
      GPL6822: 'BRI-NRC C. albicans expression microarray',
      GPL6844: 'FHCRC miRNA Array v1.8.1',
      GPL6985:
        'Illumina HumanCNV370-QuadV3 DNA Analysis BeadChip (HumanCNV370-QuadV3_C)',
      GPL70: 'Affymetrix roDROMEGAa Drosophila full genome',
      GPL7202:
        'Agilent-014868 Whole Mouse Genome Microarray 4x44K G4122F (Probe Name version)',
      GPL7476: 'OPERON_AROSV1.1.2_Candida_albicans_array',
      GPL7542:
        'Agilent-015072 Yeast Oligo Microarray 4x44K G2519F (Feature Number version)',
      GPL7546:
        'Affymetrix GeneChip Mouse Genome 430 2.0 Array [CDF: Mm_ENTREZG_10]',
      GPL7566: 'Human Genome U133 A 2.0 Custom CDF Version 9',
      GPL7723: 'miRCURY LNA microRNA Array, v.11.0 - hsa, mmu & rno',
      GPL80: '[Hu6800] Affymetrix Human Full Length HuGeneFL Array',
      GPL8179: 'Illumina Human v2 MicroRNA expression beadchip',
      GPL8234: 'Illumina HumanWG6_V2 chip',
      GPL8432: 'Illumina HumanRef-8 WG-DASL v3.0',
      GPL8479: 'Candida_albicans_ntd2',
      GPL8490:
        'Illumina HumanMethylation27 BeadChip (HumanMethylation27_270596_v.1.2)',
      GPL875: 'Agilent Human 1 cDNA Microarray (G4100A) [layout A]',
      GPL8786: '[miRNA-1] Affymetrix Multispecies miRNA-1 Array',
      GPL885:
        'Agilent-011521 Human 1A Microarray G4110A  (Feature Number version)',
      GPL890:
        'Agilent-011868 Rat Oligo Microarray G4130A (Feature Number version)',
      GPL891: 'Agilent-011978 Mouse Microarray G4121A (Feature Number version)',
      GPL9081:
        'Agilent-016436 Human miRNA Microarray 1.0 G4472A (miRNA ID version)',
      GPL9128:
        'Agilent-014693 Human Genome CGH Microarray 244A (Probe name version)',
      GPL9138: 'AB SOLiD System 2.0 (Homo sapiens)',
      GPL9148: 'UMN/Agilent Candida albicans 165K tiling array',
      GPL9186: '454 GS FLX (Homo sapiens)',
      GPL9251: 'Bulgac Calbicans 12.4K Combimatrix v1',
      GPL9294:
        'Agilent-015072 Yeast Oligo Microarray 4x44K G2519F (Probe Name version)',
      GPL9442: 'AB SOLiD System 3.0 (Homo sapiens)',
      GPL9471: 'Candida albicans 27.6K genome array',
      GPL9545:
        'The Genome Center at Washington University, Candida albicans 20K array',
      GPL9728: '28K Candida albicans Genome Array',
      GPL9818: 'NRC-BRI C. albicans expression microarray V2.0',
      GPL9825:
        'Agilent-016322 Yeast (V2) Gene Expression 8x15K Microarray (Feature Number version)',
      GridION: 'GridION',
      guigene10st: '[GuiGene-1_0-st] Affymetrix Guinea Pig Gene 1.0 ST Array',
      HelicosHeliScope: 'Helicos HeliScope',
      hgu133a: '[HG-U133A] Affymetrix Human Genome U133A Array',
      hgu133a2: '[HG-U133A_2] Affymetrix Human Genome U133A 2.0 Array',
      hgu133b: '[HG-U133B] Affymetrix Human Genome U133B Array',
      hgu133plus2:
        '[HG-U133_Plus_2] Affymetrix Human Genome U133 Plus 2.0 Array',
      hgu219: '[HG-U219] Affymetrix Human Genome U219 Array',
      hgu95a: '[HG_U95A] Affymetrix Human Genome U95A Array',
      hgu95av2: '[HG_U95Av2] Affymetrix Human Genome U95 Version 2 Array',
      hgu95b: '[HG_U95B] Affymetrix Human Genome U95B Array',
      hgu95c: '[HG_U95C] Affymetrix Human Genome U95C Array',
      hgu95d: '[HG_U95D] Affymetrix Human Genome U95D Array',
      hgu95e: '[HG_U95E] Affymetrix Human Genome U95E Array',
      HiSeqXFive: 'HiSeq X Five',
      HiSeqXTen: 'HiSeq X Ten',
      hta20: '[HTA-2_0] Affymetrix Human Transcriptome Array 2.0',
      hthgu133a: '[HT_HG-U133A] Affymetrix HT Human Genome U133A Array',
      hthgu133b: '[HT_HG-U133B] Affymetrix HT Human Genome U133B Array',
      hthgu133pluspm:
        '[HT_HG-U133_Plus_PM] Affymetrix HT HG-U133+ PM Array Plate',
      htmg430a: '[HT_MG-430A] Affymetrix HT Mouse Genome 430A Array',
      htmg430b: '[HT_MG-430B] Affymetrix HT Mouse Genome 430B Array',
      htmg430pm: '[HT_MG-430_PM] Affymetrix HT MG-430 PM Array Plate',
      htrat230pm: '[HT_Rat230_PM] Affymetrix HT RG-230 PM Array Plate',
      htratfocus: '[HT_Rat-Focus] Affymetrix HT Rat Focus Array',
      huex10st: '[HuEx-1_0-st] Affymetrix Human Human Exon 1.0 ST Array',
      'HuEx-1_0-st':
        '[HuEx-1_0-st] Affymetrix Human Exon 1.0 ST Array [transcript (gene) version, custom CDF]',
      hugene10st: '[HuGene-1_0-st] Affymetrix Human Gene 1.0 ST Array',
      hugene11st: '[HuGene-1_1-st] Affymetrix Human Gene 1.1 ST Array',
      hugene20st: '[HuGene-2_0-st] Affymetrix Human Gene 2.0 ST Array',
      hugene21st: '[HuGene-2_1-st] Affymetrix Human Gene 2.1 ST Array',
      IlluminaGenomeAnalyzer: 'Illumina Genome Analyzer',
      'Illumina Genome Analyzer': 'Illumina Genome Analyzer',
      IlluminaGenomeAnalyzerII: 'Illumina Genome Analyzer II',
      IlluminaGenomeAnalyzerIIx: 'Illumina Genome Analyzer IIx',
      'Illumina Genome Analyzer IIx': 'Illumina Genome Analyzer IIx',
      IlluminaHiScanSQ: 'Illumina HiScanSQ',
      IlluminaHiSeq1000: 'Illumina HiSeq 1000',
      IlluminaHiSeq1500: 'Illumina HiSeq 1500',
      'Illumina HiSeq 1500': 'Illumina HiSeq 1500',
      IlluminaHiSeq2000: 'Illumina HiSeq 2000',
      'Illumina HiSeq 2000': 'Illumina HiSeq 2000',
      IlluminaHiSeq2500: 'Illumina HiSeq 2500',
      'Illumina HiSeq 2500': 'Illumina HiSeq 2500',
      IlluminaHiSeq3000: 'Illumina HiSeq 3000',
      'Illumina HiSeq 3000': 'Illumina HiSeq 3000',
      IlluminaHiSeq4000: 'Illumina HiSeq 4000',
      'Illumina HiSeq 4000': 'Illumina HiSeq 4000',
      'Illumina_Human-6_v1.0': 'Sentrix Human-6 Expression BeadChip',
      'Illumina_Human-6_V2.0': 'Sentrix Human-6 v2 Expression BeadChip',
      'Illumina_HumanHT-12_V3.0':
        'Illumina HumanHT-12 V3.0 expression beadchip [ILMN_gene symbol]',
      'Illumina_HumanHT-12_V4.0':
        'Illumina HumanHT-12 V4.0 expression beadchip (reannotation)',
      'Illumina_HumanRef-8_v1.0':
        'Illumina humanRef-8 v1.0 expression beadchip',
      'Illumina_HumanRef-8_v2.0': 'Sentrix HumanRef-8 v2 Expression BeadChip',
      'Illumina_HumanRef-8_v3.0':
        'Illumina HumanRef-8 v3.0 expression beadchip (Search Key version)',
      'Illumina_HumanWG-6_V3.0':
        'Illumina HumanWG-6 v3.0 expression beadchip (gene symbol)',
      IlluminaMiniSeq: 'Illumina MiniSeq',
      IlluminaMiSeq: 'Illumina MiSeq',
      'Illumina_Mouse-6_V1.0':
        'University of Cambridge/Illumina Sentrix Mouse-6 Expression BeadChip v1',
      'Illumina_Mouse-6_v1.1': 'mouse-6 v1.1 (Illumina)',
      'Illumina_MouseRef-8_V1.0':
        'Sentrix MouseRef-8 Expression BeadChip (Target ID)',
      'Illumina_MouseRef-8_V1.1': 'VUmc/Illumina Sentrix MouseRef8 v1.1',
      'Illumina_MouseRef-8_v2.0': 'MouseRef-8 v2.0 Expression BeadChip',
      'Illumina_MouseWG-6_v2.0':
        'University at Buffalo Illumina MouseWG-6 v2.0 expression beadchip (Gene version)',
      IlluminaNovaSeq6000: 'Illumina NovaSeq 6000',
      'Illumina_RatRef-12_V1.0':
        'Univ of Montreal Illumina ratRef-12 v1.0 expression beadchip',
      IonTorrentPGM: 'Ion Torrent PGM',
      IonTorrentProton: 'Ion Torrent Proton',
      IonTorrentS5: 'Ion Torrent S5',
      IonTorrentS5XL: 'Ion Torrent S5 XL',
      maize: '[Maize] Affymetrix Maize Genome Array',
      medgene10st: '[MedGene-1_0] Affymetrix Medicago Gene 1.0 ST Array',
      mgu74a: '[MG_U74A] Affymetrix Murine Genome U74A Array',
      mgu74av2: '[MG_U74Av2] Affymetrix Murine Genome U74A Version 2 Array',
      mgu74bv2: '[MG_U74Bv2] Affymetrix Murine Genome U74B Version 2 Array',
      mgu74cv2: '[MG_U74Cv2] Affymetrix Murine Genome U74 Version 2 Array',
      MinION: 'MinION',
      moe430a: '[MOE430A] Affymetrix Mouse Expression 430A Array',
      moe430b: '[MOE430B] Affymetrix Mouse Expression 430B Array',
      mogene10st: '[MoGene-1_0-st] Affymetrix Mouse Gene 1.0 ST Array',
      mogene11st: '[MoGene-1_1-st] Affymetrix Mouse Gene 1.1 ST Array',
      mogene20st: '[MoGene-2_0-st] Affymetrix Mouse Gene 2.0 ST Array',
      mogene21st: '[MoGene-2_1-st] Affymetrix Mouse Gene 2.1 ST Array',
      mouse4302: '[Mouse430_2] Affymetrix Mouse Genome 430 2.0 Array',
      mouse430a2: '[Mouse430A_2] Affymetrix Mouse Genome 430A 2.0 Array',
      mta10: '[MTA-1_0] Affymetrix Mouse Transcriptome Array 1.0',
      mu11ksuba: '[Mu11KsubA] Affymetrix Murine 11K SubA Array',
      mu11ksubb: '[Mu11KsubB] Affymetrix Murine 11K SubB Array',
      NextSeq500: 'NextSeq 500',
      'NextSeq 500': 'NextSeq 500',
      NextSeq550: 'NextSeq 550',
      'NextSeq 550': 'NextSeq 550',
      ovigene10st: '[OviGene-1_0-st] Ovine Gene 1.1 ST Array',
      ovigene11st: '[OviGene-1_1-st] Ovine Gene 1.1 ST Array',
      PacBioRS: 'PacBio RS',
      PacBioRSII: 'PacBio RS II',
      paeg1a: '[Pae_G1a] Affymetrix Pseudomonas aeruginosa Array',
      plasmodiumanopheles:
        '[Plasmodium_Anopheles] Affymetrix Plasmodium/Anopheles Genome Array',
      poplar: '[Poplar] Affymetrix Poplar Genome Array',
      porcine: '[Porcine] Affymetrix Porcine Genome Array',
      porgene10st: '[PorGene-1_0-st] Porcine Gene 1.0 ST Array',
      porgene11st: '[PorGene-1_1-st] Porcine Gene 1.1 ST Array',
      primeview: '[PrimeView] Affymetrix Human Gene Expression Array',
      primeview_spikeins:
        'GeneChip® PrimeView™ Human Gene Expression Array (with External spike-in RNAs)',
      rae230a: '[RAE230A] Affymetrix Rat Expression 230A Array',
      rae230b: '[RAE230B] Affymetrix Rat Expression 230B Array',
      ragene10st: '[RaGene-1_0-st] Affymetrix Rat Gene 1.0 ST Array',
      ragene11st: '[RaGene-1_1-st] Affymetrix Rat Gene 1.1 ST Array',
      ragene20st: '[RaGene-2_0-st] Affymetrix Rat Gene 2.0 ST Array',
      ragene21st: '[RaGene-2_1-st] Affymetrix Rat Gene 2.1 ST Array',
      rat2302: '[Rat230_2] Affymetrix Rat Genome 230 2.0 Array',
      rcngene10st:
        '[RCnGene-1_0-st] Affymetrix Rice (Chinese Build) Gene 1.0 ST Array',
      rcngene11st: '[RCnGene-1_1-st] Affymetrix Rice Gene 1.1 ST Array',
      rgu34a: '[RG_U34A] Affymetrix Rat Genome U34 Array',
      rgu34b: '[RG_U34B] Affymetrix Rat Genome U34 Array',
      rgu34c: '[RG_U34C] Affymetrix Rat Genome U34 Array',
      rhegene10st: '[RheGene-1_0-st] Rhesus Gene 1.0 ST Array',
      rhegene11st: '[RheGene-1_1-st] Rhesus Gene 1.1 ST Array',
      rhesus: '[Rhesus] Affymetrix Rhesus Macaque Genome Array',
      rice: '[Rice] Affymetrix Rice Genome Array',
      rta10: '[RTA-1_0] Affymetrix Rat Transcriptome Array 1.0',
      rusgene10st: '[RUSGene-1_0-st] Affymetrix Rice (US) Gene 1.0 ST Array',
      rusgene11st: '[RUSGene-1_1-st] Affymetrix Rice (US) Gene 1.0 ST Array',
      saureus: '[S_aureus] Affymetrix S. aureus Genome Array',
      Sequel: 'Sequel',
      snowballs520824f: '[SNOWBALLs520824F] Affymetrix Porcine Snowball Array',
      soybean: '[Soybean] Affymetrix Soybean Genome Array',
      soygene10st: '[SoyGene-1_0-st] Affymetrix Soybean Gene 1.0 ST Array',
      soygene11st: '[SoyGene-1_1-st] Affymetrix Soybean Gene 1.1 ST Array',
      sugarcane: '[Sugar_Cane] Affymetrix Sugar Cane Genome Array',
      tomato: '[Tomato] Affymetrix Tomato Genome Array',
      u133aaofav2:
        '[U133AAofAv2] Affymetrix GeneChip HT-HG_U133A Early Access Array',
      UNKNOWN: 'UNKNOWN',
      unspecified: 'unspecified',
      vitisvinifera:
        '[Vitis_Vinifera] Affymetrix Vitis vinifera (Grape) Genome Array',
      wheat: '[wheat] Affymetrix Wheat Genome Array',
      xenopuslaevis: '[Xenopus_laevis] Affymetrix Xenopus laevis Genome Array',
      xlaevis2: '[X_laevis_2] Affymetrix Xenopus laevis Genome 2.0 Array',
      xtropicalis: '[X_tropicalis] Affymetrix Xenopus tropicalis Genome Array',
      yeast2: '[Yeast_2] Affymetrix Yeast Genome 2.0 Array',
      ygs98: '[YG_S98] Affymetrix Yeast Genome S98 Array',
      zebgene10st: '[ZebGene-1_0-st] Zebrafish Gene 1.0 ST Array',
      zebgene11st:
        '[ZebGene-1_1-st] Affymetrix Genechip Zebrafish ST Genome Array 1.1',
      zebrafish: '[Zebrafish] Affymetrix Zebrafish Genome Array'
    }
  }
}
