import java.util.Properties

plugins {
    id("com.android.application")
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("keystore.properties")
if (keystorePropertiesFile.exists()) {
    keystorePropertiesFile.inputStream().use { keystoreProperties.load(it) }
}

fun releaseSigningProperty(name: String): String? {
    return (keystoreProperties.getProperty(name) ?: findProperty("lostKingdom.$name") as String?)?.takeIf { it.isNotBlank() }
}

val hasReleaseSigning = listOf("storeFile", "storePassword", "keyAlias", "keyPassword")
    .all { releaseSigningProperty(it) != null }

android {
    namespace = "com.hhy0111.lostkingdom"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.hhy0111.lostkingdom"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    signingConfigs {
        create("release") {
            if (hasReleaseSigning) {
                val storeFilePath = releaseSigningProperty("storeFile") ?: error("Missing release storeFile")
                storeFile = rootProject.file(storeFilePath)
                storePassword = releaseSigningProperty("storePassword") ?: error("Missing release storePassword")
                keyAlias = releaseSigningProperty("keyAlias") ?: error("Missing release keyAlias")
                keyPassword = releaseSigningProperty("keyPassword") ?: error("Missing release keyPassword")
            }
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            if (hasReleaseSigning) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }

    sourceSets {
        getByName("main") {
            assets.srcDir(layout.buildDirectory.dir("generated/assets"))
        }
    }
}

val syncWebGameAssets = tasks.register<Copy>("syncWebGameAssets") {
    from(rootProject.layout.projectDirectory.dir("web-game"))
    into(layout.buildDirectory.dir("generated/assets/web-game"))
    exclude("**/.DS_Store")
}

tasks.named("preBuild") {
    dependsOn(syncWebGameAssets)
}

tasks.register("signReleaseAab") {
    group = "publishing"
    description = "Builds and JAR-signs the release Android App Bundle for Play Console upload."
    dependsOn("bundleRelease")
    onlyIf { hasReleaseSigning }

    doLast {
        val unsignedBundle = layout.buildDirectory.file("outputs/bundle/release/android-app-release.aab").get().asFile
        val signedBundle = layout.buildDirectory.file("outputs/bundle/release/lost-kingdom-release-signed.aab").get().asFile
        ant.withGroovyBuilder {
            "signjar"(
                "jar" to unsignedBundle,
                "signedjar" to signedBundle,
                "alias" to releaseSigningProperty("keyAlias"),
                "keystore" to rootProject.file(releaseSigningProperty("storeFile") ?: error("Missing release storeFile")),
                "storepass" to releaseSigningProperty("storePassword"),
                "keypass" to releaseSigningProperty("keyPassword"),
                "sigalg" to "SHA256withRSA",
                "digestalg" to "SHA-256"
            )
        }
    }
}

dependencies {
    implementation("com.google.android.gms:play-services-ads:25.0.0")
    implementation("com.android.billingclient:billing:9.1.0")
}
